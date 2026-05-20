import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import AnalyticsProvider from './components/seo/AnalyticsProvider.jsx';
import './i18n';
import './styles/global.css';
import './styles/rtl.css';

// Error boundary to surface runtime issues during development
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('App error:', error, info);
    this.setState({ info });
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          padding: 24,
          fontFamily: 'monospace',
          background: '#0F1515',
          color: '#F1ECE0',
          minHeight: '100vh'
        }}>
          <h1 style={{ color: '#C9A961' }}>App Error</h1>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#C26B5F' }}>
            {String(this.state.error?.stack || this.state.error)}
          </pre>
          {this.state.info?.componentStack && (
            <pre style={{ whiteSpace: 'pre-wrap', color: '#A8A096', marginTop: 16 }}>
              {this.state.info.componentStack}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <LanguageProvider>
            <CartProvider>
              <AnalyticsProvider />
              <App />
            </CartProvider>
          </LanguageProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
