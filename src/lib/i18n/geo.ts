/**
 * Geo Detection Service
 * 
 * Detects user location from multiple sources:
 * 1. Cloudflare CF-IPCountry header (fastest, edge-level)
 * 2. Vercel/Netlify geo headers (if deployed there)
 * 3. MaxMind GeoIP2 lookup (fallback)
 * 4. Browser navigator.language (last resort)
 * 
 * @module lib/i18n/geo
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import type { GeoData } from '$lib/types/geo';
import { getRegionalConfig } from '$lib/types/geo';

/**
 * Default geo data when detection fails
 */
export const defaultGeoData: GeoData = {
  country: 'US',
  countryName: 'United States',
  region: null,
  city: null,
  timezone: 'America/New_York',
  currency: 'USD',
  language: 'en-US',
  lat: 40.7128,
  lon: -74.0060,
  continent: 'NA',
  isEU: false,
};

/**
 * Country to continent mapping
 */
const countryToContinent: Record<string, string> = {
  'US': 'NA', 'CA': 'NA', 'MX': 'NA',
  'GB': 'EU', 'DE': 'EU', 'FR': 'EU', 'ES': 'EU', 'IT': 'EU', 'NL': 'EU', 'PL': 'EU',
  'BR': 'SA', 'AR': 'SA', 'CL': 'SA', 'CO': 'SA',
  'JP': 'AS', 'CN': 'AS', 'IN': 'AS', 'KR': 'AS', 'SG': 'AS',
  'AU': 'OC', 'NZ': 'OC',
  'ZA': 'AF', 'NG': 'AF', 'EG': 'AF',
};

/**
 * Country to timezone mapping (primary timezone)
 */
const countryToTimezone: Record<string, string> = {
  'US': 'America/New_York',
  'CA': 'America/Toronto',
  'MX': 'America/Mexico_City',
  'GB': 'Europe/London',
  'DE': 'Europe/Berlin',
  'FR': 'Europe/Paris',
  'ES': 'Europe/Madrid',
  'IT': 'Europe/Rome',
  'AU': 'Australia/Sydney',
  'JP': 'Asia/Tokyo',
  'IN': 'Asia/Kolkata',
  'BR': 'America/Sao_Paulo',
};

/**
 * Country names mapping
 */
const countryNames: Record<string, string> = {
  'US': 'United States',
  'CA': 'Canada',
  'MX': 'Mexico',
  'GB': 'United Kingdom',
  'DE': 'Germany',
  'FR': 'France',
  'ES': 'Spain',
  'IT': 'Italy',
  'AU': 'Australia',
  'JP': 'Japan',
  'IN': 'India',
  'BR': 'Brazil',
  'NL': 'Netherlands',
  'PL': 'Poland',
  'SE': 'Sweden',
  'NO': 'Norway',
  'DK': 'Denmark',
  'FI': 'Finland',
  'CH': 'Switzerland',
  'AT': 'Austria',
  'BE': 'Belgium',
  'PT': 'Portugal',
  'IE': 'Ireland',
  'NZ': 'New Zealand',
  'SG': 'Singapore',
  'KR': 'South Korea',
  'CN': 'China',
  'RU': 'Russia',
  'ZA': 'South Africa',
  'NG': 'Nigeria',
  'EG': 'Egypt',
  'AR': 'Argentina',
  'CL': 'Chile',
  'CO': 'Colombia',
  'PE': 'Peru',
  'VE': 'Venezuela',
};

/**
 * EU country codes for GDPR checks
 */
const euCountries = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', // Including UK for now
]);

/**
 * Detect geo location from request headers
 * This is the primary detection method using Cloudflare/Vercel headers
 */
export function detectGeoFromHeaders(headers: Headers): GeoData {
  // Try Cloudflare headers first (most reliable when using Cloudflare)
  const cfCountry = headers.get('CF-IPCountry');
  const cfRegion = headers.get('CF-IPRegion');
  const cfCity = headers.get('CF-IPCity');
  const cfLat = headers.get('CF-IPLatitude');
  const cfLon = headers.get('CF-IPLongitude');
  
  // Try Vercel headers (if deployed on Vercel)
  const vercelCountry = headers.get('X-Vercel-IP-Country');
  const vercelCity = headers.get('X-Vercel-IP-City');
  const vercelRegion = headers.get('X-Vercel-IP-Country-Region');
  
  // Use the first available country code
  const country = cfCountry || vercelCountry || 'US';
  const region = cfRegion || vercelRegion || null;
  const city = cfCity || vercelCity || null;
  
  // Get regional config for language and currency
  const regionalConfig = getRegionalConfig(country);
  
  // Build timezone from country
  const timezone = countryToTimezone[country] || 'UTC';
  
  // Detect language from Accept-Language header
  const acceptLang = headers.get('Accept-Language') || 'en-US';
  
  return {
    country,
    countryName: countryNames[country] || country,
    region,
    city,
    timezone,
    currency: regionalConfig.currency,
    language: acceptLang,
    lat: cfLat ? parseFloat(cfLat) : null,
    lon: cfLon ? parseFloat(cfLon) : null,
    continent: countryToContinent[country] || 'NA',
    isEU: euCountries.has(country),
  };
}

/**
 * Detect geo from client-side (browser)
 * Used as fallback when server-side detection isn't available
 */
export function detectGeoFromBrowser(): Partial<GeoData> {
  if (typeof window === 'undefined') return {};
  
  const lang = navigator.language || 'en-US';
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  
  // Try to extract country from language (e.g., 'en-US' -> 'US')
  const country = lang.split('-')[1] || 'US';
  
  return {
    country,
    countryName: countryNames[country] || country,
    timezone,
    language: lang,
    currency: getRegionalConfig(country).currency,
    isEU: euCountries.has(country),
  };
}

/**
 * Get user's timezone from browser
 */
export function getBrowserTimezone(): string {
  if (typeof window === 'undefined') return 'UTC';
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
}

/**
 * Format date according to user's locale
 */
export function formatLocalDate(
  date: Date,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  
  return date.toLocaleDateString(locale, defaultOptions);
}

/**
 * Format currency according to user's region
 */
export function formatLocalCurrency(
  amount: number,
  currency: string,
  locale: string
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Check if user is in EU (for GDPR compliance)
 */
export function isEUCountry(countryCode: string): boolean {
  return euCountries.has(countryCode);
}

/**
 * Get distance between two coordinates (in km)
 * Useful for finding closest location/store
 */
export function getDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Get optimal time to schedule content/campaigns for a timezone
 * Returns times during local business hours (9 AM - 6 PM)
 */
export function getOptimalLocalTime(timezone: string): Date {
  const now = new Date();
  
  // Get current time in target timezone
  const targetTimeStr = now.toLocaleString('en-US', { timeZone: timezone });
  const targetTime = new Date(targetTimeStr);
  
  // Business hours: 9 AM - 6 PM
  const businessStart = 9;
  const businessEnd = 18;
  
  // Random hour within business hours
  const hour = businessStart + Math.floor(Math.random() * (businessEnd - businessStart));
  const minute = Math.floor(Math.random() * 60);
  
  targetTime.setHours(hour, minute, 0, 0);
  
  return targetTime;
}

/**
 * Store geo data in a cookie for persistence
 */
export function createGeoCookie(geo: GeoData): string {
  const value = JSON.stringify({
    country: geo.country,
    lang: geo.language.split('-')[0],
    currency: geo.currency,
  });
  
  // Cookie expires in 30 days
  const expires = new Date();
  expires.setDate(expires.getDate() + 30);
  
  return `geo_pref=${encodeURIComponent(value)}; Path=/; Expires=${expires.toUTCString()}; SameSite=Lax`;
}

/**
 * Parse geo data from cookie
 */
export function parseGeoCookie(cookieValue: string): Partial<GeoData> | null {
  try {
    const decoded = decodeURIComponent(cookieValue);
    const parsed = JSON.parse(decoded);
    
    return {
      country: parsed.country,
      language: parsed.lang,
      currency: parsed.currency,
    };
  } catch {
    return null;
  }
}
