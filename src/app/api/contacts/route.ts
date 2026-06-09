import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json({ success: false, message: 'All fields required' }, { status: 400 });
  }
  // In production, send email or store in DB here
  console.log('Contact form submission:', body);
  return NextResponse.json({ success: true, message: 'Message received!' });
}
