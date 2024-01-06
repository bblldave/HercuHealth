const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');
const passageAuthMiddleware = require('../utils/passageMiddleware');

router.post('/register', passageAuthMiddleware, async (req, res) => {
  try {
    let user = res.user;
    newUser = new User({ email: user.email, passage_id: user.id });
    await newUser.save();
    const newUserProfile = new UserProfile({ userId: newUser._id });
    await newUserProfile.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

module.exports = router;