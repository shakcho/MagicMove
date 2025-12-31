/**
 * @fileoverview MagicMoveList Component
 *
 * Component for animating list reordering, additions, and removals.
 * Each item in the list automatically gets a unique view transition name,
 * enabling smooth animations when the list order changes.
 *
 * @example
 * ```tsx
 * // Animated sortable list
 * <MagicMoveList
 *   items={sortedItems}
 *   getKey={(item) => item.id}
 *   renderItem={(item) => <ListItem item={item} />}
 * />
 * ```
 */

import { type ReactNode, type CSSProperties, type ElementType } from "react";

/**
 * Props for the MagicMoveList component.
 * Generic type T represents the shape of list items.
 */
export interface MagicMoveListProps<T> {
  /**
   * Array of items to render.
   * When this array changes order, items animate to new positions.
   *
   * @required
   */
  items: T[];

  /**
   * Function to get a unique key for each item.
   * Must return a stable, unique string identifier.
   *
   * @required
   * @param item - The list item
   * @returns Unique string key for the item
   *
   * @example
   * ```tsx
   * getKey={(item) => item.id}
   * getKey={(item) => `${item.type}-${item.id}`}
   * ```
   */
  getKey: (item: T) => string;

  /**
   * Render function for each item.
   * Called for every item in the list.
   *
   * @required
   * @param item - The list item to render
   * @param index - The item's current index in the array
   * @returns React node to render for this item
   *
   * @example
   * ```tsx
   * renderItem={(item, index) => (
   *   <div className="p-4">
   *     {index + 1}. {item.name}
   *   </div>
   * )}
   * ```
   */
  renderItem: (item: T, index: number) => ReactNode;

  /**
   * HTML element type for the container.
   *
   * @default 'div'
   * @example 'ul', 'ol', 'section'
   */
  as?: ElementType;

  /**
   * Additional CSS class names for the container.
   */
  className?: string;

  /**
   * Additional inline styles for the container.
   */
  style?: CSSProperties;

  /**
   * Prefix for view transition names.
   * Each item's transition name will be `${prefix}-${key}`.
   *
   * @default 'list-item'
   * @example 'todo', 'card', 'row'
   */
  transitionPrefix?: string;
}

/**
 * MagicMoveList - Animated list component with View Transitions.
 *
 * Renders a list of items where each item can smoothly animate
 * to its new position when the list is reordered. Uses the browser's
 * View Transitions API for native-performance animations.
 *
 * @param props - List configuration and render functions
 * @returns Container element with animated list items
 *
 * @example
 * ```tsx
 * // Shuffle animation
 * function ShuffleList() {
 *   const [items, setItems] = useState(initialItems);
 *   const { trigger } = useMagicMove();
 *
 *   const shuffle = () => {
 *     trigger(() => {
 *       setItems(prev => [...prev].sort(() => Math.random() - 0.5));
 *     });
 *   };
 *
 *   return (
 *     <>
 *       <button onClick={shuffle}>Shuffle</button>
 *       <MagicMoveList
 *         items={items}
 *         getKey={(item) => item.id}
 *         renderItem={(item) => <Card>{item.name}</Card>}
 *         transitionPrefix="shuffle-item"
 *       />
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Todo list with drag-and-drop
 * <MagicMoveList
 *   items={todos}
 *   getKey={(todo) => todo.id}
 *   renderItem={(todo) => (
 *     <TodoItem
 *       todo={todo}
 *       onComplete={() => handleComplete(todo.id)}
 *     />
 *   )}
 *   as="ul"
 *   className="space-y-2"
 *   transitionPrefix="todo"
 * />
 * ```
 *
 * @remarks
 * - Each item must have a unique key from `getKey`
 * - Keys should be stable (don't use array index as key)
 * - Wrap list mutations in `trigger()` from `useMagicMove`
 * - Works with any array operations: sort, filter, reverse, etc.
 */
export function MagicMoveList<T>({
  items,
  getKey,
  renderItem,
  as: Component = "div",
  className,
  style,
  transitionPrefix = "list-item",
}: MagicMoveListProps<T>) {
  return (
    <Component className={className} style={style}>
      {items.map((item, index) => {
        // Get stable unique key for this item
        const key = getKey(item);

        // Create view transition name by combining prefix with key
        // This ensures each item has a unique, stable transition identity
        const viewTransitionName = `${transitionPrefix}-${key}`;

        return (
          <div key={key} style={{ viewTransitionName }} data-magic-move-id={viewTransitionName}>
            {renderItem(item, index)}
          </div>
        );
      })}
    </Component>
  );
}
