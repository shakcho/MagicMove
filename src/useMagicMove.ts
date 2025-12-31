/**
 * @fileoverview MagicMove Hooks
 *
 * React hooks for triggering View Transitions programmatically.
 * Provides an easy-to-use API for animating state changes.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { trigger, isAnimating } = useMagicMove();
 *   const [view, setView] = useState('list');
 *
 *   return (
 *     <button
 *       onClick={() => trigger(() => setView('grid'))}
 *       disabled={isAnimating}
 *     >
 *       Switch to Grid
 *     </button>
 *   );
 * }
 * ```
 */

import { useCallback } from "react";
import { flushSync } from "react-dom";
import { useMagicMoveContext } from "./MagicMoveContext";

/**
 * Options for the useMagicMove hook.
 * Currently reserved for future configuration options.
 */
export interface UseMagicMoveOptions {
  /**
   * Animation duration in milliseconds.
   * @deprecated Use MagicMoveProvider's duration prop instead
   */
  duration?: number;

  /**
   * CSS easing function.
   * @deprecated Use MagicMoveProvider's easing prop instead
   */
  easing?: string;
}

/**
 * useMagicMove - Hook for triggering View Transitions.
 *
 * The primary hook for animating state changes in your React components.
 * Returns a `trigger` function that wraps state updates in a View Transition.
 *
 * @param options - Configuration options (reserved for future use)
 * @returns Object with trigger function and animation state
 *
 * @example
 * ```tsx
 * // Basic toggle animation
 * function ExpandableCard() {
 *   const { trigger } = useMagicMove();
 *   const [expanded, setExpanded] = useState(false);
 *
 *   return (
 *     <MagicMove id="card" className={expanded ? 'large' : 'small'}>
 *       <button onClick={() => trigger(() => setExpanded(!expanded))}>
 *         {expanded ? 'Collapse' : 'Expand'}
 *       </button>
 *     </MagicMove>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Multiple state changes in one animation
 * function Dashboard() {
 *   const { trigger, isAnimating } = useMagicMove();
 *   const [layout, setLayout] = useState('default');
 *   const [sidebarOpen, setSidebarOpen] = useState(true);
 *
 *   const toggleCompactMode = () => {
 *     trigger(() => {
 *       setLayout('compact');
 *       setSidebarOpen(false);
 *     });
 *   };
 *
 *   return (
 *     <button onClick={toggleCompactMode} disabled={isAnimating}>
 *       Compact Mode
 *     </button>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Preventing interaction during animation
 * function Navigation() {
 *   const { trigger, isAnimating } = useMagicMove();
 *
 *   return (
 *     <nav style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}>
 *       <NavItems />
 *     </nav>
 *   );
 * }
 * ```
 *
 * @remarks
 * - Must be used within a MagicMoveProvider
 * - The trigger function automatically handles View Transitions API
 * - Multiple state updates in one trigger call are batched
 * - Falls back to immediate updates if View Transitions is unsupported
 */
export function useMagicMove(_options?: UseMagicMoveOptions) {
  // Get transition functions from context
  const { startTransition, isTransitioning } = useMagicMoveContext();

  /**
   * Trigger a View Transition with the provided state updates.
   *
   * @param callback - Function containing React state updates
   *
   * @example
   * trigger(() => setState(newValue));
   * trigger(() => {
   *   setA(valueA);
   *   setB(valueB);
   * });
   */
  const trigger = useCallback(
    (callback: () => void) => {
      startTransition(callback);
    },
    [startTransition]
  );

  return {
    /**
     * Function to trigger a View Transition.
     * Pass any state updates as a callback.
     */
    trigger,

    /**
     * Whether a transition is currently in progress.
     * Use to disable UI or show loading states.
     */
    isAnimating: isTransitioning,
  };
}

/**
 * triggerMagicMove - Standalone function for View Transitions.
 *
 * A utility function that triggers View Transitions without requiring
 * the MagicMoveProvider. Useful for one-off transitions or when you
 * need more control over the transition lifecycle.
 *
 * @param callback - Function containing DOM or state updates
 * @param options - Optional configuration for duration and easing
 *
 * @example
 * ```tsx
 * // One-off page transition
 * import { triggerMagicMove } from 'magicmove';
 *
 * function handleNavigation(newRoute: string) {
 *   triggerMagicMove(
 *     () => router.push(newRoute),
 *     { duration: 400, easing: 'ease-out' }
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Vanilla JS DOM manipulation
 * triggerMagicMove(() => {
 *   document.getElementById('panel').classList.toggle('expanded');
 * });
 * ```
 *
 * @remarks
 * - Works without MagicMoveProvider
 * - Injects temporary styles for the transition
 * - Uses flushSync for React state updates
 * - Falls back to immediate execution if unsupported
 */
export function triggerMagicMove(
  callback: () => void,
  options?: {
    /**
     * Animation duration in milliseconds.
     * @default 300
     */
    duration?: number;

    /**
     * CSS easing function for the animation.
     * @default 'cubic-bezier(0.4, 0, 0.2, 1)'
     */
    easing?: string;
  }
): void {
  // Check for View Transitions API support
  if (!document.startViewTransition) {
    callback();
    return;
  }

  const { duration = 300, easing = "cubic-bezier(0.4, 0, 0.2, 1)" } = options || {};

  // Inject temporary styles for this transition
  // These override any existing MagicMove styles for this specific transition
  const styleId = "magic-move-temp-styles";
  let style = document.getElementById(styleId) as HTMLStyleElement | null;

  if (!style) {
    style = document.createElement("style");
    style.id = styleId;
    document.head.appendChild(style);
  }

  // Configure the view transition animation timing
  style.textContent = `
    ::view-transition-old(*),
    ::view-transition-new(*) {
      animation-duration: ${duration}ms;
      animation-timing-function: ${easing};
    }

    ::view-transition-group(*) {
      animation-duration: ${duration}ms;
      animation-timing-function: ${easing};
    }
  `;

  // Start the view transition
  // flushSync ensures React updates are applied synchronously
  document.startViewTransition(() => {
    flushSync(() => {
      callback();
    });
  });
}
