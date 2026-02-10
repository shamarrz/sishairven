import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { generateRevenueData, adminDataStore } from '$lib/admin/mockData';
import type { TimeRange } from '$lib/admin/types';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const range = (url.searchParams.get('range') as TimeRange) || '7d';
    const data = generateRevenueData(range);
    
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
