import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Booking from '@/models/Booking';
import Conversation from '@/models/Conversation';
import Message from '@/models/Message';
import { emitNewMessage } from '@/lib/messageEmitter';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');
    const landlordId = searchParams.get('landlordId');

    let query: any = {};
    if (studentId) query.studentId = studentId;
    if (landlordId) query.landlordId = landlordId;

    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // 1. Save the booking
    const booking = await Booking.create(body);

    // 2. Find or create a conversation between student and landlord for this property
    let conversation = await Conversation.findOne({
      participantIds: { $all: [body.studentId, body.landlordId] },
      propertyId: body.propertyId,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participantIds: [body.studentId, body.landlordId],
        propertyId: body.propertyId,
        propertyTitle: body.propertyTitle,
        otherParticipantName: body.studentName,
        lastMessageAt: new Date(),
        unreadCount: 1,
      });
    }

    const convId = conversation._id.toString();

    // 3. Build and save the automatic booking notification message
    const durationLabel = body.duration === 'academic-year' ? 'Academic Year (9 months)' : 'Month-to-Month';
    const autoText = [
      `📋 *New Booking Request from ${body.studentName}*`,
      ``,
      `🏠 Property: ${body.propertyTitle}`,
      `📅 Preferred Move-in: ${body.moveInDate}`,
      `⏱ Duration: ${durationLabel}`,
      `💰 Total Amount: ${body.totalAmount?.toLocaleString()} FCFA`,
      body.studentEmail ? `📧 Email: ${body.studentEmail}` : null,
      body.studentPhone ? `📞 Phone: ${body.studentPhone}` : null,
      ``,
      `💬 Message: "${body.message}"`,
      ``,
      `Please check your dashboard to approve or reject this request.`,
    ].filter(Boolean).join('\n');

    const autoMessage = await Message.create({
      conversationId: convId,
      senderId: body.studentId,
      senderName: body.studentName,
      text: autoText,
      isBookingNotification: true,
    });

    // Update conversation last message
    await Conversation.findByIdAndUpdate(convId, {
      lastMessage: `📋 Booking request from ${body.studentName}`,
      lastMessageAt: new Date(),
      $inc: { unreadCount: 1 },
    });

    // 4. Broadcast via SSE so landlord receives it in real-time
    emitNewMessage(convId, autoMessage.toJSON());

    return NextResponse.json(booking.toJSON(), { status: 201 });
  } catch (error: any) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

