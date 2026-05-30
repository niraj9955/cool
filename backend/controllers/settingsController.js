import WebsiteSettings from '../models/WebsiteSettings.js';

// @desc    Get website settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await WebsiteSettings.create({});
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update website settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();

    if (!settings) {
      settings = new WebsiteSettings();
    }

    const {
      companyName,
      tagline,
      logo,
      favicon,
      heroSection,
      themeColors,
      contactInfo,
      socialMedia,
      footer,
      features,
      statistics
    } = req.body;

    if (companyName) settings.companyName = companyName;
    if (tagline) settings.tagline = tagline;
    if (logo) settings.logo = logo;
    if (favicon) settings.favicon = favicon;
    if (heroSection) settings.heroSection = { ...settings.heroSection, ...heroSection };
    if (themeColors) settings.themeColors = { ...settings.themeColors, ...themeColors };
    if (contactInfo) settings.contactInfo = { ...settings.contactInfo, ...contactInfo };
    if (socialMedia) settings.socialMedia = { ...settings.socialMedia, ...socialMedia };
    if (footer) settings.footer = { ...settings.footer, ...footer };
    if (features) settings.features = features;
    if (statistics) settings.statistics = statistics;

    const updatedSettings = await settings.save();

    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload logo
// @route   POST /api/settings/logo
// @access  Private/Admin
export const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let settings = await WebsiteSettings.findOne();

    if (!settings) {
      settings = new WebsiteSettings();
    }

    settings.logo = req.file.path;
    const updatedSettings = await settings.save();

    res.json({ logo: updatedSettings.logo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload hero image
// @route   POST /api/settings/hero-image
// @access  Private/Admin
export const uploadHeroImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let settings = await WebsiteSettings.findOne();

    if (!settings) {
      settings = new WebsiteSettings();
    }

    settings.heroSection.image = req.file.path;
    const updatedSettings = await settings.save();

    res.json({ heroImage: updatedSettings.heroSection.image });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
