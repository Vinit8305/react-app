const express = require('express');
const Skill = require('../models/Skill');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all skills (public route)
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find({ isActive: true }).sort({ category: 1, order: 1 });
    
    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push({
        skillName: skill.skillName,
        percentage: skill.percentage
      });
      return acc;
    }, {});

    // Convert to array format for frontend compatibility
    const skillsData = Object.keys(groupedSkills).map(category => ({
      label: category,
      data: groupedSkills[category]
    }));

    res.json(skillsData);
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all skills for admin (protected route)
router.get('/admin', auth, async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    res.json(skills);
  } catch (error) {
    console.error('Get admin skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new skill (protected route)
router.post('/', auth, async (req, res) => {
  try {
    const { skillName, percentage, category } = req.body;

    // Validate input
    if (!skillName || percentage === undefined || !category) {
      return res.status(400).json({ message: 'Skill name, percentage, and category are required' });
    }

    if (percentage < 0 || percentage > 100) {
      return res.status(400).json({ message: 'Percentage must be between 0 and 100' });
    }

    // Get the highest order number for this category
    const maxOrder = await Skill.findOne({ category }).sort({ order: -1 });
    const newOrder = maxOrder ? maxOrder.order + 1 : 0;

    const skill = new Skill({
      skillName,
      percentage,
      category,
      order: newOrder
    });

    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    console.error('Create skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update skill (protected route)
router.put('/:id', auth, async (req, res) => {
  try {
    const { skillName, percentage, category, isActive } = req.body;
    const { id } = req.params;

    // Validate input
    if (percentage !== undefined && (percentage < 0 || percentage > 100)) {
      return res.status(400).json({ message: 'Percentage must be between 0 and 100' });
    }

    const skill = await Skill.findByIdAndUpdate(
      id,
      { skillName, percentage, category, isActive },
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json(skill);
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete skill (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reorder skills (protected route)
router.put('/reorder', auth, async (req, res) => {
  try {
    const { skills } = req.body; // Array of { id, order }

    for (const skillUpdate of skills) {
      await Skill.findByIdAndUpdate(skillUpdate.id, { order: skillUpdate.order });
    }

    res.json({ message: 'Skills reordered successfully' });
  } catch (error) {
    console.error('Reorder skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
