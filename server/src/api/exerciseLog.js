const express = require('express');
const router = express.Router();
const ExerciseLog = require('../models/ExerciseLog');
const Exercise = require('../models/Exercise');
const User = require('../models/User');
const passageAuthMiddleware = require('../utils/passageMiddleware');

// POST: Create a new ExerciseLog
router.post('/create', passageAuthMiddleware, async (req, res) => {
  try {
    const { exercise, performedDate, reps, weight, duration, distance } = req.body;
    const userPassageId = res.user.id;
    const user = await User.findOne({ passage_id: userPassageId });

    const newExerciseLog = new ExerciseLog({
      user,
      exercise,
      performedDate,
      reps,
      weight,
      duration,
      distance
    });

    await newExerciseLog.save();
    await Exercise.findByIdAndUpdate(exercise, { $push: { logs: newExerciseLog._id } });
    res.status(201).json({ message: 'ExerciseLog created successfully', newExerciseLog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// GET: Retrieve a specific ExerciseLog by ID
router.get('/:exerciseLogId', passageAuthMiddleware, async (req, res) => {
  try {
    const exerciseLogId = req.params.exerciseLogId;
    const exerciseLog = await ExerciseLog.findById(exerciseLogId).populate('exercise');

    if (!exerciseLog) {
      return res.status(404).json({ message: 'ExerciseLog not found' });
    }

    res.json(exerciseLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// PUT: Update an existing ExerciseLog
router.put('/:exerciseLogId', passageAuthMiddleware, async (req, res) => {
  try {
    const exerciseLogId = req.params.exerciseLogId;
    const updateData = req.body;

    const updatedExerciseLog = await ExerciseLog.findByIdAndUpdate(
      exerciseLogId,
      updateData,
      { new: true }
    );

    if (!updatedExerciseLog) {
      return res.status(404).json({ message: 'ExerciseLog not found' });
    }

    res.json({ message: 'ExerciseLog updated successfully', updatedExerciseLog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// DELETE: Delete an ExerciseLog
router.delete('/:exerciseLogId', passageAuthMiddleware, async (req, res) => {
  try {
    const exerciseLogId = req.params.exerciseLogId;
    await ExerciseLog.findByIdAndDelete(exerciseLogId);

    res.json({ message: 'ExerciseLog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

module.exports = router;
