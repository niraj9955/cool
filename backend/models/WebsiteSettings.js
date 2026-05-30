import mongoose from 'mongoose';

const websiteSettingsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    default: 'Data-Analogy'
  },
  tagline: {
    type: String,
    default: 'Build Your Dream Website'
  },
  logo: {
    type: String,
    default: ''
  },
  favicon: {
    type: String,
    default: ''
  },
  heroSection: {
    heading: {
      type: String,
      default: 'Welcome to Data-Analogy'
    },
    description: {
      type: String,
      default: 'Create stunning websites without coding'
    },
    image: {
      type: String,
      default: ''
    },
    ctaText: {
      type: String,
      default: 'Get Started'
    },
    ctaLink: {
      type: String,
      default: '/signup'
    }
  },
  themeColors: {
    primary: {
      type: String,
      default: '#3B82F6'
    },
    secondary: {
      type: String,
      default: '#1E40AF'
    },
    accent: {
      type: String,
      default: '#10B981'
    }
  },
  contactInfo: {
    email: {
      type: String,
      default: 'info@data-analogy.com'
    },
    phone: {
      type: String,
      default: '+1 (555) 123-4567'
    },
    address: {
      type: String,
      default: '123 Business Street, City, State 12345'
    },
    googleMapsUrl: {
      type: String,
      default: ''
    }
  },
  socialMedia: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' }
  },
  footer: {
    copyrightText: {
      type: String,
      default: '© 2024 Data-Analogy. All rights reserved.'
    },
    description: {
      type: String,
      default: 'Building amazing websites for businesses worldwide.'
    }
  },
  features: [{
    icon: String,
    title: String,
    description: String
  }],
  statistics: [{
    label: String,
    value: String,
    icon: String
  }]
}, {
  timestamps: true
});

export default mongoose.model('WebsiteSettings', websiteSettingsSchema);
