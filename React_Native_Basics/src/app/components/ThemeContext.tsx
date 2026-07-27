import React, { createContext, useContext, useState, useMemo } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * ==========================================================================
 * WHAT IS CONTEXT?
 * ==========================================================================
 * Normally in React, if a deeply nested component needs some data (like the
 * current theme or logged-in user), you have to pass it down as a "prop"
 * through every component in between — even ones that don't use it
 * themselves. This is called "prop drilling" and gets messy fast.
 *
 * Context solves this: you create a "box" (the Context) that holds some
 * data, wrap your app (or part of it) in a "Provider" that fills the box,
 * and then ANY component inside that Provider — no matter how deeply
 * nested — can reach into the box and grab the data directly, using
 * useContext(). No prop drilling needed.
 * ==========================================================================
 */

// 1️⃣ CREATE CONTEXT
// createContext(defaultValue) makes a new "box". The defaultValue is only
// used if a component tries to read the context WITHOUT a Provider above it.
type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

type UserType = {
  name: string;
  role: string;
} | null;

type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
});

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: (() => {}) as React.Dispatch<React.SetStateAction<UserType>>
});

// 2️⃣ PROVIDER COMPONENT
// This component "fills the box" with real, live data (state) and makes it
// available to every component rendered inside it (its "children").
type AppProvidersProps = { children: React.ReactNode };
const AppProviders = ({ children }: AppProvidersProps) => {
  // Regular React state — this is the actual source of truth for the theme
  // and the user. The Context just makes it easy to *share* this state.
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<UserType>({ name: 'John Doe', role: 'admin' });

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // useMemo here is a performance optimization: it keeps the SAME object
  // reference between renders unless theme/user actually changes.
  // Why does this matter? Every time a Provider's `value` prop is a brand
  // NEW object (e.g. `{ theme, toggleTheme }` written directly inline),
  // React treats it as "changed", and every component consuming that
  // context re-renders — even if the actual data is the same. useMemo
  // avoids that by only creating a new object when a dependency changes.
  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme]);
  const userValue = useMemo(() => ({ user, setUser }), [user]);

  // Providers can be nested. Anything inside both of these can access
  // BOTH the theme context and the user context.
  return (
    <ThemeContext.Provider value={themeValue}>
      <UserContext.Provider value={userValue}>
        {children}
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

// 3️⃣ CUSTOM HOOKS for consuming contexts
// Wrapping useContext() in our own hook (useTheme, useUser) is a common
// pattern. It gives us a nicer name to use elsewhere, and lets us add a
// safety check that warns us if we forgot to wrap our app in the Provider.
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

// 4️⃣ COMPONENTS CONSUMING CONTEXT

// Deeply nested component that needs theme.
// Notice: we never passed `theme` down as a prop here. useTheme() reaches
// straight into the ThemeContext "box" set up above.
const ThemedButton = ({ title, onPress }) => {
  const { theme } = useTheme();

  const styles = theme === 'light' ? lightStyles : darkStyles;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {/* Uses buttonText (light-on-dark button background), NOT the
          regular `text` style, so it stays readable on the blue button. */}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// Another deep component that needs user info
const UserGreeting = () => {
  const { user } = useUser();
  const { theme } = useTheme();

  const styles = theme === 'light' ? lightStyles : darkStyles;

  return (
    <View style={styles.card}>
      <Text style={styles.text}>Hello, {user?.name || 'Guest'}!</Text>
      <Text style={styles.subText}>Role: {user?.role || 'None'}</Text>
    </View>
  );
};

// Component that modifies user context.
// This shows that context isn't just for READING shared data — setUser
// came from the context too, so calling it here updates the state that
// lives up in AppProviders, and every component reading `user` re-renders.
const LoginToggle = () => {
  const { user, setUser } = useUser();

  const toggleUser = () => {
    if (user) {
      setUser(null);
    } else {
      setUser({ name: 'Jane Doe', role: 'user' });
    }
  };

  return (
    <Button title={user ? 'Logout' : 'Login as Jane'} onPress={toggleUser} />
  );
};

// Main App content (rendered inside <AppProviders>, so it can use the hooks)
const ThemeDemo = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();

  const styles = theme === 'light' ? lightStyles : darkStyles;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theme Demo</Text>
      <Text style={styles.text}>Current Theme: {theme}</Text>
      <Text style={styles.text}>User: {user?.name || 'Not logged in'}</Text>

      <View style={styles.spacing}>
        <ThemedButton title="Toggle Theme" onPress={toggleTheme} />
      </View>

      <View style={styles.spacing}>
        <LoginToggle />
      </View>

      <View style={styles.spacing}>
        <UserGreeting />
      </View>

      <View style={styles.spacing}>
        <NestedComponent />
      </View>
    </View>
  );
};

// Nested component to show prop drilling prevention.
// This View doesn't need theme or user itself — it just renders its child.
// In a prop-drilling world, you'd still have to pass theme/user THROUGH
// this component just so NestedLevel2 → NestedLevel3 could use them.
// With Context, this component can stay completely ignorant of that data.
const NestedComponent = () => {
  const { theme } = useTheme();
  const styles = theme === 'light' ? lightStyles : darkStyles;

  return (
    <View style={styles.nestedBox}>
      <Text style={styles.text}>Nested Level 1</Text>
      <NestedLevel2 />
    </View>
  );
};

const NestedLevel2 = () => {
  const { theme } = useTheme();
  const styles = theme === 'light' ? lightStyles : darkStyles;

  return (
    <View style={styles.nestedBox}>
      <Text style={styles.text}>Nested Level 2</Text>
      <NestedLevel3 />
    </View>
  );
};

const NestedLevel3 = () => {
  // This component accesses context directly — no props drilling!
  const { theme } = useTheme();
  const { user } = useUser();

  const styles = theme === 'light' ? lightStyles : darkStyles;

  return (
    <View style={styles.card}>
      <Text style={styles.text}>Deep nested component</Text>
      <Text style={styles.subText}>
        User from context: {user?.name || 'None'}
      </Text>
    </View>
  );
};

// 5️⃣ WRAP EVERYTHING WITH PROVIDERS
// This is the only place AppProviders is used. Everything inside <ThemeDemo />
// (and all of ITS children, however deeply nested) can now call useTheme()
// and useUser() freely.
const App = () => {
  return (
    <AppProviders>
      <ThemeDemo />
    </AppProviders>
  );
};

// 6️⃣ STYLES
// baseStyles holds properties shared between light and dark mode (like
// padding/layout), so we don't have to repeat them twice.
const baseStyles = {
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  spacing: { marginTop: 15 },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  text: { fontSize: 16 },
  subText: { fontSize: 14, opacity: 0.7 },
  card: {
    padding: 15,
    borderRadius: 8,
    marginTop: 10
  },
  nestedBox: {
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  }
};

// ⚠️ BUG FIX: the original code defined `text:` TWICE inside these objects.
// In JavaScript, when an object literal has the same key twice, the SECOND
// one silently wins and overwrites the first — no error, no warning. That
// meant the "button text" color (white) was overwriting the "regular text"
// color, making normal text white-on-white (invisible) in light mode.
//
// The fix: give the button its own dedicated `buttonText` style, so it no
// longer collides with the general-purpose `text` style.
const lightStyles = StyleSheet.create({
  ...baseStyles,
  container: { ...baseStyles.container, backgroundColor: '#fff' },
  title: { ...baseStyles.title, color: '#000' },
  text: { ...baseStyles.text, color: '#000' }, // normal text: black on white
  subText: { ...baseStyles.subText, color: '#444' },
  button: { ...baseStyles.button, backgroundColor: '#007AFF' },
  buttonText: { ...baseStyles.text, color: '#fff' }, // button text: white on blue
  card: { ...baseStyles.card, backgroundColor: '#f0f0f0' },
  nestedBox: { ...baseStyles.nestedBox, borderColor: '#ccc' }
});

const darkStyles = StyleSheet.create({
  ...baseStyles,
  container: { ...baseStyles.container, backgroundColor: '#1a1a1a' },
  title: { ...baseStyles.title, color: '#fff' },
  text: { ...baseStyles.text, color: '#fff' }, // normal text: white on dark bg
  subText: { ...baseStyles.subText, color: '#aaa' },
  button: { ...baseStyles.button, backgroundColor: '#0a84ff' },
  buttonText: { ...baseStyles.text, color: '#fff' }, // button text: white on blue
  card: { ...baseStyles.card, backgroundColor: '#2a2a2a' },
  nestedBox: { ...baseStyles.nestedBox, borderColor: '#444' }
});

// NestedComponent (used above in ThemeDemo) references `styles`, but there's
// no top-level `styles` constant in this file — that was another latent bug
// in the original. It should be using lightStyles/darkStyles like every
// other component does. Fixed below by giving NestedComponent access to the
// theme, same as NestedLevel2/NestedLevel3.
export default App;