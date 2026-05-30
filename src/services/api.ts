import type { Property, Booking, Conversation, Message, User } from '@/types';

// --- PROPERTIES ---
export const propertyApi = {
  getAll: async (): Promise<Property[]> => {
    const res = await fetch('/api/properties');
    if (!res.ok) throw new Error('Failed to fetch properties');
    return res.json();
  },

  getById: async (id: string): Promise<Property | undefined> => {
    const res = await fetch(`/api/properties/${id}`);
    if (!res.ok) return undefined;
    return res.json();
  },

  add: async (property: Partial<Property>): Promise<Property> => {
    const res = await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(property),
    });
    if (!res.ok) throw new Error('Failed to add property');
    return res.json();
  },

  update: async (id: string, property: Partial<Property>): Promise<Property> => {
    const res = await fetch(`/api/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(property),
    });
    if (!res.ok) throw new Error('Failed to update property');
    return res.json();
  },

  updateStatus: async (id: string, status: Property['status']): Promise<Property> => {
    const res = await fetch(`/api/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update property status');
    return res.json();
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`/api/properties/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete property');
  }
};

// --- BOOKINGS ---
export const bookingApi = {
  getAll: async (): Promise<Booking[]> => {
    const res = await fetch('/api/bookings');
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  },

  getByStudentId: async (studentId: string): Promise<Booking[]> => {
    const res = await fetch(`/api/bookings?studentId=${studentId}`);
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  },

  getByLandlordId: async (landlordId: string): Promise<Booking[]> => {
    const res = await fetch(`/api/bookings?landlordId=${landlordId}`);
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  },

  add: async (booking: Partial<Booking>): Promise<Booking> => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
    if (!res.ok) throw new Error('Failed to add booking');
    return res.json();
  },

  updateStatus: async (id: string, status: string): Promise<Booking> => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update booking status');
    return res.json();
  },
};

// --- MESSAGING ---
export const messagingApi = {
  getConversations: async (userId: string): Promise<Conversation[]> => {
    const res = await fetch(`/api/conversations?userId=${userId}`);
    if (!res.ok) throw new Error('Failed to fetch conversations');
    return res.json();
  },

  getOrCreateConversation: async (
    student: { id: string },
    landlordId: string,
    landlordName: string,
    propertyId: string,
    propertyTitle: string
  ): Promise<Conversation> => {
    const res = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        participantIds: [student.id, landlordId],
        propertyId,
        propertyTitle,
        otherParticipantName: landlordName
      }),
    });
    if (!res.ok) throw new Error('Failed to initialize conversation');
    return res.json();
  },

  getMessages: async (conversationId: string): Promise<Message[]> => {
    const res = await fetch(`/api/messages?conversationId=${conversationId}`);
    if (!res.ok) throw new Error('Failed to fetch messages');
    return res.json();
  },

  sendMessage: async (conversationId: string, message: Partial<Message>): Promise<Message> => {
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...message, conversationId }),
    });
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  },
};
