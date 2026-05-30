import express from 'express';
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember, uploadTeamImage } from '../controllers/teamController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getTeamMembers);
router.post('/', protect, admin, createTeamMember);
router.put('/:id', protect, admin, updateTeamMember);
router.delete('/:id', protect, admin, deleteTeamMember);
router.post('/:id/image', protect, admin, upload.single('image'), uploadTeamImage);

export default router;
