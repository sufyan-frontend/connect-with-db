import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const query: Record<string, unknown> = {};
  if (category && category !== 'All') query.category = category;
  if (featured === 'true') query.featured = true;
  const products = await Product.find(query).sort({ createdAt: -1 }).lean();
  const data = products.map(p => ({ ...p, _id: p._id.toString() }));
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const product = await Product.create(body);
  return NextResponse.json({ success: true, data: product }, { status: 201 });
}
