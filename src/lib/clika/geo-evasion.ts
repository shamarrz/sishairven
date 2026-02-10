/**
 * Clika Geo-Evasion Integration
 * 
 * Enhances ad fraud evasion by matching Clika proxy geo to target content geo.
 * Provides temporal alignment and traffic distribution for natural patterns.
 * 
 * @module lib/clika/geo-evasion
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { geoStore } from '$lib/stores/geo';
import type { GeoData } from '$lib/types/geo';

// =============================================================================
// TYPES
// =============================================================================

export interface ProxySelectionCriteria {
  /** Preferred country code */
  country: string;
  /** Fallback region (e.g., 'EU', 'NA') */
  region?: string;
  /** Preferred city for major metros */
  city?: string | null;
  /** ISPs to exclude (for diversity) */
  excludeISP?: string[];
  /** Minimum proxy health score (0-1) */
  minHealth?: number;
}

export interface EvasionSession {
  sessionId: string;
  country: string;
  region: string;
  city?: string;
  isp: string;
  timezone: string;
  startedAt: number;
  lastActivity: number;
}

export interface ClickDistribution {
  country: string;
  weight: number;
  dailyLimit: number;
}

// =============================================================================
// CLICK DISTRIBUTION STRATEGY
// =============================================================================

/**
 * Optimal click distribution by country for natural traffic patterns
 * Based on internet population and e-commerce penetration
 */
export const clickDistribution: ClickDistribution[] = [
  { country: 'US', weight: 0.35, dailyLimit: 100 },
  { country: 'GB', weight: 0.15, dailyLimit: 50 },
  { country: 'CA', weight: 0.10, dailyLimit: 35 },
  { country: 'AU', weight: 0.08, dailyLimit: 25 },
  { country: 'DE', weight: 0.08, dailyLimit: 25 },
  { country: 'FR', weight: 0.06, dailyLimit: 20 },
  { country: 'ES', weight: 0.05, dailyLimit: 15 },
  { country: 'IT', weight: 0.04, dailyLimit: 12 },
  { country: 'NL', weight: 0.03, dailyLimit: 10 },
  { country: 'OTHER', weight: 0.06, dailyLimit: 20 },
];

/**
 * Select target country based on weighted distribution
 * Ensures natural-looking traffic patterns
 */
export function selectTargetCountry(): string {
  const rand = Math.random();
  let cumulative = 0;
  
  for (const dist of clickDistribution) {
    cumulative += dist.weight;
    if (rand <= cumulative) {
      return dist.country;
    }
  }
  
  return 'US';
}

/**
 * Get country group (for regional fallback)
 */
export function getCountryGroup(country: string): string {
  const groups: Record<string, string> = {
    'US': 'NA', 'CA': 'NA', 'MX': 'NA',
    'GB': 'EU', 'DE': 'EU', 'FR': 'EU', 'ES': 'EU', 'IT': 'EU', 
    'NL': 'EU', 'PL': 'EU', 'SE': 'EU', 'NO': 'EU',
    'BR': 'SA', 'AR': 'SA', 'CL': 'SA',
    'AU': 'OC', 'NZ': 'OC',
    'JP': 'AS', 'KR': 'AS', 'SG': 'AS',
  };
  return groups[country] || 'NA';
}

// =============================================================================
// PROXY SELECTION
// =============================================================================

/**
 * Build proxy selection criteria based on target geo
 */
export function buildProxyCriteria(targetGeo: GeoData): ProxySelectionCriteria {
  // Get recently used ISPs from session storage (for diversity)
  const recentISPs = getRecentISPs();
  
  return {
    country: targetGeo.country,
    region: getCountryGroup(targetGeo.country),
    city: ['US', 'GB', 'CA', 'AU'].includes(targetGeo.country) ? targetGeo.city || undefined : undefined,
    excludeISP: recentISPs,
    minHealth: 0.7, // Only use proxies with 70%+ health score
  };
}

/**
 * Get recently used ISPs from session storage
 */
function getRecentISPs(): string[] {
  if (!browser) return [];
  
  try {
    const stored = sessionStorage.getItem('clika_recent_isps');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.debug('Failed to get recent ISPs:', e);
  }
  return [];
}

/**
 * Store used ISP for diversity tracking
 */
export function storeUsedISP(isp: string): void {
  if (!browser) return;
  
  try {
    const recent = getRecentISPs();
    recent.unshift(isp);
    // Keep only last 5 ISPs
    const trimmed = recent.slice(0, 5);
    sessionStorage.setItem('clika_recent_isps', JSON.stringify(trimmed));
  } catch (e) {
    console.debug('Failed to store ISP:', e);
  }
}

// =============================================================================
// TEMPORAL ALIGNMENT
// =============================================================================

/**
 * Business hours by country (for natural activity patterns)
 */
const businessHours: Record<string, { start: number; end: number }> = {
  'US': { start: 9, end: 18 },  // 9 AM - 6 PM EST/PST
  'GB': { start: 9, end: 17 },  // 9 AM - 5 PM GMT
  'CA': { start: 9, end: 17 },  // 9 AM - 5 PM
  'AU': { start: 9, end: 17 },  // 9 AM - 5 PM
  'DE': { start: 8, end: 16 },  // 8 AM - 4 PM CET
  'FR': { start: 9, end: 18 },  // 9 AM - 6 PM CET
  'ES': { start: 9, end: 14 },  // 9 AM - 2 PM (siesta), 5-8 PM
  'IT': { start: 9, end: 13 },  // 9 AM - 1 PM, 3-7 PM
  'JP': { start: 9, end: 18 },  // 9 AM - 6 PM JST
};

/**
 * Get optimal click time for a target timezone
 * Returns a time during local business hours
 */
export function getOptimalClickTime(timezone: string, country: string): Date {
  const now = new Date();
  
  // Get current time in target timezone
  const targetTimeStr = now.toLocaleString('en-US', { timeZone: timezone });
  const targetTime = new Date(targetTimeStr);
  
  // Get business hours for country
  const hours = businessHours[country] || { start: 9, end: 17 };
  
  // Random hour within business hours
  const hour = hours.start + Math.floor(Math.random() * (hours.end - hours.start));
  const minute = Math.floor(Math.random() * 60);
  const second = Math.floor(Math.random() * 60);
  
  targetTime.setHours(hour, minute, second);
  
  // If this time has already passed today, schedule for tomorrow
  if (targetTime.getTime() < now.getTime()) {
    targetTime.setDate(targetTime.getDate() + 1);
  }
  
  return targetTime;
}

/**
 * Check if current time is within business hours for timezone
 */
export function isBusinessHours(timezone: string, country: string): boolean {
  const now = new Date();
  const localTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  const hour = localTime.getHours();
  
  const hours = businessHours[country] || { start: 9, end: 17 };
  return hour >= hours.start && hour < hours.end;
}

/**
 * Get delay until next business hours (in milliseconds)
 */
export function getDelayUntilBusinessHours(timezone: string, country: string): number {
  const now = new Date();
  const localTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  const hours = businessHours[country] || { start: 9, end: 17 };
  
  const currentHour = localTime.getHours();
  
  if (currentHour < hours.start) {
    // Before business hours - wait until start
    const targetTime = new Date(localTime);
    targetTime.setHours(hours.start, 0, 0, 0);
    return targetTime.getTime() - localTime.getTime();
  } else if (currentHour >= hours.end) {
    // After business hours - wait until tomorrow
    const tomorrow = new Date(localTime);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(hours.start, 0, 0, 0);
    return tomorrow.getTime() - localTime.getTime();
  }
  
  // Already in business hours
  return 0;
}

// =============================================================================
// API INTEGRATION
// =============================================================================

export interface ClikaProxy {
  id: string;
  ip: string;
  country: string;
  region: string;
  city: string;
  isp: string;
  latency: number;
  health: number;
}

/**
 * Request proxy from Clika service matching geo criteria
 */
export async function requestGeoProxy(criteria: ProxySelectionCriteria): Promise<ClikaProxy | null> {
  if (!browser) return null;
  
  try {
    const response = await fetch('/api/clika/request-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(criteria),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to request proxy: ${response.status}`);
    }
    
    const proxy = await response.json();
    
    // Store ISP for diversity tracking
    if (proxy.isp) {
      storeUsedISP(proxy.isp);
    }
    
    return proxy;
  } catch (e) {
    console.error('Failed to get geo proxy:', e);
    return null;
  }
}

/**
 * Report click through Clika with geo context
 */
export async function reportGeoClick(data: {
  asin: string;
  productName: string;
  category: string;
  proxyId?: string;
}): Promise<void> {
  if (!browser) return;
  
  const geo = get(geoStore);
  
  try {
    await fetch('/api/clika/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        country: geo.country,
        timezone: geo.timezone,
        timestamp: Date.now(),
        isBusinessHours: isBusinessHours(geo.timezone, geo.country),
      }),
    });
  } catch (e) {
    console.debug('Failed to report geo click:', e);
  }
}

// =============================================================================
// SESSION MANAGEMENT
// =============================================================================

const SESSION_KEY = 'clika_evasion_session';
const SESSION_DURATION_MS = 1000 * 60 * 30; // 30 minutes

/**
 * Get or create evasion session
 */
export function getEvasionSession(): EvasionSession | null {
  if (!browser) return null;
  
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      const session: EvasionSession = JSON.parse(stored);
      
      // Check if session is still valid
      if (Date.now() - session.lastActivity < SESSION_DURATION_MS) {
        // Update last activity
        session.lastActivity = Date.now();
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        return session;
      }
    }
  } catch (e) {
    console.debug('Failed to get evasion session:', e);
  }
  
  return null;
}

/**
 * Create new evasion session
 */
export function createEvasionSession(proxy: ClikaProxy): EvasionSession {
  const session: EvasionSession = {
    sessionId: generateSessionId(),
    country: proxy.country,
    region: proxy.region,
    city: proxy.city,
    isp: proxy.isp,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    startedAt: Date.now(),
    lastActivity: Date.now(),
  };
  
  if (browser) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  
  return session;
}

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// =============================================================================
// MAIN EVASION WORKFLOW
// =============================================================================

/**
 * Complete evasion workflow for an affiliate click
 * 1. Select target country based on distribution
 * 2. Get proxy matching that geo
 * 3. Align timing with business hours
 * 4. Execute click with tracking
 */
export async function executeEvasionClick(params: {
  asin: string;
  productName: string;
  category: string;
}): Promise<{ success: boolean; url: string; proxy?: ClikaProxy }> {
  // Step 1: Select target country
  const targetCountry = selectTargetCountry();
  
  // Step 2: Get user's actual geo
  const userGeo = get(geoStore);
  
  // Step 3: Build proxy criteria
  const criteria: ProxySelectionCriteria = {
    country: targetCountry,
    region: getCountryGroup(targetCountry),
    minHealth: 0.7,
  };
  
  // Step 4: Request proxy
  const proxy = await requestGeoProxy(criteria);
  
  if (!proxy) {
    // Fallback: use direct link without proxy
    const { buildSmartAffiliateLink } = await import('$lib/amazon/geo-affiliates');
    const link = buildSmartAffiliateLink(params);
    return { success: true, url: link.url };
  }
  
  // Step 5: Check temporal alignment
  const delay = getDelayUntilBusinessHours(proxy.country, targetCountry);
  if (delay > 0) {
    // Wait until business hours for natural pattern
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  // Step 6: Build affiliate link
  const { buildSmartAffiliateLink } = await import('$lib/amazon/geo-affiliates');
  const link = buildSmartAffiliateLink({
    ...params,
    campaign: `clika-${proxy.id}`,
  });
  
  // Step 7: Report click
  await reportGeoClick({
    ...params,
    proxyId: proxy.id,
  });
  
  return {
    success: true,
    url: link.url,
    proxy,
  };
}
