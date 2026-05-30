import mongoose from 'mongoose';

const seoSettingsSchema = new mongoose.Schema({
  pageTitle: {
    type: String,
    default: 'Data-Analogy - Build Your Dream Website'
  },
  metaDescription: {
    type: String,
    default: 'Create stunning websites without coding. Data-Analogy provides powerful tools for building professional websites.'
  },
  metaKeywords: [{
    type: String
  }],
  ogTitle: {
    type: String
  },
  ogDescription: {
    type: String
  },
  ogImage: {
    type: String
  },
  twitterCard: {
    type: String,
    enum: ['summary', 'summary_large_image'],
    default: 'summary_large_image'
  },
  canonicalUrl: {
    type: String
  },
  robots: {
    type: String,
    default: 'index, follow'
  },
  googleAnalyticsId: {
    type: String
  },
  facebookPixelId: {
    type: String
  },
  schemaMarkup: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model('SEOSettings', seoSettingsSchema);
