/**
 * @fileoverview MagicMoveImage Component
 *
 * Specialized component for images that participate in View Transitions.
 * Optimized for smooth image animations between different states,
 * positions, and sizes.
 *
 * @example
 * ```tsx
 * // Hero image that animates when navigating
 * <MagicMoveImage
 *   id="hero-photo"
 *   src="/images/hero.jpg"
 *   alt="Hero image"
 *   className="w-full h-64 object-cover"
 * />
 * ```
 */

import { type CSSProperties } from "react";

/**
 * Props for the MagicMoveImage component.
 */
export interface MagicMoveImageProps {
  /**
   * Unique identifier for the image across state changes.
   * Images with the same ID will animate between states.
   *
   * @required
   * @example "hero-image", "product-photo-123"
   */
  id: string;

  /**
   * Image source URL.
   * Can be a relative path, absolute URL, or data URI.
   *
   * @required
   */
  src: string;

  /**
   * Alt text for accessibility.
   * Describes the image content for screen readers.
   *
   * @required
   */
  alt: string;

  /**
   * Additional CSS class names.
   * Use for styling with Tailwind or custom CSS.
   */
  className?: string;

  /**
   * Additional inline styles.
   * The `viewTransitionName` style is automatically added.
   */
  style?: CSSProperties;

  /**
   * Layout ID for shared element transitions.
   * Use when multiple image instances should share the same
   * view transition identity.
   *
   * If not provided, the `id` prop is used.
   */
  layoutId?: string;
}

/**
 * MagicMoveImage - Image component with View Transitions support.
 *
 * A specialized component for images that need to animate smoothly
 * between different positions, sizes, or states. Uses the native
 * View Transitions API for hardware-accelerated animations.
 *
 * @param props - Image props including src, alt, and styling options
 * @returns An img element with view transition capabilities
 *
 * @example
 * ```tsx
 * // Thumbnail that expands to full-size
 * function PhotoGallery({ photo }) {
 *   const [isFullSize, setIsFullSize] = useState(false);
 *   const { trigger } = useMagicMove();
 *
 *   return (
 *     <MagicMoveImage
 *       id={`photo-${photo.id}`}
 *       src={photo.url}
 *       alt={photo.title}
 *       className={isFullSize ? 'w-full h-auto' : 'w-32 h-32'}
 *       onClick={() => trigger(() => setIsFullSize(!isFullSize))}
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // List-to-detail image transition
 * // In list view:
 * <MagicMoveImage id="product-123" src={product.thumb} alt={product.name} />
 *
 * // In detail view (same ID = smooth transition):
 * <MagicMoveImage id="product-123" src={product.fullImage} alt={product.name} />
 * ```
 *
 * @remarks
 * - Uses the same ID across different views for smooth transitions
 * - Automatically handles aspect ratio changes during animation
 * - For complex layouts, consider wrapping with MagicMove instead
 */
export function MagicMoveImage({ id, src, alt, className, style, layoutId }: MagicMoveImageProps) {
  // Use layoutId if provided, otherwise fall back to id
  const viewTransitionName = layoutId || id;

  // Combine user styles with the view transition name
  const combinedStyle: CSSProperties = {
    ...style,
    viewTransitionName: viewTransitionName,
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={combinedStyle}
      data-magic-move-id={viewTransitionName}
    />
  );
}
