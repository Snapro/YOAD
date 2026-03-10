# YOAD Advertising & Digital Printing — Website

> **"make your ad."** — Lusaka's premier brand development company.

A production-ready static website for YOAD Advertising & Digital Printing Limited, built with plain HTML, CSS, and vanilla JavaScript. No build step required — publish the repo root directly to Netlify.

---

## ⚡ 60-Second Elevator Pitch

This site gives YOAD a polished digital home that matches the quality of their physical work. Visitors land on a bold, dark-themed homepage with a clear value proposition, browse seven service pages, explore a filterable portfolio, read a three-post blog, and convert via Netlify Forms — either through the floating quote modal or the contact page. Everything is mobile-first, keyboard-accessible, and SEO-ready out of the box.

---

## 📁 File Structure

```
yoad-website/
├── index.html                  ← Homepage
├── about.html                  ← About YOAD
├── contact.html                ← Contact page + form
├── portfolio.html              ← Portfolio grid with filter tabs
├── privacy.html                ← Privacy Policy
├── terms.html                  ← Terms of Service
├── site-config.json            ← Edit contact info, social links, GA4 ID here
├── netlify.toml                ← Security headers, cache rules, redirects
├── SOURCE_ATTRIBUTION.txt      ← Which copy came from the PDF
│
├── css/
│   └── styles.css              ← All styles (fully commented)
│
├── js/
│   └── main.js                 ← Navbar, modal, scroll reveal, forms
│
├── services/
│   ├── index.html              ← Services overview
│   ├── 3d-signs.html
│   ├── digital-printing.html
│   ├── graphic-design.html
│   ├── promotional-items.html
│   ├── wall-framing.html
│   ├── video-photography.html
│   └── website-design.html
│
├── blog/
│   ├── index.html              ← Blog listing
│   ├── brand-identity.html     ← Post 1
│   ├── digital-vs-offset-printing.html  ← Post 2
│   └── 3d-signage-business-case.html    ← Post 3
│
├── portfolio/
│   ├── case-signage.html       ← Case study: 3D Signage
│   ├── case-branding.html      ← Case study: Branding
│   └── case-printing.html      ← Case study: Digital Printing
│
└── assets/
    ├── images/
    │   └── portfolio/          ← Add project photos here (see below)
    ├── icons/
    │   └── favicon.ico         ← Replace with real favicon
    └── social/
        └── og-image.jpg        ← Replace with real OG image (1200×630px)
```

---

## 🚀 Netlify Deployment

### Option A — Connect GitHub (recommended, enables auto-deploys)

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.
3. Select your repo.
4. Set build settings:
   - **Build command:** *(leave blank)*
   - **Publish directory:** `.`
5. Click **Deploy site**.
6. Your site is live in ~30 seconds.

### Option B — Netlify CLI (deploy from local machine)

```bash
# Install CLI (once)
npm install -g netlify-cli

# Login
netlify login

# Deploy (from repo root)
netlify deploy --dir . --prod
```

### Option C — Drag & Drop

Zip the entire `yoad-website/` folder and drag it onto the Netlify dashboard at [app.netlify.com](https://app.netlify.com).

---

## 🌐 Custom Domain

1. In Netlify dashboard → **Domain settings** → **Add custom domain**.
2. Enter `yoad.co.zm` (or your domain).
3. Follow Netlify's DNS instructions (update your registrar's nameservers, or add a CNAME/A record).
4. Netlify provisions a free Let's Encrypt SSL certificate automatically.
5. Once HTTPS is confirmed, uncomment the `Strict-Transport-Security` header in `netlify.toml`.

---

## 📬 Netlify Forms Setup

Forms work automatically — Netlify detects them from `data-netlify="true"`.

**To receive email notifications:**
1. Deploy the site.
2. Go to **Netlify dashboard** → **Forms** → select `quote-request` or `contact`.
3. Click **Add notification** → **Email notification**.
4. Enter the recipient email address.

**To connect Zapier (e.g., for SendGrid):**
1. In Netlify Forms → **Add notification** → **Outgoing webhook**.
2. Paste your Zapier webhook URL.
3. In Zapier, create a Zap: Webhook trigger → SendGrid (or Gmail) action.

**To add more forms:** Copy the pattern from `contact.html` — include `data-netlify="true"`, a hidden `form-name` input, and a matching hidden `<form>` with `netlify` attribute for detection.

---

## ✏️ How to Change Copy

### Quick edits (contact, phone, social links)
Edit **`site-config.json`** — all key info is in one place. Then manually update the matching values in `index.html` footer, `contact.html`, and each page footer (search for the old value and replace).

> 💡 **Tip:** To automate this, use VS Code's "Find in Files" (`Ctrl+Shift+H`) to find and replace across all HTML files at once.

### Page copy
Each page is self-contained HTML. Open the relevant file in any text editor and edit the content inside the `<main>` element. Do not edit the `<head>`, navbar, footer, or modal — these are identical across pages.

### Adding a new service page
1. Duplicate `services/3d-signs.html`.
2. Update the `<title>`, `<meta name="description">`, breadcrumb, `<h1>`, and body copy.
3. Add a link to it in `services/index.html` and in the navbar dropdown in all pages.

### Adding a new blog post
1. Duplicate `blog/brand-identity.html`.
2. Update the front-matter metadata (title, date, author), `<title>`, `<h1>`, and article body.
3. Add a card for it in `blog/index.html` and `index.html` (blog preview section).

---

## 🖼️ Adding Real Photos

Replace placeholder divs in the portfolio grid:

```html
<!-- BEFORE (placeholder) -->
<div class="portfolio-card__placeholder" aria-label="Description">🔠</div>

<!-- AFTER (real photo) -->
<img
  src="assets/images/portfolio/project-name.jpg"
  srcset="assets/images/portfolio/project-name-800.jpg 800w,
          assets/images/portfolio/project-name-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Descriptive alt text for accessibility"
  loading="lazy"
  width="800"
  height="600"
/>
```

**Recommended image sizes:**
- Portfolio cards: 800×600px (4:3), 1200×900px for wide cards
- Hero/OG image: 1200×630px
- Blog thumbnails: 800×450px (16:9)
- Compress all images to WebP for best performance (use [squoosh.app](https://squoosh.app))

---

## 📊 Google Analytics (GA4)

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com).
2. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`).
3. Update `"ga4_id"` in `site-config.json`.
4. Uncomment the GA4 snippet in `<head>` of `index.html` (and paste into all other pages):

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your real Measurement ID.

---

## 🎨 Style Guide

### Colors
| Name | Hex | Usage |
|---|---|---|
| Charcoal | `#1A1A1A` | Primary background |
| Graphite | `#242424` | Card backgrounds |
| Orange | `#F05A28` | Brand accent, CTAs, highlights |
| Orange Light | `#FF7A47` | Hover state |
| Orange Dark | `#C8451C` | Hover on light backgrounds |
| Cream | `#F7F4EF` | Light section background |
| Muted | `#909090` | Secondary text |
| White | `#FFFFFF` | Primary text on dark |

### Fonts
- **Display / Headings:** Bebas Neue (Google Fonts) — bold, impactful
- **Body:** DM Sans (Google Fonts) — clean, readable at all sizes

### Buttons
```html
<button class="btn btn-primary">Primary CTA</button>
<button class="btn btn-outline">Secondary</button>
<button class="btn btn-outline-orange">Orange outline</button>
<button class="btn btn-sm">Small</button>
<button class="btn btn-lg">Large</button>
```

### Spacing scale
| Token | Value | CSS Variable |
|---|---|---|
| xs | 0.25rem | — |
| sm | 0.5rem | — |
| md | 1rem | — |
| lg | 1.5rem | `var(--gap)` |
| xl | 2.5rem | — |
| 2xl | 4rem | — |
| 3xl | 6rem | — |

---

## ♿ Accessibility Checklist

Before launch, verify:

- [ ] All images have descriptive `alt` attributes
- [ ] Color contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
  - Orange `#F05A28` on dark `#1A1A1A`: ✅ passes
  - Use [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker)
- [ ] Skip link works (Tab on page load → "Skip to main content")
- [ ] Modal is keyboard-accessible (Tab to cycle, Escape to close)
- [ ] Mobile menu is keyboard-accessible
- [ ] All interactive elements are reachable by keyboard
- [ ] Screen reader test: run NVDA (Windows) or VoiceOver (Mac/iOS)
- [ ] `lang="en"` on all `<html>` elements ✅
- [ ] All form inputs have associated `<label>` elements ✅
- [ ] ARIA roles applied to nav, main, footer, dialogs ✅

---

## 🌍 Sitemaps & Robots

Add a `sitemap.xml` at the repo root (Netlify does not generate one automatically for static sites). Example tool: [xml-sitemaps.com](https://www.xml-sitemaps.com).

Add a `robots.txt` at the repo root:

```
User-agent: *
Allow: /

Sitemap: https://yoad.co.zm/sitemap.xml
```

---

## 🔧 Environment Variables

This site has no server-side logic and requires no environment variables for basic operation. If you add a serverless function (e.g., Netlify Functions for a custom form handler), add variables in:

**Netlify dashboard → Site settings → Environment variables**

---

## 📋 Netlify Deployment Checklist

Copy and tick off before going live:

- [ ] Repo connected to Netlify with publish directory set to `.`
- [ ] Custom domain added and DNS configured
- [ ] HTTPS confirmed active (padlock in browser)
- [ ] Uncomment HSTS header in `netlify.toml`
- [ ] Form notifications configured for `quote-request` and `contact`
- [ ] GA4 Measurement ID inserted and uncommented
- [ ] Real logo replaced in all pages (currently text-based)
- [ ] Real OG image uploaded to `/assets/social/og-image.jpg`
- [ ] Real favicon uploaded to `/assets/icons/favicon.ico`
- [ ] Portfolio placeholder divs replaced with real photos
- [ ] Google Maps embed added to `contact.html`
- [ ] Social media URLs verified in `site-config.json`
- [ ] Privacy Policy and Terms reviewed by client
- [ ] `sitemap.xml` generated and submitted to Google Search Console
- [ ] `robots.txt` added to repo root

---

## 👋 Client Onboarding Guide

**Welcome to your new website!** Here's everything you need to know in one paragraph:

Your site is a plain-HTML static website hosted on Netlify — no databases, no WordPress, no plugins to update. To change the phone number or email address, open `site-config.json` and update the values, then also find-and-replace across all HTML files. To add a new blog post, duplicate any file inside the `blog/` folder, update the text, and add a card to `blog/index.html`. To add portfolio photos, drop your images into `assets/images/portfolio/` and replace the placeholder emoji `<div>` elements in `portfolio.html` with `<img>` tags. When you're done editing, commit and push to GitHub — Netlify will auto-deploy in about 30 seconds. If you get stuck, email us at yoadprints@gmail.com.

---

## 📞 Support

**YOAD Advertising and Digital Printing Limited**
Plot 10492, Olympia Park, Manchinchi Road, Lusaka, Zambia
📧 yoadprints@gmail.com
📞 +260 977 467 294 / +260 971 594 423
