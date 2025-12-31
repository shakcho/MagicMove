# MagicMove

A lightweight React library that brings Apple Keynote's famous **Magic Move** transitions to the web using the native [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API).

## Features

- 🪄 **Automatic animations** - Elements with matching IDs animate smoothly between states
- 📦 **Zero CSS dependencies** - Uses native View Transitions API
- 🎯 **Simple API** - Just wrap your elements with `MagicMove`
- 🚀 **Native performance** - Hardware-accelerated animations
- 🔧 **TypeScript ready** - Full type definitions included
- ⚡ **Tiny bundle** - Minimal footprint

## Installation

```bash
npm install magicmove
# or
yarn add magicmove
# or
pnpm add magicmove
```

## Quick Start

```tsx
import { MagicMoveProvider, MagicMove, useMagicMove } from 'magicmove';

function App() {
  return (
    <MagicMoveProvider>
      <MyComponent />
    </MagicMoveProvider>
  );
}

function MyComponent() {
  const { trigger } = useMagicMove();
  const [expanded, setExpanded] = useState(false);

  return (
    <MagicMove 
      id="my-card" 
      className={expanded ? 'w-full h-96' : 'w-48 h-32'}
    >
      <button onClick={() => trigger(() => setExpanded(!expanded))}>
        {expanded ? 'Collapse' : 'Expand'}
      </button>
    </MagicMove>
  );
}
```

## API Reference

### `<MagicMoveProvider>`

Wrap your app with this provider to enable MagicMove functionality.

```tsx
<MagicMoveProvider 
  duration={300}           // Animation duration in ms (default: 300)
  easing="ease-out"        // CSS easing function (default: cubic-bezier(0.4, 0, 0.2, 1))
>
  <App />
</MagicMoveProvider>
```

### `<MagicMove>`

The core component for enabling view transitions on any element.

```tsx
<MagicMove
  id="unique-id"           // Required: Unique identifier
  as="div"                 // HTML element type (default: 'div')
  layoutId="shared-id"     // Optional: For shared element transitions
  className="..."          // Standard React props supported
  style={{...}}
>
  {children}
</MagicMove>
```

### `<MagicMoveImage>`

Specialized component for images with view transitions.

```tsx
<MagicMoveImage
  id="hero-image"
  src="/image.jpg"
  alt="Description"
  className="w-full h-64 object-cover"
/>
```

### `<MagicMoveList>`

Component for animating list reordering.

```tsx
<MagicMoveList
  items={items}
  getKey={(item) => item.id}
  renderItem={(item) => <ListItem item={item} />}
  transitionPrefix="list-item"    // Optional prefix for transition names
  as="ul"                         // Container element type
/>
```

### `useMagicMove()`

Hook for triggering view transitions.

```tsx
const { trigger, isAnimating } = useMagicMove();

// Wrap state updates to animate them
trigger(() => {
  setState(newValue);
});

// Disable interactions during animation
<button disabled={isAnimating}>Click me</button>
```

### `triggerMagicMove()`

Standalone function for one-off transitions (no provider required).

```tsx
import { triggerMagicMove } from 'magicmove';

triggerMagicMove(
  () => router.push('/new-page'),
  { duration: 400, easing: 'ease-out' }
);
```

## Examples

Check out the `examples/nextjs` folder for live examples:

- **Master-Detail** - List to detail view with shared element transitions
- **Table ↔ Grid** - Toggle between table and grid layouts
- **Card Expand** - Expandable cards with smooth zoom animations
- **Image Gallery** - Photo gallery with lightbox transitions
- **Layout Animation** - Elements animate to new positions
- **List Reordering** - Shuffle and reverse lists with animations
- **Tabs** - Animated tab switching
- **Text Transitions** - Headlines, quotes, and content transitions

### Running Examples

```bash
# From the root directory
cd examples/nextjs
npm install
npm run dev
```

## Browser Support

MagicMove uses the [View Transitions API](https://caniuse.com/view-transitions). Currently supported in:

- Chrome 111+
- Edge 111+
- Opera 97+
- Chrome for Android 111+

For unsupported browsers, animations gracefully degrade - state updates happen immediately without transitions.

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch mode for development
npm run dev
```

## License

MIT
