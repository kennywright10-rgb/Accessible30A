import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// GET /api/properties — Public property search
export async function GET(request: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      return NextResponse.json(
        { error: 'Missing Supabase credentials', hint: 'Check environment variables' },
        { status: 500 }
      );
    }

    const supabase = createClient(url, key);

    const { data, error } = await supabase
      .from('properties')
      .select('id, name, slug, property_type, address, city, state, bedrooms, bathrooms, sleeps, description, ars_score, booking_url, vrbo_url, airbnb_url, hero_image_url, featured, flagship, status, price_min, price_max, manager_company, meta_title, meta_description')
      .order('flagship', { ascending: false })
      .order('featured', { ascending: false })
      .limit(20);

    if (error) {
      return NextResponse.json(
        { error: 'Database query failed', details: error.message, code: error.code },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: data || [],
      meta: { total: data?.length || 0 },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Unexpected error', details: err.message },
      { status: 500 }
    );
  }
}
