/**
 * Admin Stats API
 * 
 * Provides aggregate statistics for the admin dashboard.
 * 
 * @module routes/api/admin/stats
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { 
  generateDashboardStats, 
  generateGeoAnalytics,
  adminDataStore 
} from '$lib/admin/mockData';
import type { TimeRange } from '$lib/admin/types';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const type = url.searchParams.get('type') || 'dashboard';
    const range = (url.searchParams.get('range') as TimeRange) || '7d';
    
    switch (type) {
      case 'dashboard': {
        const realStats = adminDataStore.getStats();
        const mockStats = generateDashboardStats();
        
        return json({
          success: true,
          data: {
            ...mockStats,
            todayClicks: Math.max(mockStats.todayClicks, realStats.todayClicks),
            todayVisitors: Math.max(mockStats.todayVisitors, realStats.todayVisitors),
            todayRevenue: Math.max(mockStats.todayRevenue, realStats.todayRevenue)
          },
          timestamp: Date.now()
        });
      }
      
      case 'geo': {
        const data = generateGeoAnalytics(range);
        const realVisitors = adminDataStore.getVisitors(range);
        
        // Merge real visitor data with mock data
        if (realVisitors.length > 0) {
          const realCountries = realVisitors.reduce((acc, v) => {
            acc[v.country] = (acc[v.country] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
          
          Object.entries(realCountries).forEach(([country, count]) => {
            const existing = data.countries.find(c => c.country === country);
            if (existing) {
              existing.visitors += count;
            } else {
              data.countries.push({
                country,
                countryName: country,
                visitors: count,
                percentage: 0,
                change: 0
              });
            }
          });
          
          // Recalculate percentages
          const total = data.countries.reduce((sum, c) => sum + c.visitors, 0);
          data.countries.forEach(c => {
            c.percentage = Math.round((c.visitors / total) * 100);
          });
          data.countries.sort((a, b) => b.visitors - a.visitors);
          data.totalVisitors = total;
        }
        
        return json({
          success: true,
          data,
          timestamp: Date.now()
        });
      }
      
      default:
        return json({
          success: false,
          error: 'Invalid stats type',
          timestamp: Date.now()
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Admin stats error:', error);
    return json({
      success: false,
      error: 'Internal server error',
      timestamp: Date.now()
    }, { status: 500 });
  }
};
