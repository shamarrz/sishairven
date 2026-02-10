import type { RequestHandler } from './$types';
import type { LiveActivity } from '$lib/admin/types';

const activityTypes = [
  { type: 'pageview', details: ['Viewed best-hair-dryers-2025', 'Viewed shop page', 'Viewed keratin-treatment-guide'] },
  { type: 'click', details: ['Clicked Dyson Supersonic', 'Clicked ghd Platinum+', 'Clicked Olaplex No. 3'] },
  { type: 'conversion', details: ['Purchased Dyson Supersonic', 'Purchased Revlon One-Step'] },
  { type: 'proxy_request', details: ['Proxy request: US', 'Proxy request: GB', 'Proxy request: DE'] }
];

const countries = ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'ES', 'IT'];

export const GET: RequestHandler = async ({ request }) => {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(`data: ${JSON.stringify({ type: 'connected', timestamp: Date.now() })}\n\n`);
      
      const interval = setInterval(() => {
        try {
          const activity = generateRandomActivity();
          controller.enqueue(`data: ${JSON.stringify(activity)}\n\n`);
        } catch (e) {
          clearInterval(interval);
        }
      }, 5000);
      
      request.signal.addEventListener('abort', () => clearInterval(interval));
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
};

function generateRandomActivity(): LiveActivity {
  const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
  const detail = activityType.details[Math.floor(Math.random() * activityType.details.length)];
  const country = countries[Math.floor(Math.random() * countries.length)];
  
  return {
    id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    type: activityType.type as LiveActivity['type'],
    country,
    timestamp: Date.now(),
    details: detail,
    value: activityType.type === 'conversion' ? Math.round((50 + Math.random() * 200) * 100) / 100 : undefined
  };
}
