const express = require('express');
const router = express.Router();
const Day = require('../models/Day');
const Week = require('../models/Week');
const passageAuthMiddleware = require('../utils/passageMiddleware');

// POST: Create a new Day
router.post('/create', passageAuthMiddleware, async (req, res) => {
  try {
    const { week, dayOfWeek, workouts } = req.body;

    const newDay = new Day({
      week,
      dayOfWeek,
      workouts: workouts.map(workout => ({ workout, completed: false }))
    });

    await newDay.save();
    await Week.findByIdAndUpdate(week, { $push: { days: newDay._id } });

    res.status(201).json({ message: 'Day created successfully', newDay });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// GET: Retrieve a specific Day by ID
router.get('/:dayId', passageAuthMiddleware, async (req, res) => {
  try {
    const dayId = req.params.dayId;
    const day = await Day.findById(dayId);

    if (!day) {
      return res.status(404).json({ message: 'Day not found' });
    }

    res.json(day);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// PUT: Update an existing Day
router.put('/:dayId', passageAuthMiddleware, async (req, res) => {
  try {
    const dayId = req.params.dayId;
    const updateData = req.body;

    const updatedDay = await Day.findByIdAndUpdate(
      dayId,
      updateData,
      { new: true }
    );

    if (!updatedDay) {
      return res.status(404).json({ message: 'Day not found' });
    }

    res.json({ message: 'Day updated successfully', updatedDay });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// DELETE: Delete a Day
router.delete('/day/:dayId', passageAuthMiddleware, async (req, res) => {
  try {
    const dayId = req.params.dayId;
    const day = await Day.findByIdAndDelete(dayId);

    if (!day) {
      return res.status(404).json({ message: 'Day not found' });
    }

    await Week.findByIdAndUpdate(week, { $pull: { days: newDay._id } });

    res.json({ message: 'Day deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

module.exports = router;
