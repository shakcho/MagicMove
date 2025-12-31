/**
 * @fileoverview MagicMove - React View Transitions Library
 *
 * A lightweight React library that brings Apple Keynote's famous
 * "Magic Move" transitions to the web using the native View Transitions API.
 *
 * @packageDocumentation
 *
 * @example
 * ```tsx
 * // Quick Start
 * import {
 *   MagicMoveProvider,
 *   MagicMove,
 *   useMagicMove
 * } from 'magicmove';
 *
 * function App() {
 *   return (
 *     <MagicMoveProvider>
 *       <MyAnimatedComponent />
 *     </MagicMoveProvider>
 *   );
 * }
 *
 * function MyAnimatedComponent() {
 *   const { trigger } = useMagicMove();
 *   const [expanded, setExpanded] = useState(false);
 *
 *   return (
 *     <MagicMove id="my-element" className={expanded ? 'large' : 'small'}>
 *       <button onClick={() => trigger(() => setExpanded(!expanded))}>
 *         Toggle Size
 *       </button>
 *     </MagicMove>
 *   );
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API View Transitions API}
 */

// =============================================================================
// Core Components
// =============================================================================

export {
  MagicMoveProvider,
  useMagicMoveContext,
  type MagicMoveProviderProps,
} from "./MagicMoveContext";

export { MagicMove, type MagicMoveProps } from "./MagicMove";

export { MagicMoveImage, type MagicMoveImageProps } from "./MagicMoveImage";

export { MagicMoveList, type MagicMoveListProps } from "./MagicMoveList";

// =============================================================================
// Hooks
// =============================================================================

export { useMagicMove, triggerMagicMove, type UseMagicMoveOptions } from "./useMagicMove";

// =============================================================================
// Types
// =============================================================================

export type { CSSProperties } from "react";
