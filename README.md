The Complete React Native Roadmap
From First Component to Production App Store Launch
This roadmap is built around four phases. Each phase deepens your skillset and layers in more complexity — components → navigation/data → state architecture → native features/production. Every phase ends with two projects designed so that, between them, they exercise every topic listed for that phase. Build both; don't skip the second one — it's there specifically to catch topics the first project doesn't naturally cover.

🧱 Phase 1: React Native Fundamentals (Weeks 1–8)
Goal: Understand how a React Native screen is built and how data flows through it.

Topic 1 — Core Components
Every RN UI is a tree of native-backed components rendered through React's reconciliation:

View — the equivalent of a div; a non-scrolling container that supports Flexbox layout.
Text — the only place text is allowed to live. Unlike the web, you cannot put a text string inside a <View> directly.
Image — supports local (require) and remote (uri) sources, and needs explicit width/height or a resizing strategy (resizeMode) since it doesn't auto-size like HTML <img>.
Button — a bare-bones, hard-to-style native button. Most real apps replace it with a custom Pressable/TouchableOpacity component almost immediately, but it's worth learning first to understand onPress handling and disabled states.
TextInput — the entry point for all keyboard input; comes with a huge prop surface (keyboardType, secureTextEntry, autoCapitalize, onChangeText, onSubmitEditing).
ScrollView — renders all children up front. Fine for short, fixed content; bad for long or dynamic lists (everything is mounted in memory at once).
FlatList — a virtualized list that only renders what's on/near screen. This is the component you'll reach for constantly.
SafeAreaView / StatusBar — handle notches, home indicators, and camera cutouts so your UI doesn't render under system chrome.
Topic 2 — Styling & Layout
RN styling is CSS-inspired, not CSS:

StyleSheet.create — compiles your style objects and gives you IDs instead of new objects on every render (a small perf win) plus better error messages.
Flexbox is the only layout system — there's no CSS Grid, no floats. flexDirection defaults to column (the opposite of web's row default), which trips up almost everyone coming from web dev. justifyContent controls the main axis, alignItems the cross axis.
Responsive design — Dimensions.get('window') gives you the current screen size (but doesn't update on rotation unless you subscribe to the change event); useWindowDimensions() is the modern hook-based alternative that re-renders automatically. PixelRatio helps you reason about device pixel density for crisp images and hairline borders.
Topic 3 — React Basics (the engine under RN)
Functional components are the standard now — class components still exist in older codebases but you shouldn't write new ones.
Props flow data down; state (useState) is a component's private, re-render-triggering memory.
useEffect handles side effects (subscriptions, timers, fetches) and cleanup — understanding the dependency array is the single most important (and most misunderstood) part of hooks.
useReducer is useState's big sibling for state with multiple sub-values or complex transitions (think: a form with 8 fields, or a shopping cart).
useCallback memoizes functions so they don't cause unnecessary re-renders of memoized children — genuinely useful in long FlatLists where renderItem gets recreated every render otherwise.
useContext lets you avoid prop-drilling by broadcasting a value down a component tree (theme, logged-in user, language).
Topic 4 — Lists & Rendering
FlatList vs ScrollView: FlatList virtualizes (only renders visible rows + a buffer), supports pull-to-refresh, infinite scroll (onEndReached), section headers, and empty states out of the box.
renderItem — the function that turns one data item into a row; keys (keyExtractor) let React efficiently diff the list when items are added/removed/reordered.
Lazy loading — pagination patterns using onEndReached + onEndReachedThreshold to fetch "page 2" as the user scrolls.
ListHeaderComponent / ListFooterComponent — inject non-list UI (search bars, loading spinners) without breaking virtualization.
Topic 5 — Forms & Input
Controlled components — the input's displayed value is driven by state (value + onChangeText), giving you a single source of truth; uncontrolled components manage their own internal value and you read it via a ref, which is rarer in RN.
TextInput props for validation-adjacent behavior: keyboardType="numeric", maxLength, autoCorrect, returnKeyType.
KeyboardAvoidingView — arguably the most fought-with component in RN; it repositions your layout so the keyboard doesn't cover the active input. Behavior differs meaningfully between iOS (padding) and Android (height), so you'll usually branch on Platform.OS.
📱 Project 1.1 — "Address Book" App
A contacts list with add/edit/delete, built with FlatList, TextInput, and custom Pressable buttons.

Covers: Core Components, Flexbox styling, useState/useReducer for the contacts array, FlatList + keyExtractor, controlled form inputs, KeyboardAvoidingView for the "add contact" form.
Stretch goals: swipe-to-delete, alphabetical section headers (SectionList), a search bar that filters the list live, contact avatars using Image.
🏃 Project 1.2 — "Daily Habit Tracker"
A single-screen app where users define habits (e.g. "Drink water", "Read 20 min") and tap to mark them complete each day, with a running streak counter.

Covers: everything Project 1.1 doesn't emphasize — useEffect (resetting completion state at midnight, or on app foreground), useContext (a simple theme toggle: light/dark), useCallback (memoizing the row-press handler passed into FlatList), responsive layout with useWindowDimensions so the habit grid reflows on tablets vs phones.
Stretch goals: a weekly calendar strip (custom-built with Flexbox, not a library) showing which days each habit was completed; simple Animated press feedback on the checkmark.
📱 Phase 2: Navigation & API Integration (Weeks 10–20)
Goal: Move between screens, talk to real servers, and persist data locally.

Topic 1 — Navigation
React Navigation is the de facto standard:

Stack Navigator — push/pop screens like a deck of cards (list → detail → edit).
Bottom Tabs — persistent tab bar for top-level sections (Home, Search, Profile).
Drawer — a slide-out side menu, common in enterprise/dashboard-style apps.
Nested navigation — a Tab Navigator where each tab contains its own Stack Navigator is the most common real-world pattern (so pushing a detail screen from the "Home" tab doesn't hide the tab bar unexpectedly).
Auth flow — conditionally rendering an "Auth Stack" (login/signup) vs an "App Stack" (protected routes) based on a token in state/context, so unauthenticated users can never navigate into protected screens.
Topic 2 — HTTP Requests
fetch vs Axios — fetch is built-in but verbose (you manually check response.ok, manually JSON.stringify bodies); Axios adds automatic JSON parsing, request/response interceptors, and cleaner error handling out of the box.
GET/POST/PATCH/DELETE — map directly to read/create/update/delete; understanding idempotency (PUT vs PATCH) matters once you're not just reading data.
Error handling — network failures, 4xx/5xx status codes, and timeouts all need distinct handling; a good app never lets a failed request fail silently.
Loading states — the three-state pattern (idle / loading / error / success) prevents both blank-screen flashes and "stuck spinner" bugs.
Topic 3 — API Integration
Displaying API data in FlatList — mapping server JSON shapes to what your UI needs, often with a transform step so your components don't couple directly to the API's field names.
Form validation — Formik or React Hook Form manage form state and validation lifecycle; Yup defines validation schemas declaratively (email().required()) rather than writing manual if-checks for every field.
Topic 4 — Local Storage
AsyncStorage — a simple, unencrypted, asynchronous key-value store for small data (tokens, preferences, cached lists). Not a database — no querying, no relations.
redux-persist — automatically saves your Redux store to AsyncStorage and rehydrates it on app launch, so users don't lose state when they force-close the app.
Topic 5 — Backend Basics (optional but recommended)
Node.js/Express REST APIs — building simple GET /items, POST /items endpoints gives you a mental model of what your frontend is actually talking to.
MongoDB CRUD — a schema-less document database that pairs naturally with JSON-shaped REST APIs, good for learning without wrestling with SQL migrations first.
🌦️ Project 2.1 — "Weather Now"
A weather app: a search screen where users look up a city, a details screen showing current conditions + a 5-day forecast, and a list of "saved cities" they can revisit.

Covers: Stack navigation (search → details), a public REST API (OpenWeatherMap or similar) via Axios, loading/error states, AsyncStorage for the saved-cities list (persisted across launches), basic form validation on the search input (non-empty, no special characters).
Stretch goals: pull-to-refresh on the details screen, geolocation-based "current location" weather as the default tab.
💰 Project 2.2 — "PocketPath" Expense Tracker
A transaction logger with categories, a spending-by-category chart, multi-currency support, and CSV/PDF export.

Covers: everything Project 2.1 doesn't — Bottom Tabs (Home / Add / Reports) nested inside a Stack (for an auth flow: login → app), Formik/React Hook Form + Yup for the "add transaction" form (amount, category, date, required-field and numeric validation), full CRUD against a backend (Node/Express + MongoDB, or a mock API), PATCH/DELETE for editing and removing transactions, and redux-persist (or plain AsyncStorage) so transaction history survives app restarts.
Stretch goals: basic charting library integration for the "spending by category" view, an auth-gated flow so transactions are tied to a logged-in user.
⚙️ Phase 3: State Management & Advanced UI (Weeks 20–26)
Goal: Scale beyond useState/prop-drilling and build a UI that feels like a real product.

Topic 1 — State Management
Context API — great for low-frequency, app-wide values (theme, auth user) but re-renders every consumer on any change, so it's a poor fit for frequently-updating data like a live cart.
Redux Toolkit — the modern, opinionated way to write Redux: createSlice collapses actions + reducers into one file, built-in Immer means you can "mutate" state in reducers safely, and configureStore wires up good defaults (including DevTools) with no boilerplate.
Zustand — a much lighter alternative: no providers, no actions/reducers ceremony, just a hook-based store. Great for small-to-mid apps where Redux feels like overkill.
useReducer — worth revisiting here as the "in-component" precursor to Redux; understanding it makes Redux's action/reducer pattern feel familiar rather than foreign.
Topic 2 — Navigation Deep Dive
Nested navigators — Tab-inside-Stack-inside-Drawer combinations for genuinely complex apps.
Custom headers — replacing the default header with your own (search bars in the header, custom back buttons, transparent headers over images).
Deep linking — letting a URL (myapp://recipe/42) or universal link open your app directly to a specific screen — essential for push notifications, shared links, and marketing.
Topic 3 — UI/UX Polish
Reusable components — a shared Button, Card, Modal, Input library so every screen looks consistent and you're not copy-pasting styles.
Theming — centralizing colors/spacing/typography (often via Context) so light/dark mode or rebrands are a one-file change.
Icons — react-native-vector-icons (or Expo's @expo/vector-icons) for a scalable icon system instead of bitmap image assets.
Responsive design revisited — now applied at the design-system level: consistent spacing scales, font-scaling that respects accessibility settings.
Topic 4 — Forms & Validation (advanced)
Building on Phase 2: multi-step forms, cross-field validation (e.g. "confirm password must match password"), and dynamic field arrays (add/remove ingredients, add/remove line items) with Formik/React Hook Form + Yup.
🗂️ Project 3.1 — "TaskFlow" Kanban Task Manager
A trello-style board with three columns (To Do / In Progress / Done), custom modals for creating/editing tasks, and a settings drawer.

Covers: Redux Toolkit (or Zustand) as the single source of truth for tasks/columns, Drawer navigation for settings nested inside a Stack, custom headers (a "+" button that opens the create-task modal), a reusable component library (Card, Modal, Badge for priority tags), theming with a light/dark toggle stored in Context.
Stretch goals: drag-and-drop between columns, deep linking so a shared task link opens directly to that task's modal.
🍽️ Project 3.2 — "Meal Mate" Recipe Planner
A recipe discovery app with weekly meal planning and an auto-generated, aisle-grouped grocery list.

Covers: everything Project 3.1 doesn't — API integration (Spoonacular or similar) combined with complex client-side data mapping (recipes → ingredients → grocery list grouped and de-duplicated by aisle), multi-step forms (meal-plan creation across 7 days) with React Hook Form + Yup, nested navigation (Tabs for Discover/Plan/Grocery List, each with its own Stack), and persistent local storage for the current week's plan.
Stretch goals: a "swap meal" flow using a custom modal, portion-scaling logic that recalculates ingredient quantities.
🚀 Phase 4: Native Features, Performance & Deployment (Weeks 27+)
Goal: Use the device itself, make the app feel fast, and actually ship it.

Topic 1 — Device APIs
Camera / Image Picker — capturing or selecting photos (profile pictures, receipts, posts).
Location — foreground/background permissions, getCurrentPosition, watching position changes for live tracking.
Sensors — accelerometer/gyroscope for motion-based interactions (rare but powerful when needed).
Biometric authentication — Face ID/Touch ID/fingerprint as a fast, secure login step layered on top of your normal auth.
Topic 2 — Push Notifications
Expo Notifications — the simplest cross-platform path if you're in the Expo ecosystem: request permission, get a push token, schedule local notifications.
Firebase Cloud Messaging (FCM) — the underlying (or standalone) service for sending remote push notifications from a server, including topic-based and targeted messaging.
Topic 3 — Animations
Animated API — RN's built-in animation system: Animated.timing, Animated.spring, and interpolation for fades, scales, and translations, driven on the JS thread (or the native thread via useNativeDriver: true).
React Native Reanimated — runs animations and even gesture logic on the native UI thread for silky-smooth, dropped-frame-resistant interactions (swipe-to-dismiss, bottom sheets, complex gesture-driven UI) that the base Animated API struggles with.
Topic 4 — Firebase Integration
Authentication — email/password, social login (Google/Apple), and session persistence.
Firestore — a real-time NoSQL database; listeners push updates to your app instantly without polling, which is perfect for chat, live feeds, and collaborative features.
Storage — hosting user-uploaded files (profile photos, attachments) with secure, rule-based access.
Topic 5 — Performance
Lazy loading — code-splitting screens so the initial bundle is smaller and startup is faster.
Bundle optimization — trimming unused dependencies, enabling Hermes (RN's optimized JS engine), image compression.
Profiling — using React DevTools' Profiler and Flipper to find slow renders and unnecessary re-renders.
Caching strategies — caching API responses and images (react-native-fast-image or similar) to reduce redundant network calls and flicker.
Topic 6 — Testing
Unit testing (Jest/Vitest) — testing pure functions and small units in isolation (reducers, utility functions, formatters).
Integration testing (React Native Testing Library) — testing components as a user would interact with them (render, fire event, assert on screen output) rather than testing implementation details.
E2E testing (Detox/Playwright) — driving the actual compiled app through real user flows (login → checkout) on a simulator/emulator to catch integration bugs unit tests can't see.
Topic 7 — Deployment
Expo EAS Build — cloud-based builds that produce installable .ipa/.apk/.aab files without needing a local Xcode/Android Studio setup for every build.
Signing — iOS provisioning profiles/certificates and Android keystores, which prove your app's identity to Apple/Google and to users' devices.
Store submission — App Store Connect and Google Play Console review processes, screenshots, privacy labels, and store listings.
CI/CD pipelines — automating build → test → deploy on every merge so releases aren't a manual, error-prone ritual.
Topic 8 — Advanced
TypeScript — static typing catches a large class of bugs (wrong prop types, undefined access) before they ever hit a device.
Native Modules — writing small bridges to native iOS (Swift/Obj-C) or Android (Kotlin/Java) code when a JS library doesn't expose functionality you need.
OTA updates — pushing JS-only bug fixes instantly via Expo Updates/CodePush without waiting for a full store review cycle.
Fastlane — automating the tedious parts of mobile release (screenshots, signing, store metadata upload).
Clean/MVVM architecture — separating UI, business logic, and data layers so the app stays testable and maintainable as it grows past "a few screens."
🏋️ Project 4.1 — "PulseFit" Fitness Tracker with Social Feed
A fitness app: users log workouts (with a photo via Camera/Image Picker), track routes via Location, get push notifications for workout reminders and friend activity, and see a real-time social feed of friends' completed workouts.

Covers: Camera + Image Picker + Location device APIs, biometric login, Firebase Authentication + Firestore (real-time feed updates via listeners) + Storage (workout photos), Expo Notifications/FCM for reminders, Animated/Reanimated for a satisfying "workout complete" celebration animation, Jest unit tests for streak/points calculations, and an EAS Build + TestFlight/internal-testing release.
Stretch goals: a leaderboard using Firestore queries, background location tracking for run routes.
🛒 Capstone Project 4.2 — Full E-Commerce App
A production-grade shopping app: product catalog, cart, checkout, and order history.

Covers: everything Project 4.1 doesn't emphasize — Redux Toolkit for cart/order state, Firebase Authentication for user accounts, Formik/React Hook Form + Yup for checkout forms (shipping address, payment details validation), Stripe payment integration, TypeScript throughout for a maintainable codebase, React Native Testing Library integration tests for the cart/checkout flow, Detox E2E tests for the full purchase journey, performance work (image caching for product photos, lazy-loaded product-detail screens), and a complete signed, store-submitted release via EAS Build with a CI/CD pipeline.
Stretch goals: OTA updates for post-launch bug fixes, a Clean/MVVM-inspired folder structure separating API, state, and UI layers, push notifications for order status updates.
📌 How to Use This Roadmap
Don't skip the second project in each phase. The pairs are chosen so that between them, every topic in that phase's table gets real, hands-on practice — the second project is where the "boring but essential" topics (validation, persistence, theming, testing) actually get exercised.
Carry projects forward. E.g., once you learn Redux Toolkit in Phase 3, consider refactoring your Phase 2 Expense Tracker to use it instead of local state — refactoring old projects with new knowledge cements concepts better than always starting fresh.
Build in TypeScript from Phase 2 onward if you're comfortable with it — it's listed as "Advanced" in Phase 4, but retrofitting types onto a large existing app is much more painful than starting typed.
Ship early, ship small. Even in Phase 1, try running your Address Book app on a real device via Expo Go — seeing your own code on your own phone early keeps motivation high.
Good luck — by the end of Phase 4 you'll have eight complete apps in your portfolio, covering the full breadth of what a professional React Native developer does day to day.
