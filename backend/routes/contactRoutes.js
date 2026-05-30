import express from 'express';
import { submitContactMessage, getContactMessages, getContactMessageById, updateMessageStatus, deleteContactMessage } from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitContactMessage);
router.get('/messages', protect, admin, getContactMessages);
router.get('/messages/:id', protect, admin, getContactMessageById);
router.put('/messages/:id/status', protect, admin, updateMessageStatus);
router.delete('/messages/:id', protect, admin, deleteContactMessage);

export default router;
