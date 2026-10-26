# Pitcher billing activation

Local implementation: one US$10 USD monthly subscription for Word/PDF exports and workspace customisation. Free users can edit and preview. The separate branded-template setup enquiry links to the portfolio contact section; no price or charge is implied.

## Before enabling

1. The confirmed plan is **US$10/month**, replacing the earlier £10 proposal because GBP product pricing is not supported. Checkout validates USD 10.00 and a one-month cadence and fails closed otherwise.
2. In the existing merchant account, create a **new Pitcher product**, not an edit to another app's product. Use a dedicated API key if available.
3. Add private Netlify function environment values (never commit them):
   - BACHS_API_KEY
   - BACHS_PITCHER_PRODUCT_ID
   - BACHS_ENVIRONMENT: sandbox initially; live only after verification
   - BACHS_WEBHOOK_SECRET: the signing secret of a **new** webhook endpoint
4. Register the new webhook endpoint: `https://reine.vibesfactory.co/pitcher/api/billing/webhook`. Keep the other app's existing endpoint. Subscribe to checkout payment, invoice payment and subscription lifecycle events. Validate actual event payloads against this integration in sandbox before live activation.
5. Webhook reconciliation must see the checkout reference and subscription identity. It always reads the provider subscription again, verifies the customer against the signed-in account and only grants access until the provider's paid period end. Redirects do not grant access. Events from another app are ignored unless they match a stored Pitcher checkout/subscription mapping.
6. Set PITCH_SERVER_DOCUMENTS=true in sandbox/staging. The private renderer downloads the pinned official Chromium 153 x64 pack on cold starts. Override PITCH_CHROMIUM_PACK with a trusted private deployment URL if needed. Verify Netlify cold-start time, fonts, both document layouts, custom templates, all selected artists, Word, PDF and image previews. Public previews have a small shared rate budget; authenticated users have a per-account budget.
7. Test purchase, renewal, period-end cancellation, immediate cancellation, expired access, duplicate/out-of-order webhooks, checkout retries and billing portal. An uncertain checkout remains pending to avoid duplicate sessions: reconcile the stored reference at Bachs before clearing it.
8. Only then set PITCH_PAYWALL_ENABLED=true and deploy. This restricts branding changes, extra workspaces and template access to paid users; artists and free previews stay editable. Owner access remains exempt. The server document route always requires a paid record for downloads, so enable the renderer and paywall together once checkout is ready.

## Current state — 20 October 2026

Live US$10/month subscriptions are active. PITCH_SERVER_DOCUMENTS and PITCH_PAYWALL_ENABLED are true. Owner access remains exempt. Temporary setup is closed with PITCH_BILLING_SETUP_ENABLED=false.

The live API key remains a secret in Netlify environment settings. The separate Pitcher product ID and webhook signing secret are stored server-side in the private `reine-pitch-production` Blobs store under `billing/config/live`; they are never returned to browser clients. The other app's product and endpoint were not edited.

Provider checks confirmed an open unpaid checkout, USD 10.00, monthly cadence, and an enabled webhook endpoint. Cloud tests confirmed Word/PDF rendering, image-only chosen-artist demo previews, owner Four10 exports, anonymous export denial, and rejection of unsigned webhooks. Sixteen automated checks passed. No real payment was submitted; first-payment fulfilment and later renewals still require observation of genuine transactions.

The setup route is owner-only and additionally gated by PITCH_BILLING_SETUP_ENABLED. Re-enable only for an authorised maintenance session, then close it. It never changes another app's product or webhook. Billing setup creates unpaid checkouts only.

