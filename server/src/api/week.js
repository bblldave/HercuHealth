const express = require('express');
const router = express.Router();
const Week = require('../models/Week'); // Adjust the path to your Week model
const User = require('../models/User');
const Program = require('../models/Program');
const passageAuthMiddleware = require('../utils/passageMiddleware');

// Create Week Endpoint
router.post('/create', passageAuthMiddleware, async (req, res) => {
  try {
    const { program, weekNumber, days } = req.body;
    const userPassageId = res.user.id;
    const user = await User.findOne({ passage_id: userPassageId });

    const newWeek = new Week({
      program,
      weekNumber,
      days
    });

    await newWeek.save();
    await Program.findByIdAndUpdate(program, { $push: { weeks: newWeek._id } });
    res.status(201).json({ message: 'Week created successfully', newWeek });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// Retrieve Week Endpoint
router.get('/:weekId', passageAuthMiddleware, async (req, res) => {
  try {
    const weekId = req.params.weekId;
    const week = await Week.findById(weekId);

    if (!week) {
      return res.status(404).json({ message: 'Week not found' });
    }

    res.json(week);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// Update Week Endpoint
router.put('/:weekId', passageAuthMiddleware, async (req, res) => {
  try {
    const weekId = req.params.weekId;
    const updateData = req.body;

    const updatedWeek = await Week.findByIdAndUpdate(
      weekId,
      updateData,
      { new: true }
    );

    if (!updatedWeek) {
      return res.status(404).json({ message: 'Week not found' });
    }

    res.json({ message: 'Week updated successfully', updatedWeek });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// Delete Week Endpoint
router.delete('/:weekId', passageAuthMiddleware, async (req, res) => {
  try {
    const weekId = req.params.weekId;
    const week = await Week.findByIdAndDelete(weekId);

    if (!week) {
      return res.status(404).json({ message: 'Week not found' });
    }

    res.json({ message: 'Week deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

module.exports = router;
