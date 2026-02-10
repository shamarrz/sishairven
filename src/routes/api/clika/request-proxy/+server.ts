import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { ProxySelectionCriteria, ClikaProxy } from '$lib/clika/geo-evasion';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const criteria: ProxySelectionCriteria = await request.json();
    
    if (!criteria.country) {
      throw error(400, 'Country is required');
    }
    
    const proxy = await fetchProxyFromClika(criteria);
    
    if (!proxy) {
      throw error(503, 'No proxy available matching criteria');
    }
    
    return json(proxy);
    
  } catch (e) {
    console.error('Proxy request error:', e);
    throw error(500, 'Failed to request proxy');
  }
};

async function fetchProxyFromClika(criteria: ProxySelectionCriteria): Promise<ClikaProxy | null> {
  const CLIKA_API_URL = env.CLIKA_API_URL;
  const CLIKA_API_KEY = env.CLIKA_API_KEY;
  
  if (!CLIKA_API_URL || !CLIKA_API_KEY) {
    console.log('[Clika] Using mock proxy (no API config)');
    return createMockProxy(criteria);
  }
  
  try {
    const response = await fetch(`${CLIKA_API_URL}/api/v1/proxies/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CLIKA_API_KEY}`,
      },
      body: JSON.stringify(criteria),
    });
    
    if (!response.ok) {
      throw new Error(`Clika API error: ${response.status}`);
    }
    
    return await response.json();
    
  } catch (e) {
    console.error('Clika API error:', e);
    return null;
  }
}

function createMockProxy(criteria: ProxySelectionCriteria): ClikaProxy {
  const cities: Record<string, string[]> = {
    'US': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
    'GB': ['London', 'Manchester', 'Birmingham', 'Leeds'],
    'CA': ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
    'DE': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'],
    'FR': ['Paris', 'Marseille', 'Lyon', 'Toulouse'],
    'ES': ['Madrid', 'Barcelona', 'Valencia', 'Seville'],
    'AU': ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
    'JP': ['Tokyo', 'Osaka', 'Yokohama', 'Nagoya'],
  };
  
  const isps = ['Comcast', 'AT&T', 'Verizon', 'Spectrum', 'Cox', 'BT', 'Deutsche Telekom', 'Orange'];
  
  const countryCities = cities[criteria.country] || ['Unknown'];
  const city = criteria.city || countryCities[Math.floor(Math.random() * countryCities.length)];
  
  return {
    id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    country: criteria.country,
    region: criteria.region || 'NA',
    city,
    isp: isps[Math.floor(Math.random() * isps.length)],
    latency: Math.floor(Math.random() * 100) + 20,
    health: 0.7 + Math.random() * 0.3,
  };
}
