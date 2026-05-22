import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Message from '@/models/Message';
import Conversation from '@/models/Conversation';
import { emitNewMessage } from '@/lib/messageEmitter';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get('conversationId');

    if (!conversationId) return NextResponse.json({ error: 'Conversation ID required' }, { status: 400 });

    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
    return NextResponse.json(messages);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const message = await Message.create(body);

    // Update the parent conversation's lastMessage and time
    await Conversation.findByIdAndUpdate(body.conversationId, {
      lastMessage: body.text,
      lastMessageAt: new Date(),
      $inc: { unreadCount: 1 }
    });

    // Broadcast the new message to all SSE subscribers of this conversation
    const messageJson = message.toJSON();
    emitNewMessage(body.conversationId, messageJson);

    return NextResponse.json(messageJson, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
