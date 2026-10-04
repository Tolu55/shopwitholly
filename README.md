# ShopWithOlly — Haute Fine Female Jewelry Atelier

A full-stack luxury female jewelry e-commerce web application engineered with **Next.js (App Router)**, **TypeScript**, bespoke **Vanilla CSS**, **Supabase / Neon PostgreSQL**, **Mailgun Email API**, and **Google Cloud Console OAuth 2.0**.

---

## 💎 Exclusive Jewelry Collections
- **Earrings**: Baroque freshwater pearls with diamond halo drops, twisted 18k gold huggie hoops.
- **Necklaces**: Natural Colombian emerald halo solitaires, dual layered herringbone and paperclip chokers.
- **Wristwatches**: Swiss-quartz movement timepieces in 18k rose gold with mother-of-pearl dials and noir onyx mesh.
- **Bracelets**: Scintillating bezel-set diamond tennis bracelets, architectural sculpted gold wave cuffs.

---

## 🚀 Getting Started

### 1. Install & Run Locally
```bash
# In project directory:
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the boutique.

### 2. Complimentary Promo Codes
- `OLLYLUXE10` — 10% off entire order
- `WELCOME15` — 15% off entire order
- `DIAMOND50` — $50 instant discount

---

## ☁️ Cloud Architecture & Integration

### A. Supabase / Neon Database Persistence
1. Navigate to [Supabase](https://supabase.com) or [Neon](https://neon.tech) and open the **SQL Editor**.
2. Run the migration script located at `supabase/schema.sql`.
3. Add your keys to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```
*Note: An automatic local store fallback is active so the store works completely out of the box even before database keys are entered.*

### B. Mailgun Order Confirmation Emails
1. Sign in to [Mailgun](https://app.mailgun.com).
2. Grab your domain and API key.
3. Configure in `.env.local`:
```env
MAILGUN_API_KEY=key-your-api-key
MAILGUN_DOMAIN=mg.yourdomain.com
MAILGUN_FROM_EMAIL=ShopWithOlly Orders <orders@mg.yourdomain.com>
```
*Includes a built-in interactive Mailgun email receipt previewer on the order confirmation page.*

### C. Google Cloud Console Authentication
1. Go to [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials).
2. Configure OAuth Consent Screen for **ShopWithOlly**.
3. Create an **OAuth 2.0 Client ID (Web Application)**.
4. Set Authorized Redirect URI:
   `https://<your-supabase-project>.supabase.co/auth/v1/callback`
5. Enable Google in your Supabase Auth provider dashboard.
