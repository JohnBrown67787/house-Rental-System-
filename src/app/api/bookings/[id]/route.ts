import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Booking from '@/models/Booking';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await req.json();
    const booking = await Booking.findByIdAndUpdate(
      params.id,
      { status: body.status },
      { new: true }
    );
    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    return NextResponse.json(booking.toJSON());
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
