/**
 * Image optimization utilities for Yas Beads
 * Provides optimized image URLs and lazy loading utilities
 */

/**
 * Generate optimized image URL using placeholder service
 * @param {string} src - Original image URL or path
 * @param {Object} options - Optimization options
 * @param {number} options.width - Target width
 * @param {number} options.height - Target height
 * @param {string} options.quality - Quality (1-100)
 * @param {string} options.format - Output format (webp, jpg, png)
 * @returns {string} Optimized image URL
 */
export const optimizeImage = (src, options = {}) => {
  const { width, height, quality = 80, format = 'webp' } = options;

  // If it's a placeholder image from placehold.co, keep it as is
  if (src.includes('placehold.co')) {
    return src;
  }

  // If it's a Shopify CDN image, use Shopify's optimization
  if (src.includes('cdn.shopify.com')) {
    const url = new URL(src);
    
    // Add width parameter if not present
    if (width) {
      url.searchParams.set('width', width.toString());
      url.searchParams.set('height', height?.toString() || width.toString());
      url.searchParams.set('crop', 'center');
    }
    
    // Add quality parameter
    url.searchParams.set('quality', quality.toString());
    
    // Add format for modern browsers
    if (format === 'webp') {
      url.searchParams.set('format', 'webp');
    }
    
    return url.toString();
  }

  // For local images or other sources, return as-is
  // The browser will handle optimization through lazy loading
  return src;
};

/**
 * Generate responsive image srcset
 * @param {string} baseSrc - Base image URL
 * @param {number[]} sizes - Array of widths for srcset
 * @returns {string} Srcset string
 */
export const generateSrcSet = (baseSrc, sizes = [400, 600, 800, 1000, 1200]) => {
  return sizes
    .map((size) => `${optimizeImage(baseSrc, { width: size })} ${size}w`)
    .join(', ');
};

/**
 * Generate responsive image sources for picture element
 * @param {string} baseSrc - Base image URL
 * @param {Object} options - Optimization options
 * @returns {Array} Array of source objects
 */
export const generatePictureSources = (baseSrc, options = {}) => {
  const sources = [];
  
  // WebP source
  sources.push({
    type: 'image/webp',
    srcset: generateSrcSet(baseSrc, [400, 600, 800, 1000, 1200]),
    sizes: options.sizes || '(max-width: 768px) 100vw, 50vw',
  });
  
  // JPEG source as fallback
  sources.push({
    type: 'image/jpeg',
    srcset: generateSrcSet(baseSrc, [400, 600, 800, 1000, 1200]),
    sizes: options.sizes || '(max-width: 768px) 100vw, 50vw',
  });
  
  return sources;
};

/**
 * Preload critical images
 * @param {string[]} imageUrls - Array of image URLs to preload
 */
export const preloadImages = (imageUrls) => {
  imageUrls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimizeImage(url, { format: 'webp' });
    document.head.appendChild(link);
    
    // Remove after preload
    setTimeout(() => {
      document.head.removeChild(link);
    }, 5000);
  });
};

/**
 * Lazy load images in viewport
 * @param {string} selector - CSS selector for images to lazy load
 */
export const lazyLoadImages = (selector = 'img') => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll(selector).forEach((img) => {
      if (img.dataset.src) {
        img.classList.add('lazy');
        imageObserver.observe(img);
      }
    });
  }
};

export default {
  optimizeImage,
  generateSrcSet,
  generatePictureSources,
  preloadImages,
  lazyLoadImages,
};
