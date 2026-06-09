import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

// GET one user by ID
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const user = await User.findById(id);
  if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: user });
}

// PUT update a user
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const user = await User.findByIdAndUpdate(id, body, { new: true });
  if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: user });
}

// DELETE a user
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  await User.findByIdAndDelete(id);
  return NextResponse.json({ success: true, message: 'User deleted' });
}
