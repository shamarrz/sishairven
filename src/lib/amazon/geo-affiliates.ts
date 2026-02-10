/**
 * Amazon Geo-Affiliate System
 * 
 * Provides geo-targeted Amazon affiliate links with:
 * - Auto-redirect to local Amazon stores
 * - Currency conversion display
 * - Product availability checking
 * - ASIN mapping for regional variants
 * 
 * @module lib/amazon/geo-affiliates
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { geoStore } from '$lib/stores/geo';
import type { GeoData } from '$lib/types/geo';
import { amazonProducts } from '$lib/utils/amazon-products';

// =============================================================================
// REGIONAL AMAZON CONFIGURATION
// =============================================================================

/**
 * Amazon Associates configuration by region
 */
export interface AmazonRegionConfig {
  domain: string;
  tag: string;
  currency: string;
  language: string;
}

/**
 * Amazon regional settings
 */
export const amazonRegions: Record<string, AmazonRegionConfig> = {
  'US': { domain: 'amazon.com', tag: 'hairvenusa-20', currency: 'USD', language: 'en' },
  'CA': { domain: 'amazon.ca', tag: 'hairvenca-20', currency: 'CAD', language: 'en' },
  'MX': { domain: 'amazon.com.mx', tag: 'hairvenmx-20', currency: 'MXN', language: 'es' },
  'GB': { domain: 'amazon.co.uk', tag: 'hairvenuk-21', currency: 'GBP', language: 'en' },
  'DE': { domain: 'amazon.de', tag: 'hairvende-21', currency: 'EUR', language: 'de' },
  'FR': { domain: 'amazon.fr', tag: 'hairvenfr-21', currency: 'EUR', language: 'fr' },
  'ES': { domain: 'amazon.es', tag: 'hairvenes-21', currency: 'EUR', language: 'es' },
  'IT': { domain: 'amazon.it', tag: 'hairvenit-21', currency: 'EUR', language: 'it' },
  'JP': { domain: 'amazon.co.jp', tag: 'hairvenjp-22', currency: 'JPY', language: 'ja' },
  'AU': { domain: 'amazon.com.au', tag: 'hairvenau-22', currency: 'AUD', language: 'en' },
  'BR': { domain: 'amazon.com.br', tag: 'hairvenbr-20', currency: 'BRL', language: 'pt' },
  'IN': { domain: 'amazon.in', tag: 'hairvenin-21', currency: 'INR', language: 'en' },
};

// =============================================================================
// ASIN MAPPING FOR REGIONAL VARIANTS
// =============================================================================

/**
 * Some products have different ASINs in different regions
 * Map US ASINs to their regional equivalents
 */
const asinMapping: Record<string, Record<string, string>> = {
  // Dyson Supersonic
  'B01FIG3JA4': {
    'GB': 'B01FIG3JA4', // Same ASIN
    'DE': 'B01FIG3JA4',
    'FR': 'B01FIG3JA4',
    'ES': 'B01FIG3JA4',
    'IT': 'B01FIG3JA4',
    'JP': 'B01FIG3JA4',
    'AU': 'B01FIG3JA4',
  },
  // ghd Platinum+
  'B07C8F12Z9': {
    'GB': 'B07C8F12Z9',
    'DE': 'B07C8F12Z9',
    'FR': 'B07C8F12Z9',
  },
  // Revlon One-Step
  'B07FX47NSL': {
    'GB': 'B07FX47NSL',
    'CA': 'B07FX47NSL',
    'DE': 'B07FX47NSL',
  },
  // Moroccanoil Treatment
  'B00BEUWX9Y': {
    'GB': 'B00BEUWX9Y',
    'DE': 'B00BEUWX9Y',
    'FR': 'B00BEUWX9Y',
    'ES': 'B00BEUWX9Y',
  },
  // Olaplex No. 3
  'B00SNM5SJO': {
    'GB': 'B00SNM5SJO',
    'DE': 'B00SNM5SJO',
    'FR': 'B00SNM5SJO',
    'ES': 'B00SNM5SJO',
    'IT': 'B00SNM5SJO',
    'CA': 'B00SNM5SJO',
    'AU': 'B00SNM5SJO',
  },
};

/**
 * Get regional ASIN for a product
 * Falls back to US ASIN if no mapping exists
 */
export function getRegionalASIN(usASIN: string, countryCode: string): string {
  const mapping = asinMapping[usASIN];
  if (mapping && mapping[countryCode]) {
    return mapping[countryCode];
  }
  return usASIN;
}

// =============================================================================
// LINK GENERATION
// =============================================================================

export interface AmazonLinkOptions {
  /** Product ASIN */
  asin: string;
  /** Source page for tracking */
  source?: string;
  /** Campaign for analytics */
  campaign?: string;
  /** Additional keywords */
  keywords?: string;
  /** Whether to track this click */
  track?: boolean;
}

/**
 * Generate Amazon affiliate link for current geo
 */
export function generateAmazonLink(
  options: AmazonLinkOptions,
  geo?: GeoData
): string {
  const geoData = geo || get(geoStore);
  const regionConfig = amazonRegions[geoData.country] || amazonRegions['US'];
  
  // Get regional ASIN
  const regionalASIN = getRegionalASIN(options.asin, geoData.country);
  
  // Build base URL
  let url = `https://www.${regionConfig.domain}/dp/${regionalASIN}`;
  
  // Add affiliate tag
  const params = new URLSearchParams();
  params.set('tag', regionConfig.tag);
  
  // Add tracking parameters
  if (options.source) {
    params.set('ref', options.source);
  }
  
  if (options.campaign) {
    params.set('ascsubtag', options.campaign);
  }
  
  if (options.keywords) {
    params.set('keywords', options.keywords);
  }
  
  url += '?' + params.toString();
  
  return url;
}

/**
 * Generate Amazon search link
 */
export function generateAmazonSearchLink(
  keywords: string,
  geo?: GeoData
): string {
  const geoData = geo || get(geoStore);
  const regionConfig = amazonRegions[geoData.country] || amazonRegions['US'];
  
  const params = new URLSearchParams();
  params.set('k', keywords);
  params.set('tag', regionConfig.tag);
  
  return `https://www.${regionConfig.domain}/s?${params.toString()}`;
}

// =============================================================================
// PRICE & AVAILABILITY
// =============================================================================

/**
 * Product price info by region
 */
export interface RegionalPrice {
  asin: string;
  country: string;
  price: number;
  currency: string;
  formattedPrice: string;
  availability: 'in_stock' | 'out_of_stock' | 'unknown';
  lastUpdated: Date;
}

// Cache for price lookups (browser only)
const priceCache = new Map<string, RegionalPrice>();
const CACHE_DURATION_MS = 1000 * 60 * 60; // 1 hour

/**
 * Get cached price for a product
 */
export function getCachedPrice(asin: string, country: string): RegionalPrice | null {
  const cacheKey = `${asin}:${country}`;
  const cached = priceCache.get(cacheKey);
  
  if (!cached) return null;
  
  // Check if cache is still valid
  const age = Date.now() - cached.lastUpdated.getTime();
  if (age > CACHE_DURATION_MS) {
    priceCache.delete(cacheKey);
    return null;
  }
  
  return cached;
}

/**
 * Set cached price
 */
export function setCachedPrice(price: RegionalPrice): void {
  const cacheKey = `${price.asin}:${price.country}`;
  priceCache.set(cacheKey, price);
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency: string, locale?: string): string {
  const geo = get(geoStore);
  const lang = locale || geo.language || 'en-US';
  
  return new Intl.NumberFormat(lang, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

// =============================================================================
// CLICK TRACKING
// =============================================================================

export interface AffiliateClickEvent {
  asin: string;
  productName: string;
  category: string;
  country: string;
  timestamp: number;
  source: string;
  estimatedCommission: number;
}

/**
 * Track affiliate link click
 */
export async function trackAffiliateClick(event: AffiliateClickEvent): Promise<void> {
  if (!browser) return;
  
  try {
    await fetch('/api/clika/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
  } catch (e) {
    // Silent fail - don't block user experience
    console.debug('Click tracking failed:', e);
  }
}

/**
 * Create tracked affiliate link
 * Wraps the link with tracking
 */
export function createTrackedLink(
  asin: string,
  productName: string,
  category: string,
  options: Omit<AmazonLinkOptions, 'asin'> = {}
): string {
  const geo = get(geoStore);
  const product = amazonProducts.find(p => p.asin === asin);
  
  // Track the click
  const price = product ? parseFloat(product.price.replace(/[^0-9.]/g, '')) : 0;
  const commission = price * 0.06; // ~6% average commission
  
  if (browser && options.track !== false) {
    trackAffiliateClick({
      asin,
      productName,
      category,
      country: geo.country,
      timestamp: Date.now(),
      source: options.source || 'website',
      estimatedCommission: commission,
    });
  }
  
  return generateAmazonLink({ asin, ...options }, geo);
}

// =============================================================================
// SMART LINK BUILDER
// =============================================================================

/**
 * Build a complete affiliate link with all optimizations
 */
export function buildSmartAffiliateLink(params: {
  asin: string;
  productName: string;
  category: string;
  source?: string;
  campaign?: string;
  track?: boolean;
}): {
  url: string;
  displayPrice: string;
  currency: string;
  domain: string;
} {
  const geo = get(geoStore);
  const regionConfig = amazonRegions[geo.country] || amazonRegions['US'];
  const product = amazonProducts.find(p => p.asin === params.asin);
  
  // Generate URL
  const url = createTrackedLink(
    params.asin,
    params.productName,
    params.category,
    {
      source: params.source,
      campaign: params.campaign,
      track: params.track,
    }
  );
  
  return {
    url,
    displayPrice: product?.price || '',
    currency: regionConfig.currency,
    domain: regionConfig.domain,
  };
}
