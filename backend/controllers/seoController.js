import SEOSettings from '../models/SEOSettings.js';

// @desc    Get SEO settings
// @route   GET /api/seo
// @access  Public
export const getSEOSettings = async (req, res) => {
  try {
    let seoSettings = await SEOSettings.findOne();

    // Create default settings if none exist
    if (!seoSettings) {
      seoSettings = await SEOSettings.create({});
    }

    res.json(seoSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update SEO settings
// @route   PUT /api/seo
// @access  Private/Admin
export const updateSEOSettings = async (req, res) => {
  try {
    let seoSettings = await SEOSettings.findOne();

    if (!seoSettings) {
      seoSettings = new SEOSettings();
    }

    const {
      pageTitle,
      metaDescription,
      metaKeywords,
      ogTitle,
      ogDescription,
      ogImage,
      twitterCard,
      canonicalUrl,
      robots,
      googleAnalyticsId,
      facebookPixelId,
      schemaMarkup
    } = req.body;

    if (pageTitle) seoSettings.pageTitle = pageTitle;
    if (metaDescription) seoSettings.metaDescription = metaDescription;
    if (metaKeywords) seoSettings.metaKeywords = metaKeywords;
    if (ogTitle) seoSettings.ogTitle = ogTitle;
    if (ogDescription) seoSettings.ogDescription = ogDescription;
    if (ogImage) seoSettings.ogImage = ogImage;
    if (twitterCard) seoSettings.twitterCard = twitterCard;
    if (canonicalUrl) seoSettings.canonicalUrl = canonicalUrl;
    if (robots) seoSettings.robots = robots;
    if (googleAnalyticsId) seoSettings.googleAnalyticsId = googleAnalyticsId;
    if (facebookPixelId) seoSettings.facebookPixelId = facebookPixelId;
    if (schemaMarkup) seoSettings.schemaMarkup = schemaMarkup;

    const updatedSettings = await seoSettings.save();

    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload OG image
// @route   POST /api/seo/og-image
// @access  Private/Admin
export const uploadOGImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let seoSettings = await SEOSettings.findOne();

    if (!seoSettings) {
      seoSettings = new SEOSettings();
    }

    seoSettings.ogImage = req.file.path;
    const updatedSettings = await seoSettings.save();

    res.json({ ogImage: updatedSettings.ogImage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
