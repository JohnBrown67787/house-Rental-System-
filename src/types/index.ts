// src/types/index.ts
// Core data entities for the Buea Rentals platform

export type UserRole = 'student' | 'landlord' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  university?: string; // for students
  bio?: string;
  isVerified: boolean;
  createdAt: string;
}

export type RoomType = 'single' | 'studio' | 'two-bedroom' | 'shared';
export type PropertyStatus = 'pending' | 'verified' | 'rejected';

export interface Property {
  id: string;
  landlordId: string;
  landlordName: string;
  landlordAvatar?: string;
  title: string;
  description: string;
  location: string;
  neighborhood: string;
  pricePerMonth: number;
  roomType: RoomType;
  amenities: string[];
  images: string[];
  status: PropertyStatus;
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  bedsCount: number;
  bathType: 'private' | 'shared';
  createdAt: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled';
export type BookingDuration = 'monthly' | 'academic-year';

export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage?: string;
  studentId: string;
  studentName: string;
  landlordId: string;
  status: BookingStatus;
  moveInDate: string;
  duration: BookingDuration;
  message: string;
  totalAmount: number;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  propertyId: string;
  propertyTitle: string;
  otherParticipantName: string;
  otherParticipantAvatar?: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface Review {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage?: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface SavedProperty {
  userId: string;
  property: Property;
  savedAt: string;
}

export type NotificationType = 'new_message' | 'booking_update' | 'property_verified' | 'review_received';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  link: string;
  createdAt: string;
}

export interface FilterParams {
  location?: string;
  priceMin?: number;
  priceMax?: number;
  roomType?: RoomType;
  amenities?: string[];
  searchQuery?: string;
}

export interface DashboardStats {
  totalProperties: number;
  totalStudents: number;
  totalLandlords: number;
  pendingApprovals: number;
  totalBookings: number;
  monthlyRevenue?: number;
}
