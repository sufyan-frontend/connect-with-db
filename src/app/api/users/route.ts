import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

// GET all users
export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json({ success: true, data: users });
}

// POST create a user
export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  const user = await User.create(body);
  return NextResponse.json({ success: true, data: user }, { status: 201 });
}
