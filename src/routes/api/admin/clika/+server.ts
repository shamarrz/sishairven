/**
 * Admin Clika Analytics API
 * 
 * Provides Clika evasion analytics data for the admin dashboard.
 * 
 * @module routes/api/admin/clika
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { generateClikaAnalytics } from '$lib/admin/mockData';
import type { TimeRange } from '$lib/admin/types';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const range = (url.searchParams.get('range') as TimeRange) || '7d';
    const data = generateClikaAnalytics(range);
    
    return json({
      success: true,
      data,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Clika analytics error:', error);
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
    
    if (body.action === 'export') {
      const range = (body.range as TimeRange) || '30d';
      const data = generateClikaAnalytics(range);
      
      return json({
        success: true,
        data: {
          csv: generateClikaCSV(data),
          filename: `clika_analytics_${range}_${new Date().toISOString().split('T')[0]}.csv`
        }
      });
    }
    
    return json({
      success: false,
      error: 'Invalid action'
    }, { status: 400 });
  } catch (error) {
    console.error('Clika POST error:', error);
    return json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
};

function generateClikaCSV(data: ReturnType<typeof generateClikaAnalytics>): string {
  const headers = ['Country', 'Proxies', 'Clicks', 'ISP Diversity', 'Health Score'];
  const rows = data.proxyUsage.map(p => [
    p.countryName,
    p.proxyCount,
    p.clickCount,
    p.ispDiversity,
    (p.healthScore * 100).toFixed(1) + '%'
  ]);
  
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
