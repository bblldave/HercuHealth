const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./api/user');
const userProfileRoutes = require('./api/userProfile');
const programRoutes = require('./api/program');
const weekRoutes = require('./api/week');
const dayRoutes = require('./api/day');
const workoutRoutes = require('./api/workout');
const exerciseRoutes = require('./api/exercise');
const exerciseLogRoutes = require('./api/exerciseLog');
const cors = require('cors');
require('dotenv').config();

connectDB();

const app = express();
const port = 3001;


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/userProfile', userProfileRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/weeks', weekRoutes);
app.use('/api/days', dayRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/exerciseLogs', exerciseLogRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
