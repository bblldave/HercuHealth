const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');
const { Workout, WorkoutExercise } = require('../models/Workout');
const passageAuthMiddleware = require('../utils/passageMiddleware');
const apiData = require('../utils/externalApiExercises.json');

// POST: Load exercises from external API
router.post('/load', passageAuthMiddleware, async (req, res) => {
  try {
    // Convert and save exercises
    const exercises = apiData.map(exercise => new Exercise({
      name: exercise.name,
      description: exercise.instructions.join(' '),
      bodyPart: exercise.bodyPart,
      equipment: exercise.equipment,
      gifUrl: exercise.gifUrl,
      target: exercise.target,
      secondaryMuscles: exercise.secondaryMuscles,
    }));

    const savedExercises = await Exercise.insertMany(exercises);

    res.status(201).json({ message: 'Exercises loaded successfully', savedExercises });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// POST: Create a new Exercise
router.post('/create', passageAuthMiddleware, async (req, res) => {
  try {
    const {
      name,
      description,
      workout,
      bodyPart,
      equipment,
      gifUrl,
      target,
      secondaryMuscles,
      exerciseType,
      sets,
      reps,
      duration,
      distance } = req.body;

    const newExercise = new Exercise({
      name,
      description,
      workout,
      bodyPart,
      equipment,
      gifUrl,
      target,
      secondaryMuscles
    });

    await newExercise.save();


    if (workout) {
      const workoutExercise = new workoutExercise({
        exercise: newExercise._id,
        exerciseType,
        sets,
        reps,
        duration,
        distance
      });

      await workoutExercise.save();
      await Workout.findByIdAndUpdate(workout, { $push: { exercises: newExercise._id } });
    }
    res.status(201).json({ message: 'Exercise created successfully', newExercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// POST: Create a new WorkoutExercise with an existing Exercise
router.post('/create-workout-exercise', passageAuthMiddleware, async (req, res) => {
  try {
    const { exerciseId, workoutId, exerciseType, sets, reps, duration, distance } = req.body;

    // Check if the exercise exists
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    // Create a new WorkoutExercise
    const workoutExercise = new WorkoutExercise({
      exercise: exerciseId,
      exerciseType,
      sets,
      reps,
      duration,
      distance
    });

    await workoutExercise.save();

    // Add the WorkoutExercise to the workout
    if (workoutId) {
      await Workout.findByIdAndUpdate(workoutId, { $push: { exercises: workoutExercise._id } });
    }

    res.status(201).json({ message: 'WorkoutExercise created successfully', workoutExercise });
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
