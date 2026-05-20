import { createContext, useContext, useEffect, useReducer, useMemo, useState, useCallback } from 'react';

const STORAGE_KEY = 'yasbeads_cart';

const CartContext = createContext(null);

const initialState = { items: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { items: Array.isArray(action.payload?.items) ? action.payload.items : [] };

    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }
      const lineItem = {
        id: product.id,
        slug: product.slug,
        nameEn: product.nameEn,
        nameAr: product.nameAr,
        price: product.price,
        originalPrice: product.originalPrice ?? null,
        image: product.images?.[0] ?? '',
        quantity,
      };
      return { items: [...state.items, lineItem] };
    }

    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.id !== action.payload.id) };

    case 'UPDATE_QTY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return { items: state.items.filter((i) => i.id !== id) };
      }
      return {
        items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
      };
    }

    case 'CLEAR':
      return { items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'HYDRATE', payload: JSON.parse(raw) });
    } catch {
      /* ignore */
    } finally {
      setHydrated(true);
    }
  }, []);

  // persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const addItem = useCallback((product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  }, []);

  const updateQty = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totals = useMemo(() => {
    const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return { totalItems, totalPrice };
  }, [state.items]);

  const value = useMemo(
    () => ({
      items: state.items,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      isOpen,
      openCart,
      closeCart,
      ...totals,
    }),
    [state.items, addItem, removeItem, updateQty, clearCart, isOpen, openCart, closeCart, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
