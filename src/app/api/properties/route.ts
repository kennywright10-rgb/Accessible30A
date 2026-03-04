import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 500 });
    }

    const supabase = createClient(url, key);

    const { data, error, count } = await supabase
      .from('properties')
      .select('*', { count: 'exact' });

    if (error) {
      return NextResponse.json({
        error: 'Query failed',
        details: error.message,
        code: error.code,
        hint: error.hint,
      }, { status: 500 });
    }

    return NextResponse.json({
      total_rows: data?.length || 0,
      count: count,
      names: data?.map(p => p.name) || [],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
