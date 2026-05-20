import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();

    const existing = await User.findOne({ email: 'admin@gmail.com', role: 'admin' });

    if (existing) {
      return NextResponse.json({ message: 'Admin already exists' }, { status: 200 });
    }

    await User.create({
      name: 'Administrator',
      email: 'admin@gmail.com',
      password: 'admin1234',
      role: 'admin',
      isVerified: true,
    });

    return NextResponse.json({ message: 'Default admin created successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
