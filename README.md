# Senda Technologies

Company website for Senda Technologies Ltd.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + Turbopack
- React 19
- TypeScript
- Tailwind CSS v4

## Development

```bash
npm run dev     # start dev server at http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Layout

```
src/app/         # root layout, the home page, the contact form action
src/components/  # one file per page section
src/content/     # all copy (en.ts) and all facts: links, images, contact (shared.ts)
src/shared/      # pieces used by more than one section
src/styles/      # tokens.css plus one CSS module per component
public/art/      # card artwork
```

The contact form validates but does not send: no email provider is
connected yet. See `deliver` in `src/app/actions.ts`.
