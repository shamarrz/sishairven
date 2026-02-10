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
