import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../../utils/analytics';

/**
 * AnalyticsProvider — fires page_view on every route change.
 * Mount once inside BrowserRouter.
 *
 * TODO: connect to API — add GA4 measurement ID and Meta Pixel ID to .env
 * VITE_GA4_ID=G-XXXXXXXXXX
 * VITE_META_PIXEL_ID=XXXXXXXXXX
 */
export default function AnalyticsProvider() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}
