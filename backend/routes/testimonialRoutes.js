import express from 'express';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, uploadTestimonialAvatar } from '../controllers/testimonialController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', protect, admin, createTestimonial);
router.put('/:id', protect, admin, updateTestimonial);
router.delete('/:id', protect, admin, deleteTestimonial);
router.post('/:id/avatar', protect, admin, upload.single('avatar'), uploadTestimonialAvatar);

export default router;
