/**
 * @fileoverview MagicMove Context and Provider
 *
 * This module provides the React Context and Provider for managing
 * View Transitions API-based animations across the application.
 *
 * The provider injects necessary CSS for animations and provides
 * a centralized way to trigger transitions with proper React integration.
 *
 * @example
 * ```tsx
 * // Wrap your app with the provider
 * function App() {
 *   return (
 *     <MagicMoveProvider duration={300} easing="ease-out">
 *       <MyComponent />
 *     </MagicMoveProvider>
 *   );
 * }
 * ```
 */

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { flushSync } from "react-dom";

/**
 * Shape of the MagicMove context value.
 * Provides methods for triggering transitions and tracking animation state.
 */
interface MagicMoveContextValue {
  /**
   * Triggers a view transition with the provided state update callback.
   * The callback should contain React state updates that will be animated.
   */
  startTransition: (callback: () => void) => void;

  /**
   * Whether a transition is currently in progress.
   * Useful for disabling interactions during animations.
   */
  isTransitioning: boolean;

  /**
   * Registers an element for potential animation tracking.
   * Called automatically by MagicMove components.
   */
  registerElement: (id: string, element: HTMLElement | null) => void;

  /**
   * Unregisters an element from animation tracking.
   * Called automatically when MagicMove components unmount.
   */
  unregisterElement: (id: string) => void;
}

// Create the context with null as initial value
// This allows us to detect if components are used outside of the provider
const MagicMoveContext = createContext<MagicMoveContextValue | null>(null);

/**
 * Props for the MagicMoveProvider component.
 */
export interface MagicMoveProviderProps {
  /** Child components that will have access to MagicMove functionality */
  children: ReactNode;

  /**
   * Duration of animations in milliseconds.
   * @default 300
   */
  duration?: number;

  /**
   * CSS easing function for animations.
   * @default 'cubic-bezier(0.4, 0, 0.2, 1)'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function
   */
  easing?: string;
}

/**
 * MagicMoveProvider - Root provider for MagicMove animations.
 *
 * This provider must wrap any components that use MagicMove functionality.
 * It manages the View Transitions API integration and injects necessary CSS.
 *
 * @param props - Provider configuration options
 * @returns Provider component wrapping children
 *
 * @example
 * ```tsx
 * <MagicMoveProvider duration={400} easing="ease-in-out">
 *   <App />
 * </MagicMoveProvider>
 * ```
 *
 * @remarks
 * - Only one MagicMoveProvider should be used per application
 * - The provider automatically handles browser compatibility
 * - If View Transitions API is not supported, animations gracefully degrade
 */
export function MagicMoveProvider({
  children,
  duration = 300,
  easing = "cubic-bezier(0.4, 0, 0.2, 1)",
}: MagicMoveProviderProps) {
  // Track whether a transition is currently in progress
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Registry of elements that can participate in view transitions
  // Using a Map for O(1) lookups and modifications
  const [elements] = useState(() => new Map<string, HTMLElement>());

  /**
   * Registers an element with its view transition name.
   * Called by MagicMove components when they mount.
   */
  const registerElement = useCallback(
    (id: string, element: HTMLElement | null) => {
      if (element) {
        elements.set(id, element);
      } else {
        elements.delete(id);
      }
    },
    [elements]
  );

  /**
   * Removes an element from the registry.
   * Called when MagicMove components unmount.
   */
  const unregisterElement = useCallback(
    (id: string) => {
      elements.delete(id);
    },
    [elements]
  );

  /**
   * Triggers a view transition with the provided callback.
   *
   * This is the core function that enables Magic Move animations.
   * It wraps React state updates in the View Transitions API.
   *
   * @param callback - Function containing state updates to animate
   *
   * @remarks
   * - Uses flushSync to ensure React updates the DOM synchronously
   * - This is required because View Transitions API needs the DOM
   *   to be updated before it captures the new state
   * - Falls back to immediate execution if View Transitions API is unavailable
   */
  const startTransition = useCallback((callback: () => void) => {
    // Check for View Transitions API support
    // Falls back to immediate execution for unsupported browsers
    if (!document.startViewTransition) {
      callback();
      return;
    }

    setIsTransitioning(true);

    // Start the view transition
    // The API captures the "before" state, runs the callback,
    // captures the "after" state, then animates between them
    const transition = document.startViewTransition(() => {
      // flushSync forces React to update the DOM synchronously
      // This ensures the View Transitions API captures the correct state
      flushSync(() => {
        callback();
      });
    });

    // Reset transitioning state when animation completes
    transition.finished.finally(() => {
      setIsTransitioning(false);
    });
  }, []);

  /**
   * Inject CSS for view transition animations.
   *
   * This effect adds a <style> element to the document head
   * that configures the duration and easing of view transitions.
   */
  useEffect(() => {
    const styleId = "magic-move-styles";

    // Don't add duplicate styles
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;

    // Configure view transition pseudo-elements
    // ::view-transition-old(*) - The "before" snapshot
    // ::view-transition-new(*) - The "after" snapshot
    // ::view-transition-group(*) - The container that morphs between states
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
    document.head.appendChild(style);

    // Cleanup: remove styles when provider unmounts
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [duration, easing]);

  return (
    <MagicMoveContext.Provider
      value={{
        startTransition,
        isTransitioning,
        registerElement,
        unregisterElement,
      }}
    >
      {children}
    </MagicMoveContext.Provider>
  );
}

/**
 * Hook to access the MagicMove context.
 *
 * This is a low-level hook that provides direct access to the context.
 * Most users should prefer the `useMagicMove` hook instead.
 *
 * @returns The MagicMove context value
 * @throws Error if used outside of a MagicMoveProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { startTransition, isTransitioning } = useMagicMoveContext();
 *   // ...
 * }
 * ```
 */
export function useMagicMoveContext() {
  const context = useContext(MagicMoveContext);
  if (!context) {
    throw new Error("useMagicMoveContext must be used within a MagicMoveProvider");
  }
  return context;
}
