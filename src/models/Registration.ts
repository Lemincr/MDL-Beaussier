import mongoose, { Document, Types } from 'mongoose';

export interface IRegistration extends Document {
  user: Types.ObjectId;
  event: Types.ObjectId;
  registeredAt: Date;
  status: 'confirmed' | 'cancelled';
}

const registrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  registeredAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed'
  }
});

registrationSchema.index({ user: 1, event: 1 }, { unique: true });

export default mongoose.model<IRegistration>('Registration', registrationSchema);
