import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  propertyId: { type: String, required: true },
  propertyTitle: { type: String, required: true },
  propertyImage: { type: String },
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  landlordId: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'rejected', 'cancelled'], default: 'pending' },
  moveInDate: { type: String, required: true },
  duration: { type: String, enum: ['monthly', 'academic-year'], required: true },
  message: { type: String, required: true },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

bookingSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id; }
});

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
