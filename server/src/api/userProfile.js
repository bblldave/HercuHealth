const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');
const passageAuthMiddleware = require('../utils/passageMiddleware');

router.get('/', passageAuthMiddleware, async (req, res) => {
  try {
    const userPassageId = res.user.id;
    const user = await User.findOne({ passage_id: userPassageId });
    const userProfile = await UserProfile.findOne({ userId: user._id });

    if (!userProfile) {
      return res.status(404).json({ message: 'UserProfile not found' });
    }

    res.json(userProfile);
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

module.exports = router;

