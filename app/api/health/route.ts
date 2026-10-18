import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Always run on request: the point is a live database round-trip, never a cached response.
// Next 14 caches fetch() POSTs (Supabase RPC) by default, so caching is disabled explicitly as well.
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

/** GET /api/health — runs SELECT 1 via the health_check() function; 200 if the database answers, 503 if not. */
export async function GET() {
  const started = Date.now();
  const { data, error } = await supabase.rpc('health_check');
  const latencyMs = Date.now() - started;

  if (error || data !== 1) {
    return NextResponse.json(
      { status: 'error', database: 'unreachable', latencyMs },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  return NextResponse.json(
    { status: 'ok', database: 'ok', latencyMs, timestamp: new Date().toISOString() },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
