# React Native Interview Questions — Topic 1: Core Components (150 Q&A)

## Section A — View (15)

**1. Q: What is `View` in React Native?**
A: It's the most fundamental building block — a container component similar to a `div` on the web, backed by a native `UIView` (iOS) or `ViewGroup` (Android). It supports Flexbox layout, styling, and touch handling.

**2. Q: Does `View` scroll its content?**
A: No. `View` does not scroll — content that overflows its bounds is clipped or overflows visually depending on the `overflow` style. Use `ScrollView` or `FlatList` for scrollable content.

**3. Q: Can you put raw text directly inside a `View`?**
A: No. Unlike HTML, RN throws an error ("Text strings must be rendered within a `<Text>` component") if you put a bare string as a child of `View`.

**4. Q: What layout system does `View` use?**
A: Flexbox, via Yoga (Facebook's cross-platform layout engine), with some CSS-inspired defaults changed (e.g. `flexDirection: 'column'` by default).

**5. Q: Is `View` accessible/focusable by default?**
A: Not by default. You need to set `accessible={true}` and related `accessibility*` props for it to be treated as a single accessible element by screen readers.

**6. Q: How do you handle touches on a `View`?**
A: `View` itself has no built-in press handling; you wrap it in `Pressable`, `TouchableOpacity`, or use the `onStartShouldSetResponder`/gesture responder system directly.

**7. Q: What does `overflow: 'hidden'` do on a `View`?**
A: It clips children that extend beyond the view's bounds, similar to CSS. Default is `visible` on iOS in some RN versions, but you should set it explicitly.

**8. Q: Can `View` have a background image?**
A: Not directly — `View` only supports `backgroundColor`. For background images you use `ImageBackground`, which wraps an `Image` and a `View` together.

**9. Q: How does `View` handle `zIndex`?**
A: `zIndex` works only among siblings within the same parent and only meaningfully affects rendering order when using absolute/relative positioning together with overlapping views.

**10. Q: What's the difference between `View` and `SafeAreaView`?**
A: `SafeAreaView` is a specialized `View` that automatically adds padding/insets to avoid notches, status bars, and home indicators; a plain `View` has no such awareness.

**11. Q: Can a `View` be animated?**
A: Yes, typically via `Animated.View` (from the `Animated` API) or `Reanimated`'s `Animated.View`, which interpolate style props like `opacity`, `transform`, etc.

**12. Q: What native component does `View` map to on Android?**
A: A `ReactViewGroup`, which extends Android's `ViewGroup`.

**13. Q: How do nested `Views` affect layout performance?**
A: Deeply nested view hierarchies increase layout calculation cost (Yoga has to traverse more nodes) and can slow down initial render and re-layout; flattening hierarchies helps performance.

**14. Q: Does `View` support `pointerEvents`?**
A: Yes — `pointerEvents` (`'auto'`, `'none'`, `'box-none'`, `'box-only'`) controls whether the view and/or its children can be touch targets.

**15. Q: Can you give a `View` a border-radius per corner?**
A: Yes, using `borderTopLeftRadius`, `borderTopRightRadius`, `borderBottomLeftRadius`, `borderBottomRightRadius` individually, in addition to the shorthand `borderRadius`.

## Section B — Text (15)

**16. Q: Why must all text be wrapped in `<Text>`?**
A: Because RN's native text rendering (especially on iOS with `NSAttributedString`) needs to know the full styled text run ahead of time; there's no browser-style inline text layout engine, so text nodes must be explicit.

**17. Q: Can `Text` components be nested?**
A: Yes — nesting `Text` inside `Text` lets you apply different styles (like bold or colored spans) to parts of a sentence, and styles are inherited/merged from parent to child.

**18. Q: Does `Text` support `onPress`?**
A: Yes, `Text` has a built-in `onPress` prop, making it touchable without wrapping in a `Pressable`, useful for things like inline links.

**19. Q: How do you truncate long text in RN?**
A: Use `numberOfLines` combined with `ellipsizeMode` (`'head'`, `'middle'`, `'tail'`, `'clip'`) to truncate text and control where the ellipsis appears.

**20. Q: What prop selects text for copying?**
A: `selectable={true}` makes text user-selectable (mainly relevant on iOS/Android long-press-to-copy).

**21. Q: How do you control letter spacing and line height?**
A: Via the style props `letterSpacing` and `lineHeight`, applied like any other style on `Text`.

**22. Q: Is `Text` styling inherited by nested `Text`?**
A: Yes, style properties cascade down to nested `Text` children, unlike `View`, which does not have style inheritance for its children.

**23. Q: What's `adjustsFontSizeToFit` for?**
A: An iOS/Android prop that shrinks font size automatically so text fits within its container, often combined with `numberOfLines` and `minimumFontScale`.

**24. Q: Can you disable font scaling from device accessibility settings?**
A: Yes, with `allowFontScaling={false}`, though it's discouraged for accessibility — it prevents the text from respecting the user's system font size preference.

**25. Q: What happens if you don't specify a font family?**
A: RN falls back to the OS default system font (San Francisco on iOS, Roboto on Android), which differs per platform unless you load a custom font.

**26. Q: How do you underline or strike through text?**
A: With the `textDecorationLine` style prop: `'none'`, `'underline'`, `'line-through'`, or `'underline line-through'`.

**27. Q: Does `Text` support `ellipsizeMode` without `numberOfLines`?**
A: `ellipsizeMode` only takes effect when `numberOfLines` is also set; without a line limit there's nothing to ellipsize.

**28. Q: How is text measured for layout in RN?**
A: The native text rendering system (Yoga + platform text layout, e.g. `NSAttributedString` bounding rect or Android `StaticLayout`) measures actual glyph metrics, which is why measuring can differ slightly from CSS-based web tools.

**29. Q: Can `Text` contain an `Image`?**
A: Yes — nesting an `Image` inside `Text` is supported so it flows inline with the text, similar to an inline image in rich text.

**30. Q: What's the performance concern with many nested `Text` spans?**
A: Each additional nested `Text` requires extra native measurement/layout work; excessive nesting for rich text can slow rendering, so libraries often flatten styled spans internally.

## Section C — Image (15)

**31. Q: Why doesn't `Image` auto-size like an HTML `<img>`?**
A: Because RN doesn't know image dimensions ahead of network fetch/layout the way a browser progressively does, so you must specify `width`/`height` (or use `resizeMode`/aspect ratio tricks) up front to avoid layout jumps.

**32. Q: What are the two main ways to source an image?**
A: `require('./local.png')` for bundled local assets (resolved and sized automatically at build time) and `{ uri: 'https://...' }` for remote images (dimensions unknown until loaded unless specified).

**33. Q: What does `resizeMode="cover"` do?**
A: It scales the image to fill the given dimensions while preserving aspect ratio, cropping any overflow — similar to CSS `background-size: cover`.

**34. Q: What does `resizeMode="contain"` do?**
A: It scales the image to fit entirely within the given box while preserving aspect ratio, potentially leaving empty space — like CSS `background-size: contain`.

**35. Q: How do you show a placeholder while a remote image loads?**
A: Use the `onLoadStart`/`onLoadEnd` callbacks with local state, or use `ImageBackground`/overlay a loader, or libraries like `expo-image`/`FastImage` that support built-in placeholders.

**36. Q: What is `Image.getSize()` used for?**
A: It asynchronously retrieves the width and height of a remote image before rendering, letting you calculate aspect-ratio-correct dimensions dynamically.

**37. Q: How does RN handle image caching?**
A: On iOS, `Image` uses the system `NSURLCache` by default; caching behavior on Android is more limited, which is why many teams use `FastImage` or `expo-image` for aggressive disk caching.

**38. Q: What's `Image.prefetch()`?**
A: A static method that downloads and caches an image ahead of time (e.g., before navigating to a screen) so it renders instantly when the `Image` component mounts.

**39. Q: How do you support multiple pixel densities for local images?**
A: By providing `@2x` and `@3x` suffixed files alongside the base image (e.g., `logo.png`, `logo@2x.png`, `logo@3x.png`); RN's bundler auto-selects the right one for the device.

**40. Q: What does `onError` on `Image` do?**
A: It fires a callback with error info if the image fails to load (bad URL, network failure), letting you show a fallback UI.

**41. Q: Can you apply `borderRadius` to make a circular avatar image?**
A: Yes — setting equal `width`, `height`, and `borderRadius: width/2` produces a circular image, same technique as CSS.

**42. Q: What's the difference between `Image` and `ImageBackground`?**
A: `ImageBackground` renders an image as a background layer behind child components (like CSS `background-image`), whereas plain `Image` is a standalone element that can't contain children.

**43. Q: Does `Image` support GIFs and WebP?**
A: Yes on both platforms for basic display, though animated GIF support and performance vary; WebP requires enabling it in native build config on older RN/Android setups.

**44. Q: How can loading many images in a list hurt performance?**
A: Uncontrolled image loading (no caching, no downsizing, no lazy load) can spike memory and jank scrolling; solutions include list virtualization (`FlatList`), image resizing on the server, and caching libraries.

**45. Q: What accessibility prop should images convey meaning have?**
A: `accessibilityLabel`, which provides a text description read by screen readers, similar to `alt` text on the web.

## Section D — Button (10)

**46. Q: What platforms styling does the built-in `Button` support?**
A: Very limited — mainly `color` (text/tint color) and `title`; you cannot control padding, font, border, or background shape beyond that.

**47. Q: Why do most production apps avoid `Button`?**
A: Because its styling API is too restrictive for custom designs; teams build custom pressable components instead for full control over appearance and interaction states.

**48. Q: How do you disable a `Button`?**
A: Set the `disabled={true}` prop, which also visually dims it and blocks `onPress` from firing.

**49. Q: What prop handles a tap on `Button`?**
A: `onPress`, a required prop taking a callback function.

**50. Q: Does `Button` look the same on iOS and Android?**
A: No — it renders with platform-native styling by default (different shapes/colors), reinforcing platform-appropriate UI conventions out of the box.

**51. Q: Can `Button` show a loading state natively?**
A: No, there's no built-in loading prop; you'd conditionally render an `ActivityIndicator` in place of the button or build a custom component.

**52. Q: What's the `accessibilityLabel` default for `Button`?**
A: It defaults to the `title` text if no explicit `accessibilityLabel` is provided.

**53. Q: Is `Button` good for learning React Native fundamentals?**
A: Yes — it's a simple way to learn `onPress` handling, `disabled` states, and prop-driven UI before moving to more flexible touchable components.

**54. Q: Can you nest custom children inside `Button`?**
A: No — `Button` only accepts a `title` string prop, not arbitrary children, unlike `Pressable` or `TouchableOpacity`.

**55. Q: What color prop controls Android `Button` background?**
A: `color` sets the button's background color on Android, but only the text color on iOS — a platform inconsistency worth knowing for interviews.

## Section E — TextInput (20)

**56. Q: What's the primary event for capturing typed text?**
A: `onChangeText`, which fires with the current string value on every keystroke; there's also `onChange` which gives a full native event object.

**57. Q: How do you show a numeric keyboard?**
A: Set `keyboardType="numeric"` (or `"number-pad"`, `"decimal-pad"`, `"phone-pad"` depending on desired input set).

**58. Q: How do you make a password field?**
A: Set `secureTextEntry={true}`, which masks input characters.

**59. Q: What does `autoCapitalize` control?**
A: How the OS auto-capitalizes typed text: `'none'`, `'sentences'`, `'words'`, or `'characters'`.

**60. Q: How do you detect the "submit"/"return" key press?**
A: Via `onSubmitEditing`, fired when the user presses the return/done key on the keyboard.

**61. Q: How do you programmatically focus a `TextInput`?**
A: Get a ref to it and call `ref.current.focus()`; `.blur()` dismisses focus similarly.

**62. Q: What's the difference between controlled and uncontrolled `TextInput` usage?**
A: Controlled means the `value` prop is driven by React state updated via `onChangeText`; uncontrolled means you let the native input manage its own text and only read it via ref or `defaultValue`.

**63. Q: How do you limit input length?**
A: `maxLength` prop caps the number of characters accepted.

**64. Q: What prop hides the return key's default label and customizes it?**
A: `returnKeyType` (e.g., `'done'`, `'go'`, `'search'`, `'next'`) changes the label/icon on the keyboard's action key.

**65. Q: How do you make a multiline text input (like a comment box)?**
A: Set `multiline={true}`, and optionally control height via `numberOfLines` (Android) or dynamic `onContentSizeChange`.

**66. Q: What's `autoCorrect` for?**
A: A boolean prop to enable/disable the OS's autocorrect suggestions while typing.

**67. Q: How do you detect focus/blur events?**
A: Via the `onFocus` and `onBlur` callback props.

**68. Q: What does `editable={false}` do?**
A: Makes the input read-only/non-interactive without visually looking fully disabled like a grayed out field (styling for disabled look is manual).

**69. Q: How do you set a placeholder and its color?**
A: `placeholder` for the text, `placeholderTextColor` for its color, since regular text `color` style doesn't affect placeholder text.

**70. Q: How does `TextInput` interact with the keyboard covering the input?**
A: RN doesn't auto-adjust the layout; you typically wrap the screen in `KeyboardAvoidingView` or use a library like `react-native-keyboard-aware-scroll-view` to shift content up.

**71. Q: What's `clearButtonMode` (iOS only)?**
A: Shows/hides a native "clear text" (X) button inside the input, controlled by values like `'never'`, `'while-editing'`, `'always'`.

**72. Q: How do you validate email input at the keyboard level?**
A: Set `keyboardType="email-address"` to surface `@` and `.com` shortcuts, though actual validation logic must still be done in JS.

**73. Q: What ref method clears the text field?**
A: `ref.current.clear()` clears the input's text natively.

**74. Q: Can `TextInput` support rich formatted text (bold/italic mixed)?**
A: Not natively — RN's `TextInput` only handles plain text editing; rich text editors require third-party native modules or custom implementations.

**75. Q: Why is debouncing `onChangeText` often necessary?**
A: Because it fires on every keystroke, so expensive operations like API calls (search-as-you-type) should be debounced/throttled to avoid excessive network requests and re-renders.

## Section F — ScrollView (15)

**76. Q: Why is `ScrollView` risky for long lists?**
A: It renders all children eagerly regardless of visibility, so a long or dynamic list can consume excessive memory and cause slow initial render/lag.

**77. Q: When is `ScrollView` an appropriate choice?**
A: For short, fixed-length content, like a settings screen or a form, where the full content is known and small enough to render upfront.

**78. Q: How do you make `ScrollView` scroll horizontally?**
A: Set `horizontal={true}`.

**79. Q: What's `contentContainerStyle` for?**
A: It styles the inner scrollable content container (e.g. padding, alignment), as distinct from `style`, which styles the outer scroll wrapper itself.

**80. Q: How do you hide the scroll indicator?**
A: `showsVerticalScrollIndicator={false}` or `showsHorizontalScrollIndicator={false}` depending on orientation.

**81. Q: What is `pagingEnabled` used for?**
A: Snaps scrolling to full-page/view increments, commonly used for horizontal carousels or onboarding screens.

**82. Q: How do you detect scroll position changes?**
A: The `onScroll` event callback, often combined with `scrollEventThrottle` to control how frequently it fires.

**83. Q: What does `scrollEventThrottle` control?**
A: How often (in milliseconds) the `onScroll` event fires during scrolling; a low value gives smoother tracking at higher performance cost.

**84. Q: How do you programmatically scroll to a position?**
A: Using a ref and calling `scrollTo({ x, y, animated })` or `scrollToEnd({ animated })`.

**85. Q: Can `ScrollView` nest another `ScrollView` with the same scroll direction?**
A: It's discouraged and can cause gesture conflicts; nesting is generally only safe with different scroll directions (e.g., vertical outer, horizontal inner) or by disabling scroll on one.

**86. Q: What's `keyboardShouldPersistTaps` for?**
A: Controls whether taps on child components (like buttons) dismiss the keyboard first or register normally, useful when a `TextInput` and tappable results list coexist.

**87. Q: Does `ScrollView` support pull-to-refresh?**
A: Yes, via the `refreshControl` prop, typically passed a `<RefreshControl>` element wired to `refreshing` state and `onRefresh` callback.

**88. Q: How do you disable bounce/overscroll effects on iOS?**
A: Set `bounces={false}`.

**89. Q: What's the performance impact of `removeClippedSubviews` on `ScrollView`?**
A: It can improve memory usage by detaching offscreen views from the native hierarchy, but it's an older optimization more reliably handled by `FlatList`'s virtualization today.

**90. Q: Can `ScrollView` be combined with `Animated` for parallax/header effects?**
A: Yes — commonly `Animated.ScrollView` (or `Animated.createAnimatedComponent(ScrollView)`) drives an animated value from `onScroll` for header collapse/parallax effects.

## Section G — FlatList (25)

**91. Q: What problem does `FlatList` solve compared to `ScrollView`?**
A: It virtualizes rendering — only items currently visible (plus a small buffer) are mounted, dramatically reducing memory and improving performance for long or dynamic lists.

**92. Q: What are the two required props for `FlatList`?**
A: `data` (the array of items) and `renderItem` (a function returning the JSX for each item).

**93. Q: What is `keyExtractor` for?**
A: It returns a unique string key per item, used by React for efficient reconciliation instead of relying on array index by default.

**94. Q: Why is using array index as a key discouraged in `FlatList`?**
A: Because if items are inserted, removed, or reordered, index-based keys cause React to misattribute state/identity to the wrong items, leading to bugs and unnecessary re-renders.

**95. Q: What does `initialNumToRender` control?**
A: How many items are rendered in the very first batch/pass, balancing time-to-first-paint against on-screen completeness.

**96. Q: What's `windowSize` in `FlatList`?**
A: A multiplier (default 21) of the viewport size that determines how much content above/below the visible area stays rendered, trading memory for scroll smoothness.

**97. Q: How do you implement infinite scroll/pagination with `FlatList`?**
A: Use `onEndReached` (fired when scroll nears the list end) combined with `onEndReachedThreshold` to trigger fetching the next page of data.

**98. Q: What's `ListEmptyComponent`?**
A: A component rendered when `data` is an empty array, commonly used for "no results" states.

**99. Q: What's `ListHeaderComponent` / `ListFooterComponent`?**
A: Components rendered once at the very top/bottom of the list content, outside the repeating item template — useful for titles, loaders, or "load more" indicators.

**100. Q: How do you render a grid instead of a single column?**
A: Set `numColumns` greater than 1; items are automatically wrapped into rows.

**101. Q: What is `getItemLayout` used for?**
A: It lets you pre-compute each item's `length`, `offset`, and `index` when item sizes are fixed/known, skipping dynamic measurement and enabling instant `scrollToIndex`.

**102. Q: How do you scroll to a specific item programmatically?**
A: Using a ref and calling `scrollToIndex({ index, animated })` or `scrollToItem`.

**103. Q: What causes items to "flash" or remount unexpectedly in `FlatList`?**
A: Poor `keyExtractor` implementation or new inline function/object props on every render (e.g. inline `renderItem` closures) causing unnecessary re-renders of `React.memo`-wrapped item components.

**104. Q: How can you optimize `renderItem` performance?**
A: Memoize the item component with `React.memo`, use a stable `keyExtractor`, avoid creating new inline functions/objects per render, and use `useCallback` for `renderItem` itself.

**105. Q: What's `refreshControl` in `FlatList` used for?**
A: Same as in `ScrollView` — enables pull-to-refresh behavior via `onRefresh` and `refreshing` props.

**106. Q: What does `removeClippedSubviews` do in `FlatList`?**
A: On Android particularly, it detaches views that are scrolled offscreen from the native view hierarchy to reduce memory, though it can sometimes cause rendering glitches if misused.

**107. Q: How is `FlatList` different from `SectionList`?**
A: `SectionList` renders grouped data with section headers (like a contacts app grouped by letter), accepting a `sections` array of `{ title, data }` objects instead of a flat `data` array.

**108. Q: What's `onViewableItemsChanged` used for?**
A: A callback that reports which items are currently considered "viewable" on screen, useful for tracking impressions/analytics or triggering video autoplay.

**109. Q: What's the underlying architecture behind `FlatList`?**
A: It's built on top of `VirtualizedList`, which itself handles windowing/virtualization logic; `FlatList` is a more ergonomic, opinionated wrapper around it.

**110. Q: How do you add spacing between items?**
A: Via `ItemSeparatorComponent`, which renders a component between (not around) each item, or by applying margin in the item's own style.

**111. Q: Can `FlatList` handle horizontal scrolling?**
A: Yes, via `horizontal={true}`, commonly used for carousels.

**112. Q: What happens if `data` changes but item content changes without the array reference changing?**
A: `FlatList` may not detect the update; use `extraData` prop to signal it should re-render when some external state (not part of `data` itself) changes.

**113. Q: How do you debounce/throttle `onEndReached` firing multiple times?**
A: By tracking an `isFetchingMore` flag in state/ref and short-circuiting duplicate calls until the previous fetch resolves.

**114. Q: What's the tradeoff of a very large `windowSize`?**
A: More off-screen content stays mounted, which smooths fast scrolling but increases memory usage and can hurt performance on lower-end devices.

**115. Q: How do you persist scroll position when navigating away and back?**
A: Manually track the scroll offset (via `onScroll`) and call `scrollToOffset` on remount, since `FlatList` does not automatically preserve scroll position across full unmounts.

## Section H — SafeAreaView / StatusBar (10)

**116. Q: What problem does `SafeAreaView` solve?**
A: It automatically adds padding to avoid system UI intrusions — the iPhone notch/Dynamic Island, home indicator, and similar safe-area-exclusion zones — so content doesn't render underneath them.

**117. Q: Does `SafeAreaView` work well on Android?**
A: Historically limited/inconsistent; most teams use the community `react-native-safe-area-context` library, which provides more reliable, configurable insets across both platforms.

**118. Q: What does `StatusBar` control?**
A: The appearance (color, style, visibility, translucency) of the device's status bar at the top of the screen.

**119. Q: How do you set light text on a dark status bar?**
A: `<StatusBar barStyle="light-content" />` (iOS-oriented prop name, also respected on Android).

**120. Q: How do you hide the status bar entirely?**
A: `<StatusBar hidden={true} />`.

**121. Q: Can `StatusBar` settings differ per screen in a navigator?**
A: Yes — placing a `<StatusBar>` component in each screen lets it override global settings when that screen is focused, common in navigation-heavy apps.

**122. Q: What's `translucent` on Android `StatusBar`?**
A: Makes the status bar transparent, letting your content render behind it, requiring you to manually add top padding/insets to avoid overlap.

**123. Q: What's the `useSafeAreaInsets` hook for?**
A: From `react-native-safe-area-context`, it returns numeric inset values (`top`, `bottom`, `left`, `right`) so you can apply padding/margin manually instead of using `SafeAreaView`'s wrapper behavior.

**124. Q: Why might you avoid `SafeAreaView` in favor of manual insets?**
A: For finer control — e.g., applying safe-area padding only to specific edges, or when a component (like a bottom tab bar) needs custom inset-aware styling rather than blanket padding.

**125. Q: Does `SafeAreaView` affect landscape orientation?**
A: Yes, insets adjust dynamically based on orientation (e.g., a notch appearing on the side in landscape), which is why libraries recalculate insets on rotation.

## Section I — Other Core/Common Components (25)

**126. Q: What's `Pressable` and why was it introduced?**
A: A modern, highly configurable touch-handling component that unifies and extends the older Touchable* API, exposing granular states (`pressed`) and fine-tuned hit-slop/press-delay configuration.

**127. Q: What's the difference between `TouchableOpacity` and `TouchableHighlight`?**
A: `TouchableOpacity` reduces opacity on press for visual feedback, while `TouchableHighlight` overlays/darkens a background color underlay on press — both are largely superseded by `Pressable`.

**128. Q: What does `TouchableWithoutFeedback` do?**
A: Registers touches without any built-in visual feedback, often used to dismiss a keyboard when tapping outside an input.

**129. Q: How does `Pressable`'s `style` prop support dynamic styling?**
A: `style` can accept a function `({ pressed }) => ({...})`, letting you conditionally style based on interaction state without manual `useState`.

**130. Q: What's `hitSlop` used for?**
A: It expands the touchable area beyond a component's visual bounds (e.g., `{ top: 10, bottom: 10, left: 10, right: 10 }`), useful for small icons needing a larger tap target.

**131. Q: What's `Modal` used for?**
A: Rendering content above the rest of the app in a separate native layer, commonly for dialogs, full-screen overlays, or action sheets.

**132. Q: What are `Modal`'s `animationType` options?**
A: `'none'`, `'slide'`, and `'fade'`, controlling how the modal transitions in/out.

**133. Q: What's `Modal`'s `presentationStyle` (iOS)?**
A: Controls how the modal visually presents — `'fullScreen'`, `'pageSheet'`, `'formSheet'`, `'overFullScreen'` — mapping to native iOS presentation styles.

**134. Q: How do you handle the Android hardware back button with `Modal`?**
A: Via the `onRequestClose` prop, required on Android, which fires when the back button is pressed while the modal is open.

**135. Q: What's `ActivityIndicator`?**
A: A native platform-styled loading spinner component, configurable via `size` (`'small'`/`'large'`) and `color`.

**136. Q: What's `Switch`?**
A: A native toggle/checkbox-style boolean input, styled per-platform, controlled via `value` and `onValueChange`.

**137. Q: What does `KeyboardAvoidingView` do?**
A: Automatically adjusts its height, position, or bottom padding when the keyboard appears, preventing inputs from being obscured; behavior is controlled via the `behavior` prop (`'padding'`, `'height'`, `'position'`).

**138. Q: Why does `KeyboardAvoidingView` behave differently per platform?**
A: Because iOS and Android handle keyboard-triggered resizing differently at the OS level, so the recommended `behavior` value often differs (`'padding'` on iOS, sometimes unnecessary or `'height'` on Android).

**139. Q: What is `SectionList` best suited for?**
A: Grouped, categorized data — like an alphabetically sectioned contact list — rendering `renderSectionHeader` per group alongside virtualized items.

**140. Q: What's `VirtualizedList`?**
A: The lower-level abstraction underlying `FlatList` and `SectionList`, exposing more granular virtualization control for building custom high-performance lists.

**141. Q: What's `Alert`?**
A: An API (not a visual component you place in JSX) for showing native OS alert dialogs via `Alert.alert(title, message, buttons)`.

**142. Q: What's the `Linking` API used for alongside components?**
A: Opening external URLs, deep links, or other apps (e.g., `Linking.openURL('https://...')`), often triggered from a `Pressable`/`Text` `onPress`.

**143. Q: What's `RefreshControl` and where is it used?**
A: A component passed to `ScrollView`/`FlatList`'s `refreshControl` prop to implement native pull-to-refresh with a spinner tied to `refreshing` state.

**144. Q: What's `FlatList`'s relationship to `SectionList` in terms of code reuse?**
A: Both share the same `VirtualizedList` core, so performance techniques (memoization, `keyExtractor`, `getItemLayout`) generally transfer between them.

**145. Q: What is `Dimensions`/layout-related but not a visual component — why mention it here?**
A: It's an API (not JSX component) frequently used alongside core components for responsive sizing — see Topic 2 for full coverage.

**146. Q: What's the purpose of `TouchableNativeFeedback` (Android-only)?**
A: Provides Android's native ripple effect on press, giving material-design-consistent feedback; it has no iOS equivalent and is being folded into `Pressable`'s `android_ripple` config.

**147. Q: How does `Pressable` replace `TouchableNativeFeedback`'s ripple?**
A: Via the `android_ripple` prop, letting you configure ripple color/radius/borderless behavior directly without a separate component.

**148. Q: What's `InputAccessoryView` (iOS)?**
A: A component that renders a custom view pinned above the keyboard (like a "Done" toolbar), useful for custom input accessory bars.

**149. Q: Why is component composition (View + Text + Pressable) usually preferred over monolithic built-ins like `Button`?**
A: It offers full control over styling, layout, animation, and accessibility, matching design systems precisely rather than being constrained by a native component's limited prop surface.

**150. Q: What's a common interview trap question about `View` and `Text` nesting?**
A: Asking why `<View>Hello</View>` throws an error — testing whether the candidate understands RN's strict text-in-`Text`-only rule, unlike HTML's permissive text nodes anywhere.
