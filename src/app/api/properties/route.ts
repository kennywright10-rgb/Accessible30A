import { NextRequest, NextResponse } from 'next/server';
import { getProperties } from '@/lib/data';
import type { PropertySearchParams } from '@/types';

// GET /api/properties — Public property search
// This same endpoint becomes /api/v1/properties for B2B licensing in Phase 3
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const params: PropertySearchParams = {
    destination_id: searchParams.get('destination_id') || undefined,
    town_id: searchParams.get('town_id') || undefined,
    min_beds: searchParams.get('min_beds') ? Number(searchParams.get('min_beds')) : undefined,
    max_beds: searchParams.get('max_beds') ? Number(searchParams.get('max_beds')) : undefined,
    min_price: searchParams.get('min_price') ? Number(searchParams.get('min_price')) : undefined,
    max_price: searchParams.get('max_price') ? Number(searchParams.get('max_price')) : undefined,
    min_ars_score: searchParams.get('min_ars_score') ? Number(searchParams.get('min_ars_score')) : undefined,
    requires_zero_step_entry: searchParams.get('zero_step') === 'true',
    requires_roll_in_shower: searchParams.get('roll_in_shower') === 'true',
    requires_elevator: searchParams.get('elevator') === 'true',
    requires_pool_access: searchParams.get('pool_access') === 'true',
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    limit: Math.min(Number(searchParams.get('limit') || 20), 100),
    sort_by: (searchParams.get('sort') as any) || 'featured',
    sort_order: (searchParams.get('order') as any) || 'desc',
  };

  try {
    const { properties, total } = await getProperties(params);

    return NextResponse.json({
      data: properties,
      meta: {
        total,
        page: params.page,
        limit: params.limit,
        pages: Math.ceil(total / (params.limit || 20)),
      },
    });
  } catch (error) {
    console.error('Properties API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}
