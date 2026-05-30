import Testimonial from '../models/Testimonial.js';

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ order: 1, rating: -1 });

    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
export const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    Object.assign(testimonial, req.body);
    const updatedTestimonial = await testimonial.save();

    res.json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    await testimonial.deleteOne();

    res.json({ message: 'Testimonial removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload testimonial avatar
// @route   POST /api/testimonials/:id/avatar
// @access  Private/Admin
export const uploadTestimonialAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    testimonial.avatar = req.file.path;
    const updatedTestimonial = await testimonial.save();

    res.json({ avatar: updatedTestimonial.avatar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
