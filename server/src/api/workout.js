const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const Day = require('../models/Day');
const passageAuthMiddleware = require('../utils/passageMiddleware');

// POST: Create a new Workout
router.post('/create', passageAuthMiddleware, async (req, res) => {
  try {
    const { workoutName, exercises, day, durationMinutes, equipment, targets } = req.body;

    const newWorkout = new Workout({
      workoutName,
      exercises,
      day,
      durationMinutes,
      equipment,
      targets,
    });

    await newWorkout.save();
    if (day) {
      await Day.findByIdAndUpdate(day, { $push: { workouts: { workout: newWorkout._id, completed: false } } });
    }
    res.status(201).json({ message: 'Workout created successfully', newWorkout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// GET: Retrieve a specific Workout by ID
router.get('/:workoutId', passageAuthMiddleware, async (req, res) => {
  try {
    const workoutId = req.params.workoutId;
    const workout = await Workout.findById(workoutId);

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// PUT: Update an existing Workout
router.put('/:workoutId', passageAuthMiddleware, async (req, res) => {
  try {
    const workoutId = req.params.workoutId;
    const updateData = req.body;

    const updatedWorkout = await Workout.findByIdAndUpdate(
      workoutId,
      updateData,
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.json({ message: 'Workout updated successfully', updatedWorkout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// PATCH: Toggle the completed status of a workout
router.patch('/toggle-completed/:dayId/:workoutId', passageAuthMiddleware, async (req, res) => {
  try {
    const { dayId, workoutId } = req.params;

    const day = await Day.findById(dayId);
    if (!day) {
      return res.status(404).json({ message: 'Day not found' });
    }

    const workout = day.workouts.id(workoutId);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    workout.completed = !workout.completed;
    await day.save();
    const populatedDay = await Day.findById(dayId).populate('workouts.workout');


    res.json({ message: 'Workout updated successfully', day: populatedDay });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// DELETE: Delete a Workout
router.delete('/workout/:workoutId', passageAuthMiddleware, async (req, res) => {
  try {
    const workoutId = req.params.workoutId;
    await Workout.findByIdAndDelete(workoutId);

    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

module.exports = router;
