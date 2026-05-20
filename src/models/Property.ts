import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  landlordId: { type: String, required: true },
  landlordName: { type: String, required: true },
  landlordAvatar: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  neighborhood: { type: String, required: true },
  pricePerMonth: { type: Number, required: true },
  roomType: { type: String, enum: ['single', 'studio', 'two-bedroom', 'shared'], required: true },
  amenities: [{ type: String }],
  images: [{ type: String }],
  status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  isAvailable: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  bedsCount: { type: Number, required: true },
  bathType: { type: String, enum: ['private', 'shared'], required: true },
}, { timestamps: true });

// Ensures we get the 'id' field to match frontend expectations
propertySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id; }
});

export default mongoose.models.Property || mongoose.model('Property', propertySchema);
