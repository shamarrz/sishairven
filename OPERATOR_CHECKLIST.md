# Operator Registration Checklist

Complete these steps to activate monetization on sishairven.com

---

## 1. Google Search Console ⭐ PRIORITY

**Why:** Required for AdSense approval and SEO visibility

**Steps:**
1. Go to https://search.google.com/search-console
2. Click "Add Property" → "Domain"
3. Enter: `sishairven.com`
4. **Verification method:** DNS TXT record (recommended for SvelteKit)
   - Copy the TXT record provided by Google
   - Add to your DNS provider (Cloudflare/Namecheap/etc.)
   - Wait for propagation (up to 24 hours)
5. Submit sitemap: `https://sishairven.com/sitemap.xml`

**Verification file location:** Already exists at `/robots.txt` and `/sitemap.xml`

---

## 2. Google Analytics 4 (GA4)

**Why:** Track visitor behavior and traffic sources

**Steps:**
1. Go to https://analytics.google.com/
2. Click "Create Property" → "Web"
3. Property name: "Sishairven"
4. Time zone: America/New_York
5. Currency: USD
6. Add data stream: `https://sishairven.com`
7. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

**Where to paste:**
```bash
# In your .env file
PUBLIC_GA4_ID=G-XXXXXXXXXX
```

**Verify:** Script only loads in production (check browser dev tools Network tab)

---

## 3. Google AdSense

**Why:** Display ads and earn revenue

**Prerequisites:**
- ✅ Age 18+
- ✅ Valid website with original content
- ✅ Privacy Policy (done)
- ✅ About page (done)
- ✅ Contact page (done)
- ✅ 10-20 pages of content (blog helps here)

**Steps:**
1. Go to https://www.google.com/adsense/start
2. Sign up with your Google account
3. Enter site URL: `https://sishairven.com`
4. Complete the application with accurate information
5. Wait for approval (1-14 days)

**After approval:**
1. Get your **Publisher ID** (format: `ca-pub-XXXXXXXXXXXXXXXX`)
2. Paste in `.env`:
```bash
PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

**Note:** Auto-ads are enabled. AdSense will automatically place ads. Start with minimal placements and adjust as needed.

---

## 4. Amazon Associates

**Why:** Earn 4-10% commission on product sales

**Steps:**
1. Go to https://affiliate-program.amazon.com/
2. Click "Join Now for Free"
3. Create account with your info
4. Enter website: `https://sishairven.com`
5. Complete profile:
   - Niche: Beauty/Salon
   - Topics: Hair care, styling tools, beauty products
6. Wait for approval (1-3 business days)

**After approval:**
1. Go to your Amazon Associates dashboard
2. Find your **Store ID** / **Tracking ID** (format: `yourtag-20`)
3. Paste in `.env`:
```bash
PUBLIC_AMAZON_ASSOC_TAG=yourtag-20
```

**Update product links:**
- Current products in `src/lib/utils/amazon.ts` use placeholder ASINs
- Replace with real Amazon product ASINs from your Associates dashboard
- Generate links via: Products → Link to Amazon

---

## 5. Email Provider (Optional - Phase 2)

**Recommended:** Brevo (formerly Sendinblue) - free up to 300 emails/day

**Steps:**
1. Sign up at https://www.brevo.com/
2. Create a contact list
3. Get API key
4. Update `src/routes/api/subscribe/+server.ts` with integration code

**Alternative:** Mailchimp, ConvertKit, or Klaviyo

---

## Summary Table

| Service | What to Get | Where to Paste | Status |
|---------|-------------|----------------|--------|
| Google Search Console | Domain verification | DNS TXT record | ⬜ |
| GA4 | Measurement ID (G-XXX) | `PUBLIC_GA4_ID` in .env | ⬜ |
| AdSense | Publisher ID (ca-pub-XXX) | `PUBLIC_ADSENSE_CLIENT` in .env | ⬜ |
| Amazon Associates | Tracking ID (tag-20) | `PUBLIC_AMAZON_ASSOC_TAG` in .env | ⬜ |
| Email Provider | API Key | `src/routes/api/subscribe/+server.ts` | ⬜ (Optional) |

---

## Deployment Checklist

Before going live:

- [ ] Copy `.env.example` to `.env` and fill in all values
- [ ] Update Amazon ASINs in `src/lib/utils/amazon.ts` with real products
- [ ] Build and test locally: `npm run build && npm run preview`
- [ ] Verify all pages load correctly
- [ ] Check affiliate links work
- [ ] Deploy to server
- [ ] Add DNS records for Search Console verification
- [ ] Submit sitemap to Search Console
- [ ] Apply for AdSense
- [ ] Wait for AdSense approval before expecting ads to show

---

## Post-Launch Monitoring

**Week 1:**
- Check Google Search Console for indexing status
- Verify GA4 is receiving data
- Test all affiliate links

**Week 2-4:**
- Monitor Core Web Vitals in Search Console
- Check for crawl errors
- Apply for AdSense if not done

**Month 2+:**
- Review Amazon Associates performance
- Add more blog posts
- Optimize based on analytics data

---

## Support

For technical issues with the code, refer to:
- `IMPLEMENTATION_SUMMARY.md` - Technical details
- SvelteKit docs: https://kit.svelte.dev/
- Amazon Associates help: https://affiliate-program.amazon.com/help
