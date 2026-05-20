/**
 * Performance monitoring utilities for Yas Beads
 * Tracks key metrics and provides optimization insights
 */

/**
 * Measure page load performance
 */
export const measurePageLoad = () => {
  return new Promise((resolve) => {
    if (window.performance && window.performance.measure) {
      // Measure navigation to DOM content loaded
      const navStart = performance.timing.navigationStart;
      const domContentLoaded = performance.timing.domContentLoadedEventEnd;
      const loadComplete = performance.timing.loadEventEnd;
      
      const metrics = {
        domContentLoaded: domContentLoaded - navStart,
        loadComplete: loadComplete - navStart,
        domInteractive: performance.timing.domInteractive - navStart,
      };
      
      resolve(metrics);
    } else {
      resolve({
        domContentLoaded: 0,
        loadComplete: 0,
        domInteractive: 0,
      });
    }
  });
};

/**
 * Track Core Web Vitals
 */
export const trackCoreWebVitals = () => {
  const vitals = {
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
  };

  // LCP (Largest Contentful Paint)
  if ('PerformanceObserver' in window) {
    const lcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        vitals.lcp = entry.startTime;
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  // FID (First Input Delay)
  if ('PerformanceObserver' in window) {
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        vitals.fid = entry.processingStart - entry.startTime;
      }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
  }

  // CLS (Cumulative Layout Shift)
  if ('PerformanceObserver' in window) {
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      vitals.cls = clsValue;
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }

  // TTFB (Time to First Byte)
  if (window.performance && window.performance.getEntriesByType) {
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0) {
      vitals.ttfb = navEntries[0].responseStart;
    }
  }

  return vitals;
};

/**
 * Optimize bundle size by lazy loading
 * @param {Function} importFunc - Dynamic import function
 * @returns {Promise} Lazy loaded module
 */
export const lazyLoad = (importFunc) => {
  return import(/* webpackChunkName: "lazy-[request]" */ importFunc);
};

/**
 * Preload critical resources
 * @param {string[]} resources - Array of resource URLs to preload
 */
export const preloadResources = (resources) => {
  resources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    document.head.appendChild(link);
  });
};

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Check if user prefers reduced motion
 * @returns {boolean} True if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Measure image load performance
 * @param {HTMLImageElement} img - Image element
 * @returns {Promise} Resolves with load time
 */
export const measureImageLoad = (img) => {
  return new Promise((resolve) => {
    const startTime = performance.now();
    
    if (img.complete) {
      resolve(performance.now() - startTime);
      return;
    }
    
    img.addEventListener('load', () => {
      resolve(performance.now() - startTime);
    });
    
    img.addEventListener('error', () => {
      resolve(null);
    });
  });
};

/**
 * Optimize animations based on user preferences
 * @param {Object} options - Animation options
 * @param {number} options.duration - Animation duration
 * @param {string} options.ease - Easing function
 * @returns {Object} Optimized animation options
 */
export const optimizeAnimation = ({ duration, ease }) => {
  if (prefersReducedMotion()) {
    return {
      duration: 0,
      ease: 'linear',
    };
  }
  
  return {
    duration,
    ease,
  };
};

export default {
  measurePageLoad,
  trackCoreWebVitals,
  lazyLoad,
  preloadResources,
  debounce,
  throttle,
  prefersReducedMotion,
  measureImageLoad,
  optimizeAnimation,
};
