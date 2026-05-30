import express from 'express';
import { getSettings, updateSettings, uploadLogo, uploadHeroImage } from '../controllers/settingsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', protect, admin, updateSettings);
router.post('/logo', protect, admin, upload.single('logo'), uploadLogo);
router.post('/hero-image', protect, admin, upload.single('image'), uploadHeroImage);

export default router;
