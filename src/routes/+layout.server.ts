/**
 * Root Layout Server Load Function
 * 
 * Passes geo data and language from server-side detection to the client.
 * This data is injected by hooks.server.ts and made available to all pages.
 * 
 * @module routes/+layout.server
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import type { LayoutServerLoad } from './$types';
import { siteConfig } from '$lib/utils/seo';

export const load: LayoutServerLoad = async ({ locals, request }) => {
  // Get geo data from locals (injected by hooks.server.ts)
  const geo = locals.geo;
  const lang = locals.lang;
  
  // Get URL for generating alternate language links
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  return {
    // Geo data for stores
    geo,
    lang,
    
    // SEO metadata
    alternateLanguages: generateAlternateLanguages(pathname),
  };
};

/**
 * Generate alternate language URLs for SEO
 */
function generateAlternateLanguages(pathname: string): Array<{ code: string; url: string }> {
  const languages = ['en', 'es', 'fr']; // Enabled languages
  
  // Remove existing language prefix if present
  const cleanPath = pathname.replace(/^\/(es|fr)/, '') || '/';
  
  return languages.map(code => ({
    code,
    url: code === 'en' 
      ? `${siteConfig.url}${cleanPath}`
      : `${siteConfig.url}/${code}${cleanPath}`,
  }));
}
