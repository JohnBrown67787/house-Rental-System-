import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Conversation from '@/models/Conversation';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    let query: any = {};
    if (userId) query.participantIds = userId;

    const conversations = await Conversation.find(query).sort({ lastMessageAt: -1 });
    return NextResponse.json(conversations);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Check if conversation already exists between these users for this property
    let conversation = await Conversation.findOne({
      propertyId: body.propertyId,
      participantIds: { $all: body.participantIds }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        ...body,
        lastMessageAt: new Date()
      });
    }
    
    return NextResponse.json(conversation, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
