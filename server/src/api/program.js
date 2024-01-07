const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Program = require('../models/Program');
const passageAuthMiddleware = require('../utils/passageMiddleware');

router.get('/:programId', passageAuthMiddleware, async (req, res) => {
  try {
    const programId = req.params.programId;
    const program = await Program.findById(programId).populate({
      path: 'weeks',

      populate: {
        path: 'days',

        populate: {
          path: 'workouts',
          model: 'Workout',

          populate: {
            path: 'exercises',
            model: 'Exercise',

            populate: {
              path: 'logs',
              model: 'ExerciseLog'
            }
          }
        }
      }
    });

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json(program);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

router.post('/create', passageAuthMiddleware, async (req, res) => {
  try {
    const { name, description, durationWeeks, weeks } = req.body;
    const userPassageId = res.user.id;
    const user = await User.findOne({ passage_id: userPassageId });

    const newProgram = new Program({
      name,
      description,
      durationWeeks,
      weeks,
      createdBy: user._id
    });

    await newProgram.save();
    res.status(201).json({ message: 'Program created successfully', newProgram });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

router.put('/:programId', passageAuthMiddleware, async (req, res) => {
  try {
    const userPassageId = res.user.id;
    const user = await User.findOne({ passage_id: userPassageId });
    const programId = req.params.programId;
    const updateData = req.body;
    const program = await Program.findById(programId);

    // Only the user who created the program can update it
    if (program.createdBy.toString() !== user._id) {
      return res.status(403).json({ message: 'Unauthorized to update this program' });
    }

    const updatedProgram = await Program.findByIdAndUpdate(
      programId,
      updateData,
      { new: true }
    );

    if (!updatedProgram) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json({ message: 'Program updated successfully', updatedProgram });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});


router.delete('/:programId', passageAuthMiddleware, async (req, res) => {
  try {
    const programId = req.params.programId;
    const userPassageId = res.user.id;
    const user = await User.findOne({ passage_id: userPassageId });

    const program = await Program.findById(programId);

    // Only the user who created the program can delete it
    if (program.createdBy.toString() !== user._id) {
      return res.status(403).json({ message: 'Unauthorized to update this program' });
    }

    const programToDelete = await Program.findByIdAndDelete(programId);

    if (!programToDelete) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json({ message: 'Program deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

module.exports = router;
