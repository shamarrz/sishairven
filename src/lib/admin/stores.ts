/**
 * Admin Dashboard Stores
 * 
 * Svelte stores for managing admin dashboard state.
 * 
 * @module lib/admin/stores
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import type { 
  GeoAnalytics, 
  RevenueAnalytics, 
  ClikaAnalytics, 
  TranslationStatus,
  TranslationJob,
  LiveActivity,
  DashboardStats,
  TimeRange 
} from './types';

// =============================================================================
// AUTH STORE
// =============================================================================

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string; role: string } | null;
  token: string | null;
}

function createAuthStore() {
  const stored = browser ? localStorage.getItem('admin_auth') : null;
  const initial: AuthState = stored 
    ? JSON.parse(stored) 
    : { isAuthenticated: false, user: null, token: null };

  const { subscribe, set, update } = writable<AuthState>(initial);

  return {
    subscribe,
    login: (username: string, password: string) => {
      // Simple password check - in production use proper auth
      if (password === 'hairven2026') {
        const state: AuthState = {
          isAuthenticated: true,
          user: { username, role: 'admin' },
          token: `token_${Date.now()}`
        };
        if (browser) localStorage.setItem('admin_auth', JSON.stringify(state));
        set(state);
        return true;
      }
      return false;
    },
    logout: () => {
      if (browser) localStorage.removeItem('admin_auth');
      set({ isAuthenticated: false, user: null, token: null });
    },
    checkAuth: () => {
      if (!browser) return false;
      const stored = localStorage.getItem('admin_auth');
      if (stored) {
        const parsed = JSON.parse(stored);
        set(parsed);
        return parsed.isAuthenticated;
      }
      return false;
    }
  };
}

export const authStore = createAuthStore();

// =============================================================================
// TIME RANGE STORE
// =============================================================================

export const timeRangeStore = writable<TimeRange>('7d');

// =============================================================================
// LOADING STORE
// =============================================================================

export const loadingStore = writable({
  dashboard: false,
  analytics: false,
  revenue: false,
  clika: false,
  translations: false
});

// =============================================================================
// DASHBOARD STATS STORE
// =============================================================================

export const dashboardStats = writable<DashboardStats>({
  todayVisitors: 0,
  todayClicks: 0,
  todayRevenue: 0,
  activeProxies: 0,
  visitorChange: 0,
  clickChange: 0,
  revenueChange: 0,
  proxyChange: 0
});

// =============================================================================
// GEO ANALYTICS STORE
// =============================================================================

export const geoAnalyticsStore = writable<GeoAnalytics>({
  countries: [],
  languages: [],
  traffic: [],
  totalVisitors: 0,
  totalPageViews: 0,
  avgSessionDuration: 0,
  bounceRate: 0
});

// =============================================================================
// REVENUE STORE
// =============================================================================

export const revenueStore = writable<RevenueAnalytics>({
  regions: [],
  topProducts: [],
  dailyRevenue: [],
  totalRevenue: 0,
  totalClicks: 0,
  totalConversions: 0,
  avgCommission: 0,
  conversionRate: 0
});

// =============================================================================
// CLIKA ANALYTICS STORE
// =============================================================================

export const clikaStore = writable<ClikaAnalytics>({
  proxyUsage: [],
  clickDistribution: [],
  businessHours: [],
  ispDiversity: [],
  totalProxies: 0,
  totalEvasionClicks: 0,
  avgHealthScore: 0
});

// =============================================================================
// TRANSLATIONS STORE
// =============================================================================

export const translationsStore = writable<TranslationStatus[]>([]);
export const translationJobsStore = writable<TranslationJob[]>([]);

// =============================================================================
// LIVE ACTIVITY STORE
// =============================================================================

function createLiveActivityStore() {
  const { subscribe, update } = writable<LiveActivity[]>([]);

  return {
    subscribe,
    addActivity: (activity: LiveActivity) => {
      update(activities => {
        const newActivities = [activity, ...activities].slice(0, 50);
        return newActivities;
      });
    },
    clear: () => update(() => [])
  };
}

export const liveActivityStore = createLiveActivityStore();

// =============================================================================
// SIDEBAR STORE
// =============================================================================

export const sidebarOpen = writable(true);

// =============================================================================
// DERIVED STORES
// =============================================================================

export const totalCountries = derived(geoAnalyticsStore, $geo => $geo.countries.length);

export const topCountry = derived(geoAnalyticsStore, $geo => 
  $geo.countries[0] || { country: 'N/A', visitors: 0 }
);

export const conversionRate = derived(revenueStore, $rev => 
  $rev.totalClicks > 0 ? ($rev.totalConversions / $rev.totalClicks) * 100 : 0
);

export const avgCommissionRate = derived(revenueStore, $rev =>
  $rev.totalRevenue > 0 ? ($rev.avgCommission / $rev.totalRevenue) * 100 : 6
);

// =============================================================================
// DATA FETCHING FUNCTIONS
// =============================================================================

export async function fetchDashboardStats(): Promise<void> {
  try {
    const response = await fetch('/api/admin/stats?type=dashboard');
    const data = await response.json();
    if (data.success) {
      dashboardStats.set(data.data);
    }
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
  }
}

export async function fetchGeoAnalytics(timeRange: TimeRange): Promise<void> {
  try {
    const response = await fetch(`/api/admin/stats?type=geo&range=${timeRange}`);
    const data = await response.json();
    if (data.success) {
      geoAnalyticsStore.set(data.data);
    }
  } catch (error) {
    console.error('Failed to fetch geo analytics:', error);
  }
}

export async function fetchRevenueData(timeRange: TimeRange): Promise<void> {
  try {
    const response = await fetch(`/api/admin/revenue?range=${timeRange}`);
    const data = await response.json();
    if (data.success) {
      revenueStore.set(data.data);
    }
  } catch (error) {
    console.error('Failed to fetch revenue data:', error);
  }
}

export async function fetchClikaAnalytics(timeRange: TimeRange): Promise<void> {
  try {
    const response = await fetch(`/api/admin/clika?range=${timeRange}`);
    const data = await response.json();
    if (data.success) {
      clikaStore.set(data.data);
    }
  } catch (error) {
    console.error('Failed to fetch clika analytics:', error);
  }
}

export async function fetchTranslations(): Promise<void> {
  try {
    const response = await fetch('/api/admin/translations');
    const data = await response.json();
    if (data.success) {
      translationsStore.set(data.data.posts);
      translationJobsStore.set(data.data.jobs);
    }
  } catch (error) {
    console.error('Failed to fetch translations:', error);
  }
}

export async function triggerTranslation(slug: string, language: string): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/translations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, language })
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Failed to trigger translation:', error);
    return false;
  }
}

// =============================================================================
// WEBSOCKET/SSE CONNECTION
// =============================================================================

let eventSource: EventSource | null = null;

export function connectLiveUpdates(): void {
  if (!browser || eventSource) return;
  
  try {
    eventSource = new EventSource('/api/admin/live');
    
    eventSource.onmessage = (event) => {
      try {
        const activity: LiveActivity = JSON.parse(event.data);
        liveActivityStore.addActivity(activity);
      } catch (e) {
        console.error('Failed to parse live activity:', e);
      }
    };
    
    eventSource.onerror = () => {
      console.error('Live updates connection error');
      eventSource?.close();
      eventSource = null;
    };
  } catch (error) {
    console.error('Failed to connect live updates:', error);
  }
}

export function disconnectLiveUpdates(): void {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
}
