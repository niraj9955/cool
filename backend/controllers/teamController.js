import TeamMember from '../models/TeamMember.js';

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
export const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ isActive: true })
      .sort({ order: 1 });

    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create team member
// @route   POST /api/team
// @access  Private/Admin
export const createTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.create(req.body);
    res.status(201).json(teamMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private/Admin
export const updateTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    Object.assign(teamMember, req.body);
    const updatedTeamMember = await teamMember.save();

    res.json(updatedTeamMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
export const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    await teamMember.deleteOne();

    res.json({ message: 'Team member removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload team member image
// @route   POST /api/team/:id/image
// @access  Private/Admin
export const uploadTeamImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    teamMember.image = req.file.path;
    const updatedTeamMember = await teamMember.save();

    res.json({ image: updatedTeamMember.image });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
