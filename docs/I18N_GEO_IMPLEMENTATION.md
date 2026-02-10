# Geo-Localization & i18n Implementation Guide

**Phase 1: Foundation** | Status: ✅ Complete | Date: 2026-02-10

---

## Overview

This implementation provides comprehensive internationalization (i18n) and geo-localization capabilities for the Hairven by Elyn website.

### Key Features

- 🌍 **Geo Detection**: Automatic location detection via Cloudflare/Vercel headers
- 🌐 **Multi-Language Support**: English, Spanish, French (extensible)
- 🔄 **Language Switching**: Seamless URL-based language switching
- 📱 **Responsive**: Mobile-friendly language selector
- 🔍 **SEO-Ready**: Hreflang tags, canonical URLs, structured data
- 🍪 **Persistence**: Language/geo preferences stored in cookies

---

## Architecture

```
src/
├── lib/
│   ├── i18n/
│   │   ├── index.ts              # i18n initialization & stores
│   │   ├── geo.ts                # Geo detection utilities
│   │   └── locales/
│   │       ├── en/               # English translations
│   │       │   ├── common.json
│   │       │   ├── blog.json
│   │       │   └── shop.json
│   │       ├── es/               # Spanish translations
│   │       └── fr/               # French translations
│   ├── types/
│   │   └── geo.ts                # TypeScript types & regional config
│   ├── stores/
│   │   └── geo.ts                # Svelte stores for geo data
│   └── components/
│       ├── LanguageSwitcher.svelte
│       └── SEO.svelte            # SEO with hreflang
├── hooks.server.ts               # Server-side geo detection
├── params/lang.ts                # URL param matcher
└── routes/
    ├── +layout.svelte            # Root layout with i18n init
    ├── +layout.server.ts         # Pass geo to client
    └── (lang)/                   # Language-prefixed routes (optional)
```

---

## How It Works

### 1. Server-Side Geo Detection (`hooks.server.ts`)

Every incoming request is processed to detect:
- Country (from CF-IPCountry header or MaxMind)
- Language (from Accept-Language header)
- Region, City, Timezone

```typescript
// Detected geo is available in event.locals.geo
export const handle = async ({ event, resolve }) => {
  const geo = detectGeoFromHeaders(event.request.headers);
  event.locals.geo = geo;
  event.locals.lang = determineLanguage(geo, cookies);
  // ...
};
```

### 2. Language Negotiation

Language selection priority:
1. URL prefix (e.g., `/es/blog` → Spanish)
2. Stored cookie preference
3. Accept-Language header
4. Geo-based default
5. Fallback to English

### 3. Client-Side Initialization

```typescript
// +layout.svelte
onMount(async () => {
  // Initialize i18n with detected language
  await initializeI18n($page.data.lang);
  
  // Set up geo store
  initializeGeoStore($page.data.geo);
});
```

### 4. URL Structure

| URL | Language | Description |
|-----|----------|-------------|
| `/blog` | English | Default (no prefix) |
| `/es/blog` | Spanish | Spanish version |
| `/fr/blog` | French | French version |

### 5. Language Switching

```svelte
<LanguageSwitcher />
<!-- Dropdown with flags, auto-updates URL -->
```

---

## Usage Examples

### Using Translations in Components

```svelte
<script>
  import { _ } from 'svelte-i18n';
</script>

<h1>{$_('nav.home')}</h1>
<p>{$_('blog.read_time', { values: { minutes: 5 } })}</p>
```

### Accessing Geo Data

```svelte
<script>
  import { geoStore, regionalConfigStore } from '$lib/stores/geo';
</script>

<p>Country: {$geoStore.country}</p>
<p>Currency: {$geoStore.currency}</p>
<p>Amazon Tag: {$regionalConfigStore.amazonTag}</p>
```

### SEO Component with i18n

```svelte
<script>
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
  title="Best Hair Dryers 2025"
  description="Professional reviews..."
  type="article"
  published="2025-01-15"
/>
<!-- Auto-generates hreflang tags -->
```

### Creating Language-Specific Routes

Routes automatically support language prefixes via the `lang` param matcher:

```typescript
// src/routes/[lang=lang]/blog/+page.svelte
// Matches: /es/blog, /fr/blog
// lang parameter is validated against supported languages
```

---

## Adding a New Language

### 1. Enable in Config

```typescript
// src/lib/types/geo.ts
export const supportedLanguages = [
  // ... existing
  { code: 'de', name: 'Deutsch', nameEn: 'German', flag: '🇩🇪', dir: 'ltr', enabled: true },
];
```

### 2. Create Translation Files

```bash
mkdir -p src/lib/i18n/locales/de
cp src/lib/i18n/locales/en/*.json src/lib/i18n/locales/de/
# Edit and translate
```

### 3. Register in i18n

```typescript
// src/lib/i18n/index.ts
register('de', () => import('./locales/de/common.json'));
register('de', () => import('./locales/de/blog.json'));
register('de', () => import('./locales/de/shop.json'));
```

### 4. Add Regional Config (if applicable)

```typescript
// src/lib/types/geo.ts
export const regionalConfig = {
  // ... existing
  'DE': {
    lang: 'de',
    currency: 'EUR',
    amazonTag: 'hairvende-21',
    amazonDomain: 'amazon.de',
    affiliateSupported: true,
    displayName: 'Germany',
  },
};
```

---

## Configuration

### Environment Variables

```bash
# Optional: MaxMind for enhanced geo detection
MAXMIND_LICENSE_KEY=xxx

# Optional: Set default region
DEFAULT_COUNTRY=US
DEFAULT_LANGUAGE=en
```

### Regional Config

All regional settings (language, currency, Amazon tags) are in:
- `src/lib/types/geo.ts` → `regionalConfig`

---

## Testing

### Test Geo Detection

```bash
# Simulate different countries with curl
curl -H "CF-IPCountry: ES" https://sishairven.com

# Check response headers
curl -I -H "CF-IPCountry: FR" https://sishairven.com
```

### Test Language Switching

1. Visit `/` → Should detect language
2. Click language switcher → URL should update
3. Refresh page → Language should persist
4. Check `lang_pref` cookie

### Test SEO

```bash
# Verify hreflang tags
curl -s https://sishairven.com/blog | grep hreflang

# Check canonical URL
curl -s https://sishairven.com/es/blog | grep canonical
```

---

## Integration with Clika Evasion

The geo system enhances evasion by:

1. **Traffic Distribution**: Route clicks through geo-matched proxies
2. **Temporal Alignment**: Schedule clicks during local business hours
3. **Language Matching**: Browser language matches proxy location

```typescript
// Example: Use geo data for Clika proxy selection
import { geoStore } from '$lib/stores/geo';

$: proxyCriteria = {
  country: $geoStore.country,
  region: $geoStore.region,
  timezone: $geoStore.timezone,
};
```

---

## Performance Considerations

- Translations are **lazy-loaded** (only loaded when needed)
- Geo detection happens at the **edge** (Cloudflare) - < 1ms
- Cookies persist preferences (no re-detection on every request)
- Components use Svelte stores for reactive updates

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Language not switching | Check `lang_pref` cookie, verify URL prefix |
| Geo showing US default | Check CF-IPCountry header is present |
| Translations not loading | Verify JSON files are valid |
| SEO tags missing | Ensure SEO component is imported and used |

---

## Next Steps

1. **Translate Content**: Add translations for all blog posts
2. **Currency Display**: Show local prices based on geo
3. **Amazon Geo-Redirect**: Auto-redirect to local Amazon store
4. **Clika Integration**: Connect proxy selection to geo data

---

## References

- [Svelte-i18n Documentation](https://github.com/kaisermann/svelte-i18n)
- [SvelteKit Advanced Routing](https://kit.svelte.dev/docs/advanced-routing)
- [Google Multilingual SEO](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
