# Multi-Language Support Implementation

This document describes the multi-language (internationalization) implementation for the Skyshore E-commerce site.

## Supported Languages

- **English (en)** - Default language
- **Spanish (es)** - Español
- **French (fr)** - Français
- **Arabic (ar)** - العربية (with RTL support)
- **Chinese (zh)** - 中文

## Implementation Details

### 1. Technology Stack
- **Next.js 15** with built-in internationalization
- **next-intl** library for React components
- **Locale-based routing** (`/en/`, `/es/`, `/fr/`, `/ar/`, `/zh/`)

### 2. File Structure
```
src/
├── app/
│   ├── [locale]/           # Locale-based pages
│   │   ├── layout.tsx      # Locale layout with NextIntlClientProvider
│   │   ├── page.tsx        # Home page
│   │   ├── cart/           # Cart page
│   │   ├── checkout/       # Checkout page
│   │   └── ...             # Other pages
│   └── layout.tsx          # Root layout (legacy)
├── components/
│   ├── LanguageSwitcher.tsx # Language selection component
│   ├── Header.tsx          # Updated with translations
│   └── SideCart.tsx        # Updated with translations
├── middleware.ts           # Locale routing middleware
└── i18n.ts                # Internationalization configuration

messages/                   # Translation files
├── en.json                # English translations
├── es.json                # Spanish translations
├── fr.json                # French translations
├── ar.json                # Arabic translations
└── zh.json                # Chinese translations
```

### 3. Key Features

#### Language Switcher
- Located in the header navigation
- Dropdown with flag icons and language names
- Automatic URL routing to selected language
- Active language highlighting

#### RTL Support
- Arabic language automatically switches to RTL layout
- CSS adjustments for right-to-left text direction
- Proper dropdown positioning for RTL languages

#### Translation System
- Structured JSON files for each language
- Organized by sections (navigation, cart, forms, etc.)
- Easy to maintain and extend

### 4. Usage Examples

#### In Components
```tsx
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations('navigation');
  
  return (
    <Link href="/">{t('home')}</Link>
  );
}
```

#### Translation File Structure
```json
{
  "navigation": {
    "home": "Home",
    "shop": "Shop",
    "about": "About Us"
  },
  "cart": {
    "title": "Shopping Cart",
    "empty": "Your cart is empty"
  }
}
```

### 5. Adding New Languages

1. Add language code to `src/i18n.ts`:
```ts
const locales = ['en', 'es', 'fr', 'ar', 'zh', 'de']; // Add 'de'
```

2. Update middleware in `src/middleware.ts`:
```ts
locales: ['en', 'es', 'fr', 'ar', 'zh', 'de'],
matcher: ['/', '/(es|fr|ar|zh|de)/:path*']
```

3. Create translation file `messages/de.json`
4. Add language option to `LanguageSwitcher.tsx`

### 6. Adding New Translations

1. Add translation keys to all language files
2. Use the key in components with `useTranslations()`
3. Test all supported languages

### 7. URL Structure

- **English (default)**: `/`, `/cart`, `/checkout`
- **Spanish**: `/es/`, `/es/cart`, `/es/checkout`
- **French**: `/fr/`, `/fr/cart`, `/fr/checkout`
- **Arabic**: `/ar/`, `/ar/cart`, `/ar/checkout`
- **Chinese**: `/zh/`, `/zh/cart`, `/zh/checkout`

### 8. Browser Support

- Automatic language detection (future enhancement)
- Manual language selection via switcher
- URL-based language routing
- Persistent language selection (future enhancement)

## Development Notes

- All text content should use translation keys
- Images and icons should be language-agnostic or localized
- Date/time formats should be localized per language
- Currency formatting is handled per locale
- Form validation messages should be translated

## Testing

To test the multi-language implementation:

1. Start the development server: `npm run dev`
2. Navigate to different language URLs:
   - English: `http://localhost:3000`
   - Spanish: `http://localhost:3000/es`
   - French: `http://localhost:3000/fr`
   - Arabic: `http://localhost:3000/ar`
   - Chinese: `http://localhost:3000/zh`
3. Use the language switcher in the header
4. Verify all text content is translated
5. Check RTL layout for Arabic

