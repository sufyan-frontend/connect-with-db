import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET() {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  const data = orders.map(o => ({ ...o, _id: o._id.toString() }));
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const count = await Order.countDocuments();
  body.orderNumber = `ORD-${String(count + 1).padStart(4, '0')}`;
  const order = await Order.create(body);
  return NextResponse.json({ success: true, data: { ...order.toObject(), _id: order._id.toString() } }, { status: 201 });
}
