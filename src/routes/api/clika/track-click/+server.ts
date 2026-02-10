import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export interface ClickTrackingData {
  asin: string;
  productName: string;
  category: string;
  country: string;
  timezone?: string;
  timestamp: number;
  source?: string;
  campaign?: string;
  estimatedCommission?: number;
  proxyId?: string;
  isBusinessHours?: boolean;
}

export const POST: RequestHandler = async ({ request, locals, getClientAddress }) => {
  try {
    const data: ClickTrackingData = await request.json();
    
    if (!data.asin || !data.productName) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const trackingRecord = {
      ...data,
      country: data.country || locals.geo?.country || 'US',
      timezone: data.timezone || locals.geo?.timezone || 'UTC',
      ipHash: hashIP(getClientAddress()),
      serverTimestamp: Date.now(),
      userAgent: request.headers.get('User-Agent') || 'unknown',
    };
    
    console.log('[Clika Click]', {
      asin: trackingRecord.asin,
      country: trackingRecord.country,
      estimatedCommission: trackingRecord.estimatedCommission,
    });
    
    return json({ success: true, id: generateTrackingId() });
    
  } catch (error) {
    console.error('Click tracking error:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};

function hashIP(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

function generateTrackingId(): string {
  return `clk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
