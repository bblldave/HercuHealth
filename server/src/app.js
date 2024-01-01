const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./api/user');
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
