# React Native Interview Questions — Topic 2: Styling & Layout (150 Q&A)

## Section A — StyleSheet.create (15)

**1. Q: What does `StyleSheet.create` actually do?**
A: It takes a plain object of style definitions and returns an object mapping each key to an internal numeric ID (in the old architecture) or an optimized reference, avoiding creating a brand-new style object on every render.

**2. Q: Is `StyleSheet.create` required to style components?**
A: No — you can pass plain JS objects directly to `style`, but `StyleSheet.create` is recommended for performance and tooling benefits.

**3. Q: What performance benefit does `StyleSheet.create` give?**
A: It lets styles be sent to the native side once and referenced by ID afterward, rather than being serialized and re-sent as fresh objects on every render.

**4. Q: Does `StyleSheet.create` validate style properties?**
A: Yes, to an extent — invalid or misspelled style keys often produce clearer warnings/errors than plain objects would, aiding debugging.

**5. Q: Can you combine multiple styles on one component?**
A: Yes, by passing an array: `style={[styles.base, styles.active]}` — later styles in the array override earlier ones for conflicting keys.

**6. Q: How do you conditionally apply a style?**
A: Common pattern: `style={[styles.button, isActive && styles.buttonActive]}`, relying on `false`/`null` being ignored in the style array.

**7. Q: What's `StyleSheet.flatten()` used for?**
A: It merges an array of styles (including IDs and objects) into a single plain object, useful when you need to inspect or manipulate computed style values in JS.

**8. Q: What's `StyleSheet.absoluteFill`?**
A: A shorthand style object equivalent to `{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }`, commonly used for full-bleed overlays.

**9. Q: What's `StyleSheet.hairlineWidth`?**
A: A cross-platform constant representing the thinnest line renderable on the current device's screen density, used for crisp 1px-look borders/dividers.

**10. Q: Can `StyleSheet.create` styles be dynamic/computed at runtime?**
A: Not directly inside `create` itself efficiently for per-render values — dynamic values (like from state) are usually passed as separate inline style objects merged with static `StyleSheet.create` styles.

**11. Q: Why is defining styles outside the component function/render method recommended?**
A: To avoid recreating style objects on every render, which would defeat memoization benefits and could trigger unnecessary re-renders in memoized children if styles are passed as props.

**12. Q: Does `StyleSheet` support media-query-like conditional styles natively?**
A: No — there's no native `@media` equivalent; responsive styling must be done in JS with `Dimensions`/`useWindowDimensions` and conditional logic.

**13. Q: What TypeScript types are commonly used with `StyleSheet.create`?**
A: `ViewStyle`, `TextStyle`, and `ImageStyle` from `react-native`, often combined into a typed style object via `StyleSheet.create<{...}>({...})` for compile-time safety.

**14. Q: Can you spread one `StyleSheet` style into another plain object?**
A: Yes, since flattened/created styles behave like accessible objects/IDs; spreading is possible but often unnecessary — arrays are the idiomatic composition method.

**15. Q: What happens if two styles in an array define the same property?**
A: The later style in the array wins — array order determines precedence, just like CSS cascade but simpler (no specificity rules, just array order).

## Section B — Flexbox Fundamentals (25)

**16. Q: What layout engine powers Flexbox in React Native?**
A: Yoga, an open-source, cross-platform layout engine written in C++ that implements a Flexbox-like specification consistently across iOS, Android, and other platforms.

**17. Q: Why is there no CSS Grid in RN?**
A: Because Yoga implements only Flexbox, not the full CSS layout spec; grid-like layouts must be built manually using nested Flexbox rows/columns or via `numColumns` in `FlatList`.

**18. Q: What is the default `flexDirection` in React Native?**
A: `'column'` — the opposite of the web default (`'row'`), which is one of the most common gotchas for developers coming from web CSS.

**19. Q: What does `flex: 1` mean on a component?**
A: It tells the component to grow and take up all available remaining space along the main axis relative to its siblings' flex values.

**20. Q: What's the difference between `flexGrow`, `flexShrink`, and `flexBasis`?**
A: `flexGrow` controls how much a component expands into extra space, `flexShrink` controls how much it shrinks when space is tight, and `flexBasis` sets its initial size before growing/shrinking is applied.

**21. Q: How does `flex: 1` differ from setting an explicit `height`/`width`?**
A: `flex: 1` is relative/proportional and adapts to available space and sibling flex values, while explicit dimensions are fixed regardless of container size or siblings.

**22. Q: What's the "main axis" vs "cross axis"?**
A: The main axis follows `flexDirection` (e.g., vertical for `'column'`); the cross axis is perpendicular to it — `justifyContent` operates on the main axis, `alignItems` on the cross axis.

**23. Q: What does `justifyContent` control?**
A: Alignment/distribution of children along the main axis: `'flex-start'`, `'flex-end'`, `'center'`, `'space-between'`, `'space-around'`, `'space-evenly'`.

**24. Q: What does `alignItems` control?**
A: Alignment of children along the cross axis: `'flex-start'`, `'flex-end'`, `'center'`, `'stretch'`, `'baseline'`.

**25. Q: What's the difference between `alignItems` and `alignSelf`?**
A: `alignItems` is set on the parent and applies to all children by default; `alignSelf` is set on an individual child and overrides the parent's `alignItems` just for that child.

**26. Q: What's `alignContent` for, and how does it differ from `alignItems`?**
A: `alignContent` controls spacing between *multiple lines* of wrapped content (only relevant with `flexWrap: 'wrap'` and multiple rows/columns), whereas `alignItems` aligns items within a single line.

**27. Q: What does `flexWrap: 'wrap'` do?**
A: Allows children to wrap onto multiple lines/rows instead of being forced to shrink or overflow along a single line.

**28. Q: If `flexDirection` is `'row'`, which axis does `justifyContent` control?**
A: The horizontal axis (main axis for row layouts) — this is a very common interview trick question testing axis comprehension.

**29. Q: What's the default value of `alignItems`?**
A: `'stretch'` — children stretch to fill the cross axis unless a fixed dimension along that axis is specified.

**30. Q: What happens if a child has no explicit `height` in a `column` flex container with `alignItems: 'stretch'`?**
A: Its height is determined by its content (or flex-grow behavior along the main axis), while `stretch` affects the cross axis (width, in a column container).

**31. Q: How do you center a single child both horizontally and vertically?**
A: Set the parent's `flex: 1`, `justifyContent: 'center'`, and `alignItems: 'center'`.

**32. Q: What's `flexDirection: 'row-reverse'`?**
A: Lays out children horizontally but in reverse order (last child appears first).

**33. Q: Can `flex` values be fractional or unequal between siblings?**
A: Yes — siblings with `flex: 1` and `flex: 2` split remaining space proportionally, with the second taking twice as much as the first.

**34. Q: What's a common bug when mixing `flex: 1` with `ScrollView`?**
A: Applying `flex: 1` directly to `ScrollView`'s `style` without `flexGrow: 1` on `contentContainerStyle` can cause content to not fill available space or the ScrollView to not size correctly.

**35. Q: How does `flexBasis: 'auto'` behave?**
A: The item's size is based on its own content/explicit width-height before any growing or shrinking is applied — the default behavior when `flexBasis` isn't set.

**36. Q: What's the effect of `flexShrink: 0`?**
A: Prevents the item from shrinking below its base size even if the container doesn't have enough space, which can cause overflow.

**37. Q: How do you create equal-width columns with Flexbox?**
A: Give each column `flex: 1` inside a `flexDirection: 'row'` parent; they'll split the available width equally.

**38. Q: What's the interview-relevant difference between RN Flexbox and web Flexbox besides direction default?**
A: RN doesn't support all CSS flex shorthand syntax (`flex: 1 1 auto` isn't a single string prop — you set `flexGrow`/`flexShrink`/`flexBasis` individually or use the simplified numeric `flex` prop), and percentage support/behavior can differ slightly.

**39. Q: Does RN support `gap` for spacing between flex children?**
A: Yes in modern RN versions (`gap`, `rowGap`, `columnGap` style props are supported), removing the need for manual margin-based spacing hacks.

**40. Q: What's a common technique for spacing children before `gap` was supported?**
A: Applying margin to all but the first/last child, often via a custom `Spacer` component or conditional margin logic based on index in a mapped list.

## Section C — flexDirection / justifyContent / alignItems / alignSelf / flexWrap Deep Dive (20)

**41. Q: How would you build a horizontal navbar with items spread to the edges?**
A: `flexDirection: 'row'` with `justifyContent: 'space-between'` on the container.

**42. Q: How do you vertically center text next to an icon in a row?**
A: `flexDirection: 'row'` with `alignItems: 'center'` on the parent.

**43. Q: What's the effect of `justifyContent: 'space-evenly'` vs `'space-between'`?**
A: `'space-between'` places equal space only *between* items (none at the edges), while `'space-evenly'` distributes equal space between items *and* at both edges.

**44. Q: How do you make one child stick to the bottom of a `flex: 1` column container?**
A: `justifyContent: 'flex-end'` on the parent, or give preceding siblings `flex: 1` to push the target child down, or use `marginTop: 'auto'` on the target child (RN supports auto margins).

**45. Q: Does React Native support `margin: 'auto'` for pushing elements apart?**
A: Yes, RN supports `marginLeft: 'auto'`, `marginTop: 'auto'`, etc., which behave like CSS auto margins in flex containers, useful for pushing a single item to one side.

**46. Q: How do you align one item differently from its row siblings?**
A: Apply `alignSelf` on that specific item, overriding the parent's `alignItems` value just for it.

**47. Q: What's the effect of combining `flexWrap: 'wrap'` with `flexDirection: 'row'`?**
A: Items lay out left-to-right and wrap to a new "row line" when they run out of horizontal space, useful for tag clouds or grid-like layouts.

**48. Q: How would you build a responsive grid of cards without `FlatList`'s `numColumns`?**
A: A `flexDirection: 'row'`, `flexWrap: 'wrap'` container with each card given a fixed or percentage-based width (e.g., `width: '48%'`) so a fixed number fit per line.

**49. Q: What's the layout gotcha with `alignItems: 'stretch'` and `Text`?**
A: Text components don't stretch to fill cross-axis width in the same intuitive way block elements do on the web; text width is generally driven by content unless explicitly constrained.

**50. Q: How does `baseline` alignment work in `alignItems`?**
A: It aligns children so their text baselines line up horizontally, useful when mixing different font sizes in a row (e.g., a price with a large number and small currency label).

**51. Q: What happens when you set both `flexGrow: 1` and an explicit `width` on the same element?**
A: The explicit `width` generally acts as the starting basis, but `flexGrow` can still cause the element to expand beyond it if there's available space, depending on `flexBasis` interplay.

**52. Q: How would you build a two-column layout where one column is fixed-width and the other flexible?**
A: `flexDirection: 'row'` parent; fixed column gets an explicit `width` (e.g., `width: 80`), flexible column gets `flex: 1` to consume remaining space.

**53. Q: What's the risk of deeply nesting flex containers with `flex: 1`?**
A: Each level adds layout calculation overhead, and improperly balanced `flex` values across nested levels can cause components to collapse to zero height/width unexpectedly.

**54. Q: Why might a `flex: 1` child render with zero height inside a `ScrollView`?**
A: Because `ScrollView`'s content container doesn't have a bounded height by default (it grows to fit content), so `flex: 1` has no fixed parent size to be relative to, collapsing the child.

**55. Q: How do you fix that zero-height issue?**
A: Set `flexGrow: 1` on the `ScrollView`'s `contentContainerStyle` (not `flex: 1`) so the content area is allowed to grow to fill the viewport while still being scrollable if content exceeds it.

**56. Q: What's `flexDirection: 'column-reverse'` used for?**
A: Stacks children vertically but in reverse order (last child on top) — useful for chat interfaces where new messages should visually anchor at the bottom.

**57. Q: How do you evenly space icons in a bottom tab bar?**
A: `flexDirection: 'row'`, `justifyContent: 'space-around'` or `'space-between'`, each tab item often also getting `flex: 1` for equal-width tap targets.

**58. Q: What's a common Flexbox debugging technique in RN (no browser devtools inspector by default)?**
A: Temporarily adding contrasting `backgroundColor` to each nested `View` to visually reveal boundaries, or using React DevTools/Flipper's layout inspector.

**59. Q: How does `alignSelf: 'stretch'` differ when a fixed `width` is also specified on the child?**
A: The explicit `width` takes precedence — `alignSelf: 'stretch'` only has an effect when no conflicting fixed cross-axis dimension is set.

**60. Q: Why might interviewers ask you to draw out a layout with only `flexDirection`, `justifyContent`, and `alignItems`?**
A: Because mastering these three properties covers the vast majority of real-world RN layouts, and testing them reveals whether a candidate truly understands axis-relative reasoning versus memorized snippets.

## Section D — Positioning (15)

**61. Q: What are the two `position` values in RN?**
A: `'relative'` (default) and `'absolute'` — RN does not support `'fixed'` or `'sticky'` like web CSS.

**62. Q: How does `position: 'absolute'` behave relative to its parent?**
A: It's positioned relative to its nearest ancestor (the parent `View`), using `top`, `left`, `right`, `bottom` offsets, and is removed from normal flex flow.

**63. Q: How do you center an absolutely positioned overlay?**
A: Combine `position: 'absolute'` with `top: 0, left: 0, right: 0, bottom: 0` (or `StyleSheet.absoluteFill`) plus `justifyContent: 'center'`, `alignItems: 'center'` on that same layer.

**64. Q: What happens to sibling layout when one child is `position: 'absolute'`?**
A: That child is taken out of the normal Flexbox flow entirely; it doesn't affect the size or position calculations of its siblings.

**65. Q: How does `zIndex` behave in RN compared to web?**
A: It works similarly (higher values render on top) but only among sibling views in the same stacking context — there's no true global stacking context management like advanced CSS.

**66. Q: What's a common use case for `position: 'absolute'`?**
A: Badges/notification dots on icons, floating action buttons, custom modals/tooltips, and overlay headers on top of scrollable content.

**67. Q: Can `position: 'absolute'` elements overflow their parent bounds?**
A: Yes, unless the parent has `overflow: 'hidden'` set, in which case they'll be clipped at the parent's edges.

**68. Q: How do you create a badge in the top-right corner of an icon?**
A: Wrap the icon in a `View` with `position: 'relative'`, then give the badge `position: 'absolute'`, `top: -4, right: -4` (or similar small offsets).

**69. Q: Does RN support `position: 'sticky'` for headers?**
A: Not as a style prop; sticky headers within a `ScrollView` are achieved via `stickyHeaderIndices` prop on `ScrollView`, or manually with animated positioning based on scroll offset.

**70. Q: What's `stickyHeaderIndices`?**
A: A `ScrollView` prop accepting an array of child indices that should remain pinned to the top while scrolling past them, mimicking sticky/fixed headers.

**71. Q: How do negative margins interact with layout in RN?**
A: They're supported and behave like CSS negative margins, pulling an element outside its normal box, often used for overlapping visual effects instead of absolute positioning in simple cases.

**72. Q: What determines stacking order when `zIndex` is not set?**
A: DOM/JSX order — later siblings render on top of earlier ones by default, same as painting order in most UI systems.

**73. Q: Can you animate `zIndex`?**
A: Technically yes via state changes, but since it's not a continuous/interpolatable value in the traditional `Animated` sense, it's usually toggled discretely rather than smoothly animated.

**74. Q: What's the interaction between `position: 'absolute'` and percentage-based `width`?**
A: Percentages resolve against the nearest positioned/sized ancestor's dimensions, same conceptual model as CSS, letting you build responsive absolutely-positioned overlays.

**75. Q: Why might an absolutely positioned element not appear at all?**
A: Common causes: the parent has no defined size (zero width/height) for percentages to resolve against, or the element is clipped by an ancestor's `overflow: 'hidden'`.

## Section E — Dimensions & useWindowDimensions (15)

**76. Q: What does `Dimensions.get('window')` return?**
A: An object with `width`, `height`, `scale`, and `fontScale` for the app's usable window area (distinct from `'screen'`, which includes system UI in some cases).

**77. Q: What's the difference between `Dimensions.get('window')` and `Dimensions.get('screen')`?**
A: `'window'` reflects the visible application area; `'screen'` reflects the full physical screen dimensions, which can differ on platforms with split-screen or multi-window support.

**78. Q: Why doesn't `Dimensions.get()` update automatically on rotation?**
A: Because it's a synchronous snapshot taken at call time — it does not subscribe to changes, so a component relying only on it will show stale dimensions after rotation unless it manually re-queries.

**79. Q: How do you react to dimension changes (e.g., rotation) with `Dimensions`?**
A: Subscribe to the `'change'` event: `Dimensions.addEventListener('change', callback)`, then update local state and remember to remove the listener on unmount.

**80. Q: What's `useWindowDimensions()` and why is it preferred today?**
A: A React hook that returns live `width`/`height` and automatically triggers a re-render on orientation/window size changes, removing the need for manual event listener boilerplate.

**81. Q: How would you conditionally render a two-column vs one-column layout based on screen width?**
A: `const { width } = useWindowDimensions(); const columns = width > 600 ? 2 : 1;` then apply that to layout logic or `FlatList`'s `numColumns`.

**82. Q: Is `useWindowDimensions` reactive to split-screen/multi-window resizing on tablets?**
A: Yes — since it's hook-based and subscribes to native dimension change events, it re-renders when the app's window is resized, e.g., in Android split-screen mode.

**83. Q: What's a percentage-based width alternative to using `Dimensions`?**
A: Using string percentage values directly in styles (e.g., `width: '50%'`), which resolves relative to the parent's size without needing JS calculation at all.

**84. Q: When would you still need `Dimensions`/`useWindowDimensions` over percentages?**
A: When you need the actual pixel value for calculations (e.g., computing an image aspect-ratio height, positioning based on absolute pixel offsets, or comparing against breakpoints).

**85. Q: What's a common breakpoint strategy pattern in RN (since there's no media query)?**
A: Defining JS constants for breakpoints (e.g., `const isTablet = width >= 768`) and branching styles/layout conditionally based on those booleans.

**86. Q: Does `Dimensions.get('window')` include the status bar height?**
A: Generally yes, it reflects the usable app window, but exact behavior can vary by platform and is why insets (`SafeAreaView`/`useSafeAreaInsets`) are handled separately.

**87. Q: How do you get notified before first render of the current dimensions without a flash of incorrect layout?**
A: `useWindowDimensions()` provides the value synchronously on first render (no separate effect/listener needed like the older `Dimensions.get` + event pattern), avoiding a layout flash.

**88. Q: Can `Dimensions` be used outside of a React component (e.g., in a utility file)?**
A: Yes, `Dimensions.get('window')` is a plain static call usable anywhere, unlike hooks which are constrained to component/hook call rules.

**89. Q: What's a caveat of hardcoding pixel values from `Dimensions.get()` at module load time?**
A: The value is captured once at import time and won't update on rotation or window resize, silently causing stale layout — a classic RN interview gotcha.

**90. Q: How does `useWindowDimensions` help with orientation-specific styling?**
A: You can compare `width` vs `height` (or check both) to derive `isLandscape`, and conditionally swap `flexDirection` or layout structure accordingly, with automatic re-renders on rotation.

## Section F — PixelRatio & Responsive Design (15)

**91. Q: What is `PixelRatio` used for?**
A: A utility for converting between React Native's density-independent pixels (dp) and actual physical device pixels, useful for pixel-perfect rendering like hairlines and crisp images.

**92. Q: What does `PixelRatio.get()` return?**
A: The device's pixel density ratio (e.g., 2 for `@2x` devices, 3 for `@3x` devices), similar to `window.devicePixelRatio` on the web.

**93. Q: Why does pixel density matter for borders?**
A: A `borderWidth: 1` in dp might render as 2 or 3 physical pixels on high-density screens, looking thicker than intended — `StyleSheet.hairlineWidth` compensates by using the thinnest renderable line.

**94. Q: What's `PixelRatio.getFontScale()`?**
A: Returns the font scaling factor based on the user's OS accessibility text-size settings, useful for calculations that need to account for enlarged text.

**95. Q: What's `PixelRatio.roundToNearestPixel()` for?**
A: Rounds a dp value to the nearest value that maps cleanly to a whole physical pixel on the current device, avoiding blurry sub-pixel rendering of borders/lines.

**96. Q: How does `PixelRatio` relate to `@2x`/`@3x` image assets?**
A: RN uses the device's pixel ratio to automatically select the appropriately suffixed local image asset, ensuring images look sharp without unnecessary over-fetching on lower-density devices.

**97. Q: What's the difference between dp (density-independent pixels) and physical pixels?**
A: Dp is a logical unit that RN layout uses consistently regardless of screen density; physical pixels are the actual hardware pixels, and the ratio between them varies per device.

**98. Q: How would you create a "true 1px" border using `PixelRatio`?**
A: `borderWidth: 1 / PixelRatio.get()`, which converts one physical pixel back into the equivalent dp value for the current device — though `StyleSheet.hairlineWidth` is the simpler built-in solution.

**99. Q: What's a responsive font-scaling technique using `PixelRatio` or `Dimensions`?**
A: Scaling font size relative to screen width (e.g., `fontSize: width * 0.05`) or using a normalization function that adjusts a base size against a reference device width.

**100. Q: What's the risk of over-relying on pixel-based responsive scaling formulas?**
A: It can produce inconsistent or extreme sizes on very small or very large/tablet screens if not clamped with min/max bounds, so most teams cap scaled values within a sensible range.

**101. Q: How does `aspectRatio` style help with responsive images/containers?**
A: It lets you specify a width-to-height ratio (e.g., `aspectRatio: 16/9`) so RN computes one dimension automatically from the other, avoiding manual pixel math for responsive media.

**102. Q: Can `aspectRatio` be combined with `width: '100%'`?**
A: Yes — a very common pattern: full-width container with `aspectRatio` set computes a proportional height automatically as the width changes across devices.

**103. Q: What library is commonly used for scaling designs across device sizes (interview-relevant mention)?**
A: Libraries like `react-native-size-matters` (`scale`, `verticalScale`, `moderateScale`) or custom scaling utilities based on a reference design width/height from Figma.

**104. Q: Why is percentage-based sizing sometimes insufficient for responsiveness?**
A: Because percentages only relate to the immediate parent, not the overall screen, so deeply nested percentage chains can produce unpredictable absolute sizes across devices.

**105. Q: How do you handle safe, responsive spacing (margins/paddings) across device sizes?**
A: Common approaches include a spacing scale (e.g., 4/8/16/24 multiples) applied consistently, or scaling functions tied to `useWindowDimensions`, rather than ad hoc fixed values everywhere.

## Section G — Platform-Specific Styling (10)

**106. Q: What's `Platform.OS` used for?**
A: A string constant (`'ios'` or `'android'`) letting you branch logic/styles conditionally per platform.

**107. Q: What's `Platform.select()`?**
A: A utility that picks a value from an object keyed by platform (`ios`, `android`, `default`), cleanly consolidating platform-specific style/logic branches.

**108. Q: How would you apply a different shadow implementation per platform?**
A: Using `Platform.select({ ios: { shadowColor, shadowOffset, shadowOpacity, shadowRadius }, android: { elevation } })`, since shadows are implemented differently natively on each OS.

**109. Q: What are platform-specific file extensions used for?**
A: Files named `Component.ios.js` and `Component.android.js` let the bundler automatically pick the right implementation per platform without explicit `Platform.OS` checks in code.

**110. Q: When would you use platform-specific files vs `Platform.select`?**
A: Platform-specific files suit large behavioral/structural differences (different component trees entirely); `Platform.select` suits small, inline style/config differences within otherwise shared code.

**111. Q: What's `Platform.Version`?**
A: Returns the OS version number (e.g., Android API level, iOS version string), useful for conditionally applying fixes/features only needed on certain OS versions.

**112. Q: Why might font rendering differ between iOS and Android even with identical `fontSize`?**
A: Different default system fonts (San Francisco vs Roboto) have different metrics/line-heights, so identical numeric values can look visually different in size/spacing across platforms.

**113. Q: How do you handle platform differences in default `TextInput` underline styling on Android?**
A: Set `underlineColorAndroid: 'transparent'` (older RN) or ensure appropriate `borderBottomWidth`/`borderBottomColor` styling is applied consistently rather than relying on Android's default underline.

**114. Q: What's a common interview question about `elevation` vs `shadow*` props?**
A: Explaining that Android uses a single `elevation` numeric prop (leveraging Material Design's layered shadow system) while iOS requires separate `shadowColor`/`shadowOffset`/`shadowOpacity`/`shadowRadius` props — they are not interchangeable and must both be set for cross-platform parity.

**115. Q: Does `Platform.select` support more than two platforms (e.g., web, macOS)?**
A: Yes — with `react-native-web` or out-of-tree platforms like `react-native-macos`, `Platform.select` can include keys like `web`, `macos`, `windows` alongside `ios`/`android`/`default`.

## Section H — Shadows / Borders / Elevation (10)

**116. Q: What are the four iOS shadow style props?**
A: `shadowColor`, `shadowOffset` (`{ width, height }`), `shadowOpacity`, and `shadowRadius`.

**117. Q: Why doesn't `shadowOpacity` alone show a shadow on iOS?**
A: Because all four shadow props typically need to be set together (color, offset, opacity, radius) for a visible, correctly styled shadow — omitting any one often makes it invisible or malformed.

**118. Q: What does `elevation` do on Android?**
A: Applies Material Design's elevation shadow system, where higher numeric values create a larger, more diffuse drop shadow beneath the component, also implicitly affecting stacking order.

**119. Q: Can you customize shadow color on Android via `elevation`?**
A: Historically no (elevation used a fixed system shadow color), though newer RN versions support `shadowColor` alongside `elevation` on Android for more control.

**120. Q: What's the simplest border syntax for a full box border?**
A: `borderWidth` + `borderColor` (with optional `borderRadius` for rounded corners), applied like standard CSS border shorthand concepts but as separate RN style props.

**121. Q: How do you create a border on only one side (e.g., bottom divider)?**
A: Use directional props like `borderBottomWidth` and `borderBottomColor` instead of the shorthand `borderWidth`/`borderColor`.

**122. Q: Why might a `borderRadius` not visually clip a child `Image` inside a `View`?**
A: Because `overflow: 'hidden'` must also be set on the parent `View`; `borderRadius` alone rounds the border but doesn't automatically clip children's content bounds.

**123. Q: What's a cross-platform library often used to simplify shadow styling?**
A: Libraries like `react-native-shadow-2` or custom `Platform.select` shadow utility functions that abstract the iOS/Android differences into a single reusable style prop.

**124. Q: Can shadows be applied to `Text` directly?**
A: Yes, via `textShadowColor`, `textShadowOffset`, and `textShadowRadius`, distinct from the `shadow*` box-shadow props used on `View`/`Image`.

**125. Q: Why can shadows hurt performance if overused in long lists?**
A: Shadow rendering (especially iOS's layer-based shadow rasterization) can be computationally expensive per view, so applying complex shadows to many list items can cause scroll jank.

## Section I — Safe Area & Notches in Styling Context (10)

**126. Q: How do safe area insets interact with custom headers?**
A: Custom header components typically add `paddingTop: insets.top` (from `useSafeAreaInsets`) to avoid rendering under the status bar/notch, since a plain `View` has no automatic awareness.

**127. Q: What's the risk of hardcoding a fixed status bar height value (e.g., `paddingTop: 20`)?**
A: It breaks across devices with different notch/inset sizes (e.g., iPhone with Dynamic Island vs an older device), producing inconsistent spacing — dynamic insets should be used instead.

**128. Q: How do bottom tab bars typically handle the home indicator safe area on iOS?**
A: By adding `paddingBottom: insets.bottom` so tab bar content isn't obscured by or too close to the home indicator gesture area.

**129. Q: Does `SafeAreaProvider` need to wrap the whole app?**
A: Yes — `react-native-safe-area-context`'s `SafeAreaProvider` must wrap the app root so that `useSafeAreaInsets`/`SafeAreaView` throughout the tree can access correct inset values.

**130. Q: How do insets change with landscape orientation on notched devices?**
A: The notch may shift to the left or right safe-area edge instead of the top, so `insets.left`/`insets.right` become relevant in addition to `insets.top` for landscape layouts.

**131. Q: What's a common bug when using `SafeAreaView` inside a nested component instead of at the screen root?**
A: Applying it at the wrong level can cause double-padding (if nested inside another `SafeAreaView`) or insufficient padding (if applied too deep, missing the true screen edges).

**132. Q: How do modals interact with safe areas?**
A: Full-screen modals need their own safe-area handling since they render in a separate native layer outside the normal screen's `SafeAreaView` context.

**133. Q: What's the edges prop on `SafeAreaView` (from `react-native-safe-area-context`) for?**
A: It lets you specify which edges (`'top'`, `'bottom'`, `'left'`, `'right'`) should receive safe-area padding, useful when you only want inset padding on specific sides.

**134. Q: How would you keep a floating action button above the home indicator?**
A: Add `bottom: insets.bottom + baseOffset` to its absolute positioning style, combining safe-area insets with your own desired spacing.

**135. Q: Why is testing on a real notched device (or accurate simulator) important for safe-area styling?**
A: Because inset values and notch shapes vary significantly across devices, and incorrect assumptions can cause content clipping or excessive empty space that's easy to miss without device-accurate testing.

## Section J — Units, Percentages, Aspect Ratio, Responsive Patterns (15)

**136. Q: What unit system does RN use for most style values?**
A: Unitless numbers representing density-independent pixels (dp/dip) — you don't write `px`, `em`, or `rem` as in CSS.

**137. Q: Does RN support percentage strings for width/height?**
A: Yes, e.g., `width: '50%'`, resolved relative to the parent container's corresponding dimension.

**138. Q: Can percentages be used for `margin`/`padding`?**
A: Support is more limited/inconsistent historically compared to `width`/`height`; explicit numeric values are generally more reliable for spacing.

**139. Q: What's the difference between `aspectRatio` and manually computing height from width?**
A: `aspectRatio` lets the native layout engine compute the missing dimension automatically and responsively, whereas manual computation requires JS logic (e.g., in `onLayout`) and doesn't update as fluidly with dynamic container resizing.

**140. Q: How do you build a responsive card grid that adapts to tablet vs phone?**
A: Combine `useWindowDimensions` to compute a dynamic `numColumns` for `FlatList`, or conditionally set flex-basis/width percentages based on breakpoint logic.

**141. Q: What's `onLayout` used for in responsive design?**
A: A callback fired after a component's layout is calculated, providing its actual rendered `x`, `y`, `width`, `height` — useful when you need real (not just requested) dimensions for further calculations.

**142. Q: Why might `onLayout` fire multiple times?**
A: It fires whenever the component's layout changes (e.g., due to content changes, orientation changes, or parent resizing), not just once on mount.

**143. Q: What's a "responsive typography scale" pattern in RN?**
A: Defining a small set of named font sizes (e.g., `xs`, `sm`, `md`, `lg`, `xl`) possibly scaled by screen width/`PixelRatio.getFontScale()`, ensuring consistent, accessible text sizing across the app.

**144. Q: How do you avoid layout shift when an image is still loading?**
A: Reserve space ahead of time using a fixed `aspectRatio` or known `width`/`height` so the surrounding layout doesn't jump once the image finishes loading.

**145. Q: What's the tradeoff between fixed breakpoints and continuous scaling functions for responsiveness?**
A: Fixed breakpoints (phone/tablet) are simpler to reason about and design for but can feel stepped/abrupt; continuous scaling functions feel smoother across sizes but are harder to visually predict/test for every value.

**146. Q: How do orientation changes typically get handled in styling logic?**
A: By deriving `isLandscape` from `useWindowDimensions` (comparing `width` vs `height`) and conditionally swapping `flexDirection` or dimension-dependent values in response.

**147. Q: What's a common technique for consistent spacing systems across an app?**
A: A shared spacing scale/theme object (e.g., `{ xs: 4, sm: 8, md: 16, lg: 24, xl: 32 }`) referenced throughout `StyleSheet.create` calls instead of arbitrary magic numbers.

**148. Q: Why is `minWidth`/`maxWidth` useful in responsive RN layouts?**
A: They constrain a flexible or percentage-based element so it doesn't become too small on tiny screens or too large/stretched on tablets, similar to their CSS counterparts.

**149. Q: How would you explain RN's overall responsive design philosophy to an interviewer?**
A: There's no built-in media-query system; responsiveness is achieved by combining Flexbox's relative sizing, `useWindowDimensions`/`PixelRatio` for JS-driven breakpoints, and consistent spacing/typography scales, all computed and re-rendered reactively rather than declared statically in CSS.

**150. Q: What's a strong closing interview answer summarizing RN styling vs web CSS?**
A: RN styling is CSS-inspired but intentionally reduced — no cascade/inheritance beyond `Text`, only Flexbox (no Grid/floats), unitless dp values instead of multiple CSS units, and JS-driven responsiveness instead of media queries — trading some familiar web ergonomics for a smaller, more predictable, cross-platform-consistent styling surface.
