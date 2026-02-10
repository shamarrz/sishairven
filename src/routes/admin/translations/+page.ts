/**
 * Translation Management Page Loader
 * 
 * @module routes/admin/translations/+page
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  // This page handles its own data fetching via client-side API calls
  // to support real-time updates and polling
  return {
    title: 'Translation Management | Hairven Admin'
  };
};
