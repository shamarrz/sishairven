/**
 * Language Parameter Matcher
 * 
 * Validates that a URL parameter is a supported language code.
 * Used by SvelteKit's advanced routing to match language prefixes.
 * 
 * Example: /es/blog matches lang=es, /fr/shop matches lang=fr
 * 
 * @module params/lang
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import { isLanguageEnabled } from '$lib/types/geo';

/**
 * Match function for language parameters
 * Returns true if the parameter is an enabled language code
 * 
 * @param param - The URL parameter to check
 * @returns boolean indicating if this is a valid language code
 */
export const match = (param: string): boolean => {
  return isLanguageEnabled(param);
};
