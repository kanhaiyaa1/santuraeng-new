import { notFound } from 'next/navigation';

// Any multi-segment URL no other route matches (e.g. /foo/bar) renders app/[locale]/not-found.tsx.
// Single unknown segments are already handled by [country], which has dynamicParams = false.
export default function CatchAll() {
  notFound();
}
