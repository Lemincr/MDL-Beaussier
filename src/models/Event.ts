import mongoose, { Document, Types } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  category: string;
  published: boolean;
  association: Types.ObjectId;
  createdAt: Date;
}

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true, trim: true },
  capacity: { type: Number, required: true, min: 1 },
  category: { type: String, required: true, trim: true },
  published: { type: Boolean, default: false },
  association: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Association',
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IEvent>('Event', eventSchema);
