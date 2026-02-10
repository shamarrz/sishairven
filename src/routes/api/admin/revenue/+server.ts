/**
 * Admin Revenue API
 * 
 * Provides revenue analytics data for the admin dashboard.
 * 
 * @module routes/api/admin/revenue
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { generateRevenueData, adminDataStore } from '$lib/admin/mockData';
import type { TimeRange } from '$lib/admin/types';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const range = (url.searchParams.get('range') as TimeRange) || '7d';
    const data = generateRevenueData(range);
    
    // Merge real click data
    const realClicks = adminDataStore.getClicks(range);
    if (realClicks.length > 0) {
      const realRevenue = realClicks.reduce((sum, c) => sum + (c.estimatedCommission || 0), 0);
      data.totalRevenue += realRevenue;
      data.totalClicks += realClicks.length;
      data.avgCommission = (data.totalRevenue * 0.06);
    }
    
    return json({
      success: true,
      data,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Revenue API error:', error);
    return json({
      success: false,
      error: 'Internal server error',
      timestamp: Date.now()
    }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Handle revenue export request
    if (body.action === 'export') {
      const range = (body.range as TimeRange) || '30d';
      const data = generateRevenueData(range);
      
      return json({
        success: true,
        data: {
          csv: generateRevenueCSV(data),
          filename: `revenue_${range}_${new Date().toISOString().split('T')[0]}.csv`
        }
      });
    }
    
    return json({
      success: false,
      error: 'Invalid action'
    }, { status: 400 });
  } catch (error) {
    console.error('Revenue POST error:', error);
    return json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
};

function generateRevenueCSV(data: ReturnType<typeof generateRevenueData>): string {
  const headers = ['Date', 'Revenue', 'Clicks', 'Conversions', 'Commission'];
  const rows = data.dailyRevenue.map(day => [
    day.date,
    day.revenue.toFixed(2),
    day.clicks,
    day.conversions,
    (day.revenue * 0.06).toFixed(2)
  ]);
  
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
