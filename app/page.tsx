import { CatalogueBrowser } from "@/components/CatalogueBrowser";
import { PRODUCTS } from "@/lib/products";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Demo catalogue
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Vehicle safety products
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          A small Next.js + TypeScript demonstration built as part of an
          application for the Junior AI Web Developer role at Advanced Fleet
          Signs. Product data is mocked.
        </p>
      </header>

      <CatalogueBrowser products={PRODUCTS} />
    </main>
  );
}
