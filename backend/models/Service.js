import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide service title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide service description']
  },
  longDescription: {
    type: String
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    trim: true
  },
  icon: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  features: [{
    type: String
  }],
  isPopular: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

serviceSchema.index({ title: 'text', description: 'text', category: 'text' });

export default mongoose.model('Service', serviceSchema);
