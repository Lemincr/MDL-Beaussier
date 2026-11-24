import mongoose, { Document, Types } from 'mongoose';

export interface IAssociation extends Document {
  name: string;
  description: string;
  contact: string;
  logo: string;
  status: 'active' | 'inactive';
  manager?: Types.ObjectId;
  createdAt: Date;
}

const associationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true },
  contact: { type: String, required: true, trim: true },
  logo: { type: String, default: '' },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IAssociation>('Association', associationSchema);
