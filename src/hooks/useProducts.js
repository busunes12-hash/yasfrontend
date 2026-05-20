import { useMemo } from 'react';
import {
  products as allProducts,
  getProduct,
  getProductsByCollection,
  getBestsellers,
  getRelatedProducts,
} from '../data/products';

/**
 * Lightweight wrapper hook around the mock product data.
 * Will be swapped for real API calls later.
 */
export function useProducts(filter = {}) {
  /* TODO: connect to API — replace this with axios call to /api/products */
  const products = useMemo(() => {
    let list = [...allProducts];
    if (filter.collection) {
      list = list.filter((p) => p.collection === filter.collection);
    }
    if (filter.tag) {
      list = list.filter((p) => p.tags?.includes(filter.tag));
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.nameEn.toLowerCase().includes(q) ||
          p.nameAr.includes(filter.search) ||
          p.descriptionEn.toLowerCase().includes(q)
      );
    }
    return list;
  }, [filter.collection, filter.tag, filter.search]);

  return {
    products,
    bestsellers: getBestsellers(),
    getProduct,
    getProductsByCollection,
    getRelatedProducts,
    loading: false,
    error: null,
  };
}
