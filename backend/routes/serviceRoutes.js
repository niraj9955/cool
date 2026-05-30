import express from 'express';
import { getServices, getServiceById, createService, updateService, deleteService, uploadServiceImage } from '../controllers/serviceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', protect, admin, createService);
router.put('/:id', protect, admin, updateService);
router.delete('/:id', protect, admin, deleteService);
router.post('/:id/image', protect, admin, upload.single('image'), uploadServiceImage);

export default router;
