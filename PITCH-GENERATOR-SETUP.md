# Pitcher — private accounts

Local website: `/Users/mac/Desktop/reine_dev/current-site`.
No changes have been pushed or deployed.

The homepage link opens `/pitcher/`, a public introduction with sign-up and sign-in. New accounts get their own empty private workspace. The owner email is reserved and cannot be registered through public sign-up. Only an authenticated owner session can load the Four10 reference deck, seed, artist updates or template. All saved reviews and custom templates use a server-derived account namespace, never a user-supplied owner ID. Even identical workspace IDs in different accounts cannot read or replace each other's data.

## Local preview

Run `npm run dev -- --host 127.0.0.1 --port 4101`.

On the public introduction, choose “Set up your private owner account on this computer” once, then choose a password. Sign in as `reinetoyosii@gmail.com`. Your Four10 workspace will load after sign-in. The setup link disappears after setup and exists only in the loopback-only development middleware. Production has no owner-setup route. There is no automatic owner sign-in.

Local account password hashes, owner setup and reviews live in ignored `.netlify/` files. Do not commit or share this directory. Browser cookies are HttpOnly and SameSite Strict; production cookies are also Secure. Production sign-in sessions expire after 12 hours. Changing the session secret revokes all existing sessions.

Passwords are salted and hashed with scrypt. Sign-up currently creates an email/password account without verifying the email; email delivery, password reset and managed identity integration are not configured. The owner email is reserved separately and cannot be claimed using public sign-up.

## Later Netlify configuration

Configure these server-only environment variables with Functions scope before deployment:

- `PITCH_OWNER_EMAIL`: `reinetoyosii@gmail.com`.
- `PITCH_PASSWORD`: a unique owner password at least 16 characters long. Local owner setup does not automatically configure Netlify.
- `PITCH_SESSION_SECRET`: a random secret at least 32 characters long. Generate with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.

Use Node 22 or newer. Never expose secrets as Vite client variables. Missing setup disables sign-in, sign-up and private requests while allowing the public introduction.

Netlify Blobs persists private accounts, reviews and custom templates with strong reads and conditional writes. The function bundles private references separately from `dist/client`; they are not public static assets. The Netlify function serves `/pitcher/*`; the existing homepage and `/work` routing are preserved. Rate limiting is configured for 120 requests per IP per minute; check that Netlify reports valid rules in the deploy log.

The private Four10 reference folder is Git-ignored and must never be committed to the public repository. A future production deployment must either bundle it from this local checkout with the Netlify CLI or provision the references through protected server storage; a Git-only build cannot recover these ignored files. Deployment should use Netlify’s build/function workflow; uploading the static `dist/client` directory alone does not deploy the private backend. No DNS change is needed. Production Netlify storage, routing and sign-in still require a deployment preview to verify. Nothing has been deployed from this work.

Existing reviews in the original ChatGPT-hosted generator remain there. Download a review backup and import it into the matching workspace after sign-in here. Reattach any custom templates. Word uses the retained Four10 OOXML package for the owner. Browser PDF fonts and page breaks can differ from Word. Custom template uploads are limited to 4 MB.

## Verification

`npm run build` verifies the website build.
`node --test netlify/pitcher.test.mjs` covers anonymous access, signup, reserved owner email, owner sign-in, customer isolation, private Four10 asset access, conflicting writes, template isolation, password hashing, tampered cookies and sign-out using a mock storage service.

Netlify references:
- https://docs.netlify.com/build/data-and-storage/netlify-blobs/
- https://docs.netlify.com/build/functions/api/


## Online email-only sign-in

Production now uses verified email sign-in links via Supabase; it does not accept the local owner password. The public introduction no longer shows local owner setup.

Set these server-only Netlify variables in the deployment context that will be used:
- PITCH_OWNER_EMAIL=reinetoyosii@gmail.com
- PITCH_SESSION_SECRET: a random secret of at least 32 characters
- PITCH_PUBLIC_URL=https://reine.vibesfactory.co
- SUPABASE_URL: the selected Supabase project's HTTPS URL
- SUPABASE_PUBLISHABLE_KEY: that project's publishable (or legacy anon) key; never use a service-role key here

In Supabase, enable Email authentication and add https://reine.vibesfactory.co/pitcher/callback to allowed redirect URLs. Configure a production email sender; default test email delivery does not support arbitrary public sign-ups.

Set the Magic Link and Confirm Signup email templates to include a link such as:
<a href="{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=email">Sign in to Pitcher</a>

The callback GET shows a Continue button without consuming the token, so mail-link scanners cannot automatically sign a user in. A same-origin POST verifies the token with Supabase and creates a signed, HttpOnly, Secure account cookie. Accounts are created only after Supabase confirms email ownership. reinetoyosii@gmail.com alone maps to the owner role. Existing customer review namespaces are preserved when email verification is upgraded.

For draft deployment testing, the matching HTTPS draft origin must be the PITCH_PUBLIC_URL and an allowed Supabase callback origin. Do not change the production callback to a temporary preview URL.

Checks: node --test netlify/pitcher.test.mjs netlify/pitcher-email.test.mjs.
The email provider has not yet been connected. Mock verification tests do not confirm live email delivery.

Reference: https://supabase.com/docs/guides/auth/auth-email-passwordless
