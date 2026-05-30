import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Please provide subject'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Please provide message']
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  },
  repliedAt: {
    type: Date
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

contactMessageSchema.index({ createdAt: -1 });

export default mongoose.model('ContactMessage', contactMessageSchema);
