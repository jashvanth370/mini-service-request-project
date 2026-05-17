require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobRouter = require('./routes/jobRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobRouter);

// 404 Handler - Catch-all for any unmatched routes
app.use((req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  err.status = 'fail';
  next(err);
});

// Global Error Handler
app.use(errorHandler);

// Database Connection
const DB = "mongodb+srv://db_user:wXEwhLQ2oQ6DDohK@cluster0.j1yuxb6.mongodb.net/?appName=Cluster0" || 'mongodb://localhost:27017/service-request-board';

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.error('DB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
