import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Spinner from './components/ui/Spinner';

// Eager: Home (LCP route). Everything else splits into its own chunk so the
// homepage parses & paints faster, and the main thread stays responsive.
const Shop          = lazy(() => import('./pages/Shop'));
const Sale          = lazy(() => import('./pages/Sale'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart          = lazy(() => import('./pages/Cart'));
const Checkout      = lazy(() => import('./pages/Checkout'));
const About         = lazy(() => import('./pages/About'));
const Contact       = lazy(() => import('./pages/Contact'));
const NotFound      = lazy(() => import('./pages/NotFound'));
const Privacy       = lazy(() => import('./pages/policies/Privacy'));
const Shipping      = lazy(() => import('./pages/policies/Shipping'));
const Returns       = lazy(() => import('./pages/policies/Returns'));

const PageFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <Spinner />
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/shop"
          element={
            <Suspense fallback={<PageFallback />}>
              <Shop />
            </Suspense>
          }
        />
        <Route
          path="/sale"
          element={
            <Suspense fallback={<PageFallback />}>
              <Sale />
            </Suspense>
          }
        />
        <Route
          path="/product/:slug"
          element={
            <Suspense fallback={<PageFallback />}>
              <ProductDetail />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<PageFallback />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <Suspense fallback={<PageFallback />}>
              <Checkout />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<PageFallback />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<PageFallback />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="/policies/privacy"
          element={
            <Suspense fallback={<PageFallback />}>
              <Privacy />
            </Suspense>
          }
        />
        <Route
          path="/policies/shipping"
          element={
            <Suspense fallback={<PageFallback />}>
              <Shipping />
            </Suspense>
          }
        />
        <Route
          path="/policies/returns"
          element={
            <Suspense fallback={<PageFallback />}>
              <Returns />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
