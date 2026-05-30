import express from 'express';
import { getSEOSettings, updateSEOSettings, uploadOGImage } from '../controllers/seoController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getSEOSettings);
router.put('/', protect, admin, updateSEOSettings);
router.post('/og-image', protect, admin, upload.single('image'), uploadOGImage);

export default router;
