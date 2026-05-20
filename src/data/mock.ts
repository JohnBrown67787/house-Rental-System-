// src/data/mock.ts
// Shared mock data for all pages until backend is integrated

import type { User, Property, Booking, Conversation, Message, Review, SavedProperty, Notification, DashboardStats } from '@/types';

export const MOCK_STUDENTS: User[] = [
  {
    id: 'student-1',
    name: 'Amabo Daniel',
    email: 'amabo@ubuea.cm',
    role: 'student',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
    phone: '+237 677 123 456',
    university: 'University of Buea',
    bio: 'Computer Science student, Year 3. Looking for a quiet place near campus.',
    isVerified: true,
    createdAt: '2024-09-01',
  },
  {
    id: 'student-2',
    name: 'Mirabel Eposi',
    email: 'mirabel@ubuea.cm',
    role: 'student',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    phone: '+237 699 234 567',
    university: 'University of Buea',
    isVerified: true,
    createdAt: '2024-09-15',
  },
];

export const MOCK_LANDLORDS: User[] = [
  {
    id: 'landlord-1',
    name: 'Elvis Nkwenti',
    email: 'elvis@buealistings.cm',
    role: 'landlord',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200',
    phone: '+237 677 987 654',
    bio: 'Property manager with 8+ years of experience in student housing near UB.',
    isVerified: true,
    createdAt: '2023-01-10',
  },
];

export const CURRENT_STUDENT = MOCK_STUDENTS[0];
export const CURRENT_LANDLORD = MOCK_LANDLORDS[0];

export const MOCK_PROPERTIES: Property[] = [];

export const MOCK_BOOKINGS: Booking[] = [];

export const MOCK_CONVERSATIONS: Conversation[] = [];

export const MOCK_MESSAGES: Record<string, Message[]> = {};

export const MOCK_REVIEWS: Review[] = [];

export const MOCK_SAVED: SavedProperty[] = [];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: 'student-1',
    type: 'new_message',
    title: 'New message from Elvis Nkwenti',
    message: 'The room is available from October 1st.',
    isRead: false,
    link: '/student-dashboard/messages',
    createdAt: '2024-09-12T14:30:00',
  },
  {
    id: 'notif-2',
    userId: 'student-1',
    type: 'booking_update',
    title: 'Booking Confirmed!',
    message: 'Your booking for Blue Heights Studio has been confirmed.',
    isRead: false,
    link: '/student-dashboard',
    createdAt: '2024-09-06T10:00:00',
  },
];

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalProperties: 156,
  totalStudents: 1284,
  totalLandlords: 89,
  pendingApprovals: 12,
  totalBookings: 342,
  monthlyRevenue: 4200000,
};
