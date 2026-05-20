/**
 * Analytics helper — thin wrapper around GA4 + Meta Pixel.
 * TODO: connect to API — replace stubs with real GA4 / Meta Pixel calls.
 *
 * Usage:
 *   import { track } from '../utils/analytics';
 *   track('add_to_cart', { item_id: 'p1', value: 350, currency: 'AED' });
 */

const IS_PROD = import.meta.env.PROD;

// ─── GA4 ────────────────────────────────────────────────────────────────────
function gtag(...args) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  } else if (IS_PROD) {
    console.warn('[Analytics] gtag not loaded');
  }
}

// ─── Meta Pixel ─────────────────────────────────────────────────────────────
function fbq(...args) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(...args);
  }
}

// ─── Public API ─────────────────────────────────────────────────────────────
export function trackPageView(path) {
  /* TODO: connect to API — send page_view to GA4 */
  gtag('event', 'page_view', { page_path: path });
  if (!IS_PROD) console.debug('[Analytics] page_view', path);
}

export function trackAddToCart(product, quantity = 1) {
  /* TODO: connect to API — send add_to_cart to GA4 + Meta Pixel */
  const payload = {
    currency: 'AED',
    value: product.price * quantity,
    items: [{ item_id: product.id, item_name: product.nameEn, price: product.price, quantity }],
  };
  gtag('event', 'add_to_cart', payload);
  fbq('track', 'AddToCart', { content_ids: [product.id], value: product.price, currency: 'AED' });
  if (!IS_PROD) console.debug('[Analytics] add_to_cart', payload);
}

export function trackBeginCheckout(items, totalPrice) {
  /* TODO: connect to API — send begin_checkout to GA4 + Meta Pixel */
  gtag('event', 'begin_checkout', { currency: 'AED', value: totalPrice });
  fbq('track', 'InitiateCheckout', { value: totalPrice, currency: 'AED' });
  if (!IS_PROD) console.debug('[Analytics] begin_checkout', { totalPrice });
}

export function trackPurchase(orderId, items, totalPrice) {
  /* TODO: connect to API — send purchase to GA4 + Meta Pixel */
  gtag('event', 'purchase', { transaction_id: orderId, currency: 'AED', value: totalPrice });
  fbq('track', 'Purchase', { value: totalPrice, currency: 'AED' });
  if (!IS_PROD) console.debug('[Analytics] purchase', { orderId, totalPrice });
}

export function trackViewItem(product) {
  /* TODO: connect to API — send view_item to GA4 */
  gtag('event', 'view_item', {
    currency: 'AED',
    value: product.price,
    items: [{ item_id: product.id, item_name: product.nameEn, price: product.price }],
  });
  if (!IS_PROD) console.debug('[Analytics] view_item', product.id);
}

export function trackNotifyMe(productId, email) {
  /* TODO: connect to API — send custom event to GA4 */
  gtag('event', 'notify_me', { product_id: productId });
  if (!IS_PROD) console.debug('[Analytics] notify_me', { productId, email });
}

export function trackSearch(query) {
  gtag('event', 'search', { search_term: query });
  if (!IS_PROD) console.debug('[Analytics] search', query);
}

// Generic escape hatch
export function track(eventName, params = {}) {
  gtag('event', eventName, params);
  if (!IS_PROD) console.debug('[Analytics]', eventName, params);
}
