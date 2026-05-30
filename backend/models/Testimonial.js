import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Please provide role'],
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: [true, 'Please provide testimonial content']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
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

export default mongoose.model('Testimonial', testimonialSchema);
