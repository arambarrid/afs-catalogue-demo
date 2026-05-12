# afs-catalogue-demo

A small Next.js + TypeScript catalogue, built as part of my application for the **Junior AI Web Developer** role at Advanced Fleet Signs.

The job ad asked for a GitHub portfolio. My production-grade software work — six years on the platform behind South America's first outpatient closed-loop artificial pancreas trial — lives in private clinical repositories I can't open-source. So instead of pointing at sparse public repos, I built this demo from scratch to show:

1. **TypeScript fundamentals** — typed data, discriminated literals on categories, narrow types in props and hooks, no `any`.
2. **Next.js (App Router) fundamentals** — server components, dynamic routes (`/products/[slug]`), static params generation, client islands for interactive filters.
3. **The AI-assisted workflow the role calls out** — built collaboratively with **Claude Code** as the co-pilot.

It's intentionally small. The job description said "doesn't need to be polished or complete," so I kept the scope honest: ten mocked products, a search-and-filter catalogue page, a detail page per product.

## What's in it

- **`app/page.tsx`** — catalogue index. Server component, renders the catalogue browser with the mock product list.
- **`app/products/[slug]/page.tsx`** — dynamic product detail page with `generateStaticParams` and `notFound()` fallback.
- **`components/CatalogueBrowser.tsx`** — client island. Text search, category dropdown, in-stock-only toggle, all driven by a single typed `Filters` state.
- **`components/ProductCard.tsx`** — server-rendered card component.
- **`lib/products.ts`** — typed product data. `Product`, `ProductCategory` types, mock data for ten AFS-style products (LED light bars, beacons, signage, reflective tape, fleet decals).
- **`lib/search.ts`** — pure typed filter function, no React dependencies, easy to unit-test.

## What's deliberately *not* in it

- No payments. The "Request a quote" button doesn't post anywhere.
- No database — products are an in-memory array in `lib/products.ts`. A real shop would back this with Dataverse / Postgres / Shopify / Stripe, but that wasn't the point.
- No accounts, no cart persistence, no internationalisation.
- No real product photos. Each product renders a coloured placeholder with the category label — chosen so the demo doesn't depend on copying anyone else's imagery.

Spending two days on a polished UI shell would have been the wrong trade. The intent here is to demonstrate I can read and write modern TS/Next.js code and that I'm comfortable shipping incrementally with AI tools as part of the loop.

## How it was built

Built with [Claude Code](https://www.anthropic.com/claude-code) over roughly half a day, in the same way the AFS role describes: writing code in conversation, iterating quickly, asking the model to scaffold structure and then reviewing/editing the output. This is the same workflow I use day-to-day right now and the same one the job ad calls out (Cursor / Claude Code / Codex).

I'm a Computer Engineer with extensive Java and C experience (six years on the AndroidAPS / InsuMate® closed-loop platform, plus embedded work at university). TypeScript is new to me as a primary language, but the underlying ideas — typed interfaces, generics, narrowing — map cleanly across from Java. Building this was a deliberate exercise in working through that bridge with AI assistance.

## Run it locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

Or build the production bundle:

```bash
npm run build
npm start
```

## About me

Delfina Arambarri — Computer Engineer, currently in Perth, WA on a working-holiday visa (valid through April 2027).

- LinkedIn: [linkedin.com/in/delfina-arambarri](https://www.linkedin.com/in/delfina-arambarri/)
- Email: delfinarambarri@gmail.com
