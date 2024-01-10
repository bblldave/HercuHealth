const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');
const WorkoutHistory = require('../models/WorkoutHistory');
const passageAuthMiddleware = require('../utils/passageMiddleware');

router.get('/', passageAuthMiddleware, async (req, res) => {
  try {
    const userPassageId = res.user.id;
    const user = await User.findOne({ passage_id: userPassageId });
    const userProfile = await UserProfile.findOne({ userId: user._id }).populate({
      path: 'activePrograms'
    });

    if (!userProfile) {
      return res.status(404).json({ message: 'UserProfile not found' });
    }

    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

router.get('/activePrograms', passageAuthMiddleware, async (req, res) => {
  try {
    const userPassageId = res.user.id;
    const user = await User.findOne({ passage_id: userPassageId });
    const userProfile = await UserProfile.findOne({ userId: user._id }).populate({
      path: 'activePrograms'
    });

    if (!userProfile) {
      return res.status(404).json({ message: 'UserProfile not found' });
    }

    res.json(userProfile.activePrograms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

router.get('/workoutHistory', passageAuthMiddleware, async (req, res) => {
  try {
    const userPassageId = res.user.id;
    const user = await User.findOne({ passage_id: userPassageId });
    const userProfile = await UserProfile.findOne({ userId: user._id }).populate({
      path: 'workoutHistory',
      populate: [
        {
          path: 'workoutId',
          model: 'Workout'
        },
        {
          path: 'programId',
          model: 'Program'
        }
      ]
    });

    if (!userProfile) {
      return res.status(404).json({ message: 'UserProfile not found' });
    }

    res.json(userProfile.workoutHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

router.put('/update', passageAuthMiddleware, async (req, res) => {
  try {
    const userPassageId = res.user.id;
    const user = await User.findOne({ passage_id: userPassageId });
    const updateData = req.body;

    const updatedUserProfile = await UserProfile.findOneAndUpdate(
      { userId: user._id },
      updateData,
      { new: true }
    );

    if (!updatedUserProfile) {
      return res.status(404).json({ message: 'UserProfile not found' });
    }

    res.json({ message: 'UserProfile updated successfully', updatedUserProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

router.put('/activateProgram', passageAuthMiddleware, async (req, res) => {
  try {
    const userPassageId = res.user.id;
    const user = await User.findOne({ passage_id: userPassageId });
    const userProfile = await UserProfile.findOne({ userId: user._id });
    const { programId } = req.body;

    if (!userProfile) {
      return res.status(404).json({ message: 'User Profile not found' });
    }

    // Check if the program is already active
    if (userProfile.activePrograms.includes(programId)) {
      return res.status(400).json({ message: 'Program already active' });
    }

    // Add the program to the activePrograms array
    userProfile.activePrograms.push(programId);
    await userProfile.save();

    res.json({ message: 'Program activated successfully', userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

router.post('/workoutHistory', passageAuthMiddleware, async (req, res) => {
  try {
    const userPassageId = res.user.id;
    const user = await User.findOne({ passage_id: userPassageId });
    const userProfile = await UserProfile.findOne({ userId: user._id });
    const { dateCompleted, programId, workoutId, duration } = req.body;

    if (!userProfile) {
      return res.status(404).json({ message: 'UserProfile not found' });
    }

    const newWorkoutHistory = new WorkoutHistory({ dateCompleted, programId, workoutId, duration });
    await newWorkoutHistory.save();
    userProfile.workoutHistory.push(newWorkoutHistory._id);
    await userProfile.save();

    res.status(201).json({ message: 'Workout history added successfully', userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});



module.exports = router;

