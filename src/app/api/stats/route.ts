import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import Post from '@/models/Post';

export async function GET() {
  await connectDB();
  const [users, posts, published, drafts] = await Promise.all([
    User.countDocuments(),
    Post.countDocuments(),
    Post.countDocuments({ status: 'published' }),
    Post.countDocuments({ status: 'draft' }),
  ]);
  return NextResponse.json({ success: true, data: { users, posts, published, drafts } });
}
