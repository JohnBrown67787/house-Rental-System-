import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  participantIds: [{ type: String, required: true }],
  propertyId: { type: String, required: true },
  propertyTitle: { type: String, required: true },
  otherParticipantName: { type: String, required: true },
  otherParticipantAvatar: { type: String },
  lastMessage: { type: String },
  lastMessageAt: { type: Date },
  unreadCount: { type: Number, default: 0 },
}, { timestamps: true });

conversationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id; }
});

export default mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema);
