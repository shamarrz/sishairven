/**
 * Geo Data Stores
 * 
 * Reactive stores for geographic location data and derived values.
 * These stores are synchronized with the server-side geo detection.
 * 
 * @module lib/stores/geo
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import { writable, derived } from 'svelte/store';
import type { GeoData, RegionalConfig } from '$lib/types/geo';
import { getRegionalConfig, getCurrencySymbol } from '$lib/types/geo';

/**
 * Writable store for geo data
 * Populated from page data on load
 */
export const geoStore = writable<GeoData>({
  country: 'US',
  countryName: 'United States',
  region: null,
  city: null,
  timezone: 'America/New_York',
  currency: 'USD',
  language: 'en-US',
  lat: null,
  lon: null,
  continent: 'NA',
  isEU: false,
});

/**
 * Derived store for regional configuration
 */
export const regionalConfigStore = derived(
  geoStore,
  $geo => getRegionalConfig($geo.country)
);

/**
 * Derived store for currency symbol
 */
export const currencySymbolStore = derived(
  geoStore,
  $geo => getCurrencySymbol($geo.currency)
);

/**
 * Derived store checking if user is in EU
 * Useful for GDPR compliance
 */
export const isEUStore = derived(
  geoStore,
  $geo => $geo.isEU
);

/**
 * Format price with local currency
 */
export function formatLocalPrice(amount: number, geo: GeoData): string {
  return new Intl.NumberFormat(geo.language, {
    style: 'currency',
    currency: geo.currency,
  }).format(amount);
}

/**
 * Get Amazon domain for current geo
 */
export function getAmazonDomain(geo: GeoData): string {
  const config = getRegionalConfig(geo.country);
  return config.amazonDomain;
}

/**
 * Get Amazon affiliate tag for current geo
 */
export function getAmazonTag(geo: GeoData): string {
  const config = getRegionalConfig(geo.country);
  return config.amazonTag;
}

/**
 * Check if affiliate links are supported for current geo
 */
export function isAffiliateSupported(geo: GeoData): boolean {
  const config = getRegionalConfig(geo.country);
  return config.affiliateSupported;
}

/**
 * Initialize geo store from page data
 * Call this in layout onMount or after page load
 */
export function initializeGeoStore(geo: GeoData) {
  geoStore.set(geo);
}
