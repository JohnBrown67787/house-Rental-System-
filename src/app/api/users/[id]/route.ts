import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await req.json();

    // Never allow password or role changes through this endpoint
    const { password: _p, role: _r, ...safeUpdates } = body;

    const user = await User.findByIdAndUpdate(
      params.id,
      safeUpdates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
      phone: user.phone,
      bio: user.bio,
      university: user.university,
      isVerified: user.isVerified,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
