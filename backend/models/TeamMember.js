import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
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
  bio: {
    type: String
  },
  image: {
    type: String,
    default: ''
  },
  socialLinks: {
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    github: { type: String, default: '' },
    email: { type: String, default: '' }
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

export default mongoose.model('TeamMember', teamMemberSchema);
