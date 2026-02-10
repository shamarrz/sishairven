// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    
    interface Locals {
      /**
       * Geographic location data detected from request
       * Populated by hooks.server.ts geo detection
       */
      geo: import('$lib/types/geo').GeoData;
      
      /**
       * Detected/preferred language code
       * Based on geo, cookies, and Accept-Language header
       */
      lang: string;
      
      /**
       * User session data (if authenticated)
       */
      user?: {
        id: string;
        email: string;
        isAdmin: boolean;
      };
    }
    
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
