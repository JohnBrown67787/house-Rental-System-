import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email, password, role } = body;

    if (!email || !password || !role) {
      return NextResponse.json({ error: 'Missing email, password, or role' }, { status: 400 });
    }

    // Find user by email and role
    const user = await User.findOne({ email: email.toLowerCase(), role });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials or user not found for this role' }, { status: 401 });
    }

    // Check password (plain text as requested)
    if (user.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Don't send password back in response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
      phone: user.phone,
      bio: user.bio,
      university: user.university,
      isVerified: user.isVerified
    };

    return NextResponse.json(userResponse, { status: 200 });
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
