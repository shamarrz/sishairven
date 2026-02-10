/**
 * SvelteKit Server Hooks
 * 
 * Handles geo-detection, language negotiation, and user context
 * for every incoming request. Injects geo data into event.locals
 * for use in routes and components.
 * 
 * @module hooks.server
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import type { Handle, HandleServerError } from '@sveltejs/kit';
import { detectGeoFromHeaders, defaultGeoData, createGeoCookie, parseGeoCookie } from '$lib/i18n/geo';
import { detectLanguageFromHeader, getDefaultLanguage, isLanguageEnabled } from '$lib/types/geo';

/**
 * Main request handler hook
 * Detects geo location and sets language for each request
 */
export const handle: Handle = async ({ event, resolve }) => {
  // ========================================================================
  // GEO DETECTION
  // ========================================================================
  
  let geo = defaultGeoData;
  
  try {
    // Try to detect from headers (Cloudflare, Vercel, etc.)
    geo = detectGeoFromHeaders(event.request.headers);
  } catch (error) {
    console.error('Geo detection failed:', error);
    // Fall back to default
    geo = defaultGeoData;
  }
  
  // Check for stored geo preference in cookies
  const cookieHeader = event.request.headers.get('cookie');
  if (cookieHeader) {
    const geoCookie = cookieHeader.split(';').find(c => c.trim().startsWith('geo_pref='));
    if (geoCookie) {
      const storedGeo = parseGeoCookie(geoCookie.split('=')[1]);
      if (storedGeo) {
        // Override detected values with stored preferences
        if (storedGeo.country) geo.country = storedGeo.country;
        if (storedGeo.language) geo.language = storedGeo.language;
        if (storedGeo.currency) geo.currency = storedGeo.currency;
      }
    }
  }
  
  // ========================================================================
  // LANGUAGE NEGOTIATION
  // ========================================================================
  
  let lang = getDefaultLanguage(geo.country);
  
  // Check URL for language prefix (e.g., /es/blog)
  const urlLang = event.url.pathname.split('/')[1];
  if (isLanguageEnabled(urlLang)) {
    lang = urlLang;
  } else {
    // Check for language preference cookie
    if (cookieHeader) {
      const langCookie = cookieHeader.split(';').find(c => c.trim().startsWith('lang_pref='));
      if (langCookie) {
        const storedLang = langCookie.split('=')[1];
        if (isLanguageEnabled(storedLang)) {
          lang = storedLang;
        }
      }
    }
    
    // If no stored preference, use Accept-Language header
    if (lang === getDefaultLanguage(geo.country)) {
      const acceptLang = event.request.headers.get('Accept-Language');
      const detectedLang = detectLanguageFromHeader(acceptLang);
      if (isLanguageEnabled(detectedLang)) {
        lang = detectedLang;
      }
    }
  }
  
  // ========================================================================
  // INJECT INTO LOCALS
  // ========================================================================
  
  event.locals.geo = geo;
  event.locals.lang = lang;
  
  // ========================================================================
  // RESPONSE PROCESSING
  // ========================================================================
  
  const response = await resolve(event);
  
  // Set geo preference cookie if not present
  if (!cookieHeader?.includes('geo_pref=')) {
    const geoCookieValue = createGeoCookie(geo);
    response.headers.append('Set-Cookie', geoCookieValue);
  }
  
  // Set language preference cookie
  if (!cookieHeader?.includes('lang_pref=') || urlLang) {
    const langCookie = `lang_pref=${lang}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    response.headers.append('Set-Cookie', langCookie);
  }
  
  // Add geo headers for debugging (remove in production)
  // response.headers.set('X-Detected-Country', geo.country);
  // response.headers.set('X-Detected-Language', lang);
  
  return response;
};

/**
 * Global error handler
 */
export const handleError: HandleServerError = ({ error, event }) => {
  console.error('Server error:', error);
  console.error('Request:', event.request.url);
  
  return {
    message: 'An unexpected error occurred',
    code: 'INTERNAL_ERROR',
  };
};
