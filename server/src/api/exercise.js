const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');
const Workout = require('../models/Workout');
const passageAuthMiddleware = require('../utils/passageMiddleware');

// POST: Create a new Exercise
router.post('/create', passageAuthMiddleware, async (req, res) => {
  try {
    const { name, description, exerciseType, sets, reps, duration, distance, workout } = req.body;

    const newExercise = new Exercise({
      name,
      description,
      exerciseType,
      sets,
      reps,
      duration,
      distance,
      workout
    });

    await newExercise.save();


    if (workout) {
      await Workout.findByIdAndUpdate(workout, { $push: { exercises: newExercise._id } });
    }
    res.status(201).json({ message: 'Exercise created successfully', newExercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// GET: Retrieve a specific Exercise by ID
router.get('/:exerciseId', passageAuthMiddleware, async (req, res) => {
  try {
    const exerciseId = req.params.exerciseId;
    const exercise = await Exercise.findById(exerciseId).populate('logs');

    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    res.json(exercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// PUT: Update an existing Exercise
router.put('/:exerciseId', passageAuthMiddleware, async (req, res) => {
  try {
    const exerciseId = req.params.exerciseId;
    const updateData = req.body;

    const updatedExercise = await Exercise.findByIdAndUpdate(
      exerciseId,
      updateData,
      { new: true }
    );

    if (!updatedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    res.json({ message: 'Exercise updated successfully', updatedExercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// DELETE: Delete an Exercise
router.delete('/:exerciseId', passageAuthMiddleware, async (req, res) => {
  try {
    const exerciseId = req.params.exerciseId;
    await Exercise.findByIdAndDelete(exerciseId);

    res.json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

module.exports = router;
