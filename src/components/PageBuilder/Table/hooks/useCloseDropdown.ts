/*
 * useCloseDropdown.ts
 * Author: evan kirkiles
 * Created On Tue Sep 05 2023
 * 2023 Design at Yale
 *
 * https://github.com/algolia/doc-code-samples/blob/master/react-instantsearch/facet-dropdown/src/hooks/useCloseDropdown.ts
 */

import { RefObject, useEffect } from 'react';

export function useCloseDropdown<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handleMouseDown = (event: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        handler();
      }
    };

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handler();
      }
    }

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref, handler, enabled]);
}
