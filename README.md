# Sushovan Halder — Portfolio

Personal portfolio and systems lab for Sushovan Halder, a CSE student at RKMGEC. The site presents selected projects, technical capabilities, current explorations, and a direct contact form.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Resend API for contact-form delivery

## Local development

```bash
pnpm install
pnpm dev
```

The development server runs at `http://localhost:3000`.

## Validation

```bash
pnpm typecheck
pnpm build
```

## Contact email setup

Copy `.env.example` to `.env.local` and configure:

```env
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_FROM_EMAIL=Sushovan Portfolio <contact@your-verified-domain.example>
```

The contact API sends the visitor's message to `sushovanhalderofficial@gmail.com` and sends an acknowledgment to the visitor's submitted email address. The visitor's address is used as `Reply-To` for the notification; it is never used as the unauthenticated sender.

For production delivery:

1. Verify the sending domain in Resend.
2. Configure the required DNS records for SPF and DKIM.
3. Add DMARC for stronger deliverability.
4. Add the environment variables to the hosting provider.
5. Review Resend email events for delivered, bounced, delayed, complained, or suppressed messages.

Never commit `.env`, `.env.local`, API keys, or other secrets.

## Project structure

- `src/app/` — routes, metadata, and the contact API
- `src/components/` — page sections and interactive UI
- `src/content/` — editable portfolio content
- `src/lib/` — validation and shared helpers
- `public/` — static assets

## License

This project is released under the [MIT License](LICENSE).
