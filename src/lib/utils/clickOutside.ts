/**
 * Click Outside Action
 * 
 * Svelte action that triggers a callback when user clicks outside an element.
 * Used for dropdowns, modals, and other overlay components.
 * 
 * @module lib/utils/clickOutside
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

/**
 * Svelte action for detecting clicks outside an element
 * 
 * Usage:
 * ```svelte
 * <div use:clickOutside={() => isOpen = false}>
 *   Dropdown content
 * </div>
 * ```
 * 
 * @param node - The element to watch
 * @param callback - Function to call when click occurs outside
 */
export function clickOutside(node: HTMLElement, callback: () => void) {
  const handleClick = (event: MouseEvent) => {
    if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
      callback();
    }
  };

  // Use capture phase to catch clicks before they reach other handlers
  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
}
