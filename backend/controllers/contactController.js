import ContactMessage from '../models/ContactMessage.js';

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone,
      subject,
      message
    });

    res.status(201).json({
      message: 'Thank you for contacting us. We will get back to you soon.',
      data: contactMessage
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact/messages
// @access  Private/Admin
export const getContactMessages = async (req, res) => {
  try {
    const { page = 1, limit = 20, status = '', search = '' } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await ContactMessage.countDocuments(query);

    // Get status counts
    const statusCounts = {
      new: await ContactMessage.countDocuments({ status: 'new' }),
      read: await ContactMessage.countDocuments({ status: 'read' }),
      replied: await ContactMessage.countDocuments({ status: 'replied' }),
      archived: await ContactMessage.countDocuments({ status: 'archived' })
    };

    res.json({
      messages,
      statusCounts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get contact message by ID
// @route   GET /api/contact/messages/:id
// @access  Private/Admin
export const getContactMessageById = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Mark as read
    if (message.status === 'new') {
      message.status = 'read';
      await message.save();
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update contact message status
// @route   PUT /api/contact/messages/:id/status
// @access  Private/Admin
export const updateMessageStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (status) {
      message.status = status;
    }

    if (notes) {
      message.notes = notes;
    }

    if (status === 'replied') {
      message.repliedAt = new Date();
    }

    const updatedMessage = await message.save();

    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/messages/:id
// @access  Private/Admin
export const deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await message.deleteOne();

    res.json({ message: 'Message removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
