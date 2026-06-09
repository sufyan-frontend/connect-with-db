import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const query = status ? { status } : {};
  const posts = await Post.find(query).sort({ createdAt: -1 }).lean();
  const data = posts.map(p => ({ ...p, _id: p._id.toString() }));
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  if (!body.slug) {
    body.slug = body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }
  const post = await Post.create(body);
  return NextResponse.json({ success: true, data: post }, { status: 201 });
}
