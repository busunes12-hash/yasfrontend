# Yas Beads — Frontend

Modern, high-converting bilingual (Arabic RTL / English LTR) ecommerce frontend for **Yas Beads** (ياس بيدز), a UAE luxury misbaha brand.

## Stack

- **React** 18 + **Vite**
- **Tailwind CSS** 3 (custom brand tokens)
- **React Router v6** (client-side routing)
- **i18next + react-i18next** (Arabic default, English secondary)
- **Framer Motion** (page & section animations)
- **Axios** (ready for backend integration)

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Scripts

| Command          | What it does                  |
| ---------------- | ----------------------------- |
| `npm run dev`    | Vite dev server (port 5173)   |
| `npm run build`  | Production build → `dist/`    |
| `npm run preview`| Preview the production build  |

## Project structure

```
src/
├── assets/            fonts, icons, placeholder images
├── components/
│   ├── layout/        AnnouncementBar, Navbar, Footer, CartDrawer, Layout
│   ├── ui/            Button, Badge, Card, Spinner, Modal, NotifyMeModal
│   └── sections/      Hero, TrustBar, CollectionsGrid, CollectionCard,
│                      ProductCard, ProductGrid, SaffronFeature,
│                      Testimonials, GiftBanner, Newsletter
├── pages/             Home, Shop, ProductDetail, Cart, Checkout,
│                      About, Contact, NotFound
├── context/           LanguageContext, CartContext
├── hooks/             useCart, useProducts, useLocalStorage
├── i18n/              en.json, ar.json, init
├── styles/            global.css, rtl.css
├── utils/             cn, formatPrice
├── data/              products.js, collections.js (mock data)
├── App.jsx
└── main.jsx
```

## Brand tokens

Defined in `tailwind.config.js`:

| Token                | Value                                  |
| -------------------- | -------------------------------------- |
| `primary`            | `#8B6914` (warm gold / amber)          |
| `primary.dark`       | `#6B4F10`                              |
| `accent`             | `#C4A35A` (light gold)                 |
| `background`         | `#FAF7F2` (warm off-white)             |
| `surface`            | `#FFFFFF`                              |
| `textPrimary`        | `#1A1A1A`                              |
| `textSecondary`      | `#6B6B6B`                              |
| `border`             | `#E8DDD0`                              |
| `success`            | `#2D6A4F`                              |
| `badgeRed`           | `#C0392B`                              |
| `deepBrown`          | `#3D2B1F` (saffron section)            |
| `shadow.warm`        | `0 4px 24px rgba(139,105,20,0.08)`     |
| `shadow.warmLg`      | `0 8px 32px rgba(139,105,20,0.14)`     |

## Bilingual / RTL

- `LanguageContext` toggles between `ar` and `en`, persists in `localStorage`, and updates `<html dir>` and `<html lang>`.
- All translation keys live in `src/i18n/{en,ar}.json`.
- Start language is **Arabic (RTL)** as the brand's primary market.

## State

- **CartContext** — `useReducer` with localStorage persistence. Exposes
  `items`, `addItem`, `removeItem`, `updateQty`, `clearCart`, `totalItems`,
  `totalPrice`, plus `isOpen / openCart / closeCart` for the slide-out drawer.
- **LanguageContext** — `lang`, `toggleLang`, `setLanguage`, `isRTL`.

## Backend connection points

Search for `TODO: connect to API` to find the spots wired for the upcoming
Node.js backend:

- `Newsletter.jsx` — email subscription
- `NotifyMeModal.jsx` — back-in-stock notifications
- `Checkout.jsx` — order placement
- `Contact.jsx` — contact form
- `useProducts.js` — product list / filters

## Mock data

`src/data/products.js` and `src/data/collections.js` ship with realistic
Yas Beads inventory (10 products, 6 collections) including saffron, amber,
professional, natural, fragrant, and accessories ranges. Several products
are flagged `isSoldOut: true` to demonstrate the **Notify Me** flow.

## Accessibility

- Semantic HTML (`header`, `main`, `footer`, `nav`, `section`, `figure`)
- ARIA labels on icon-only controls
- Keyboard-focusable buttons & inputs with visible focus rings
- Modal traps body scroll & closes on Escape

## License

Internal — Yas Beads © 2026.
