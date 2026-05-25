import { mockProducts } from '@/data/mock-products';
import { NextRequest, NextResponse } from 'next/server';

const MOCK_PRODUCTS_BEARER_TOKEN =
  process.env.MOCK_PRODUCTS_BEARER_TOKEN || 'mock-samsung-token';

export async function GET(request: NextRequest) {
  const authorization = request.headers.get('authorization');
  const expected = `Bearer ${MOCK_PRODUCTS_BEARER_TOKEN}`;

  if (authorization !== expected) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(mockProducts);
}
