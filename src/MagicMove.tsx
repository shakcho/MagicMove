/**
 * @fileoverview MagicMove Component
 *
 * The core component for enabling View Transitions on any element.
 * Wrap any content with MagicMove to enable smooth animations
 * when the element's position, size, or content changes.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <MagicMove id="hero-title">
 *   <h1>Hello World</h1>
 * </MagicMove>
 *
 * // With dynamic sizing
 * <MagicMove
 *   id="card"
 *   className={isExpanded ? 'large' : 'small'}
 * >
 *   <CardContent />
 * </MagicMove>
 * ```
 */

import {
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
} from "react";
import { useMagicMoveContext } from "./MagicMoveContext";

/**
 * Props for the MagicMove component.
 * Extends standard HTML attributes for full flexibility.
 */
export interface MagicMoveProps extends Omit<HTMLAttributes<HTMLElement>, "id"> {
  /**
   * Unique identifier for the element across state changes.
   * Elements with the same ID will animate between states.
   *
   * @required
   * @example "hero-image", "card-123", "sidebar"
   */
  id: string;

  /**
   * Content to render inside the MagicMove container.
   * Can be any valid React node.
   */
  children?: ReactNode;

  /**
   * HTML element type to render.
   * Useful for semantic HTML or specific element requirements.
   *
   * @default 'div'
   * @example 'section', 'article', 'span', 'button'
   */
  as?: ElementType;

  /**
   * Additional inline styles to apply.
   * The `viewTransitionName` style is automatically added.
   */
  style?: CSSProperties;

  /**
   * Layout ID for shared element transitions.
   * Use this when you want multiple elements to share the same
   * view transition identity (e.g., list items that can expand).
   *
   * If not provided, the `id` prop is used as the view transition name.
   *
   * @example "shared-hero-image"
   */
  layoutId?: string;
}

/**
 * MagicMove - Core component for View Transitions.
 *
 * Wraps any content and enables smooth animations when the element's
 * position, size, or appearance changes. Uses the browser's native
 * View Transitions API for hardware-accelerated animations.
 *
 * @param props - Component props including id, children, and styling options
 * @returns A wrapper element with view transition capabilities
 *
 * @example
 * ```tsx
 * // Animate layout changes
 * function ExpandableCard() {
 *   const [expanded, setExpanded] = useState(false);
 *   const { trigger } = useMagicMove();
 *
 *   return (
 *     <MagicMove
 *       id="my-card"
 *       className={expanded ? 'w-full h-96' : 'w-48 h-32'}
 *       onClick={() => trigger(() => setExpanded(!expanded))}
 *     >
 *       <CardContent />
 *     </MagicMove>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Shared element transitions (e.g., list to detail)
 * function ListItem({ item }) {
 *   return (
 *     <MagicMove id={`item-${item.id}`} layoutId={`item-${item.id}`}>
 *       <span>{item.title}</span>
 *     </MagicMove>
 *   );
 * }
 * ```
 *
 * @remarks
 * - Each MagicMove element must have a unique `id` prop
 * - The component automatically registers with MagicMoveProvider
 * - Works seamlessly with CSS transitions and Tailwind classes
 * - For images, consider using MagicMoveImage for better performance
 */
export function MagicMove({
  id,
  children,
  as: Component = "div",
  className,
  style,
  layoutId,
  ...rest
}: MagicMoveProps) {
  // Ref to the DOM element for registration
  const ref = useRef<HTMLElement>(null);

  // Get registration functions from context
  const { registerElement, unregisterElement } = useMagicMoveContext();

  // Use layoutId if provided, otherwise fall back to id
  // This allows multiple elements to share a view transition identity
  const viewTransitionName = layoutId || id;

  /**
   * Register the element with the MagicMove context on mount.
   * Unregister on unmount or when the transition name changes.
   */
  useEffect(() => {
    const element = ref.current;
    if (element) {
      registerElement(viewTransitionName, element);
    }
    return () => {
      unregisterElement(viewTransitionName);
    };
  }, [viewTransitionName, registerElement, unregisterElement]);

  // Combine user styles with the view transition name
  // The viewTransitionName CSS property is what enables the animation
  const combinedStyle: CSSProperties = {
    ...style,
    viewTransitionName: viewTransitionName,
  };

  return (
    <Component
      ref={ref}
      className={className}
      style={combinedStyle}
      data-magic-move-id={viewTransitionName}
      {...rest}
    >
      {children}
    </Component>
  );
}
