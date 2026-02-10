import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { adminDataStore } from '$lib/admin/mockData';
import type { TimeRange, StoredClick } from '$lib/admin/types';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const range = (url.searchParams.get('range') as TimeRange) || '7d';
    const country = url.searchParams.get('country');
    const product = url.searchParams.get('product');
    
    let clicks = adminDataStore.getClicks(range);
    
    if (country) clicks = clicks.filter(c => c.country === country);
    if (product) clicks = clicks.filter(c => c.productName?.includes(product));
    
    const byCountry = clicks.reduce((acc, c) => {
      acc[c.country] = (acc[c.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byProduct = clicks.reduce((acc, c) => {
      const key = c.productName || 'Unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return json({
      success: true,
      data: {
        clicks: clicks.slice(-100),
        total: clicks.length,
        byCountry,
        byProduct,
        totalCommission: clicks.reduce((sum, c) => sum + (c.estimatedCommission || 0), 0)
      },
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Clicks API error:', error);
    return json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    
    if (!data.asin || !data.productName) {
      return json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    
    const click: StoredClick = {
      id: `clk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      asin: data.asin,
      productName: data.productName,
      category: data.category || 'general',
      country: data.country || 'US',
      timestamp: Date.now(),
      estimatedCommission: data.estimatedCommission || 0,
      proxyId: data.proxyId,
      isBusinessHours: data.isBusinessHours
    };
    
    adminDataStore.addClick(click);
    
    return json({ success: true, data: { clickId: click.id } });
  } catch (error) {
    console.error('Click tracking error:', error);
    return json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
};
