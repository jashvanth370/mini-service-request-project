const mongoose = require('mongoose');
const validator = require('validator');

const jobRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a job description'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: {
      values: ['Plumbing', 'Electrical', 'Painting', 'Joinery', 'Gardening', 'Other'],
      message: 'Category is either: Plumbing, Electrical, Painting, Joinery, Gardening, or Other',
    },
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
  },
  contactName: {
    type: String,
    required: [true, 'Please provide a contact name'],
  },
  contactEmail: {
    type: String,
    required: [true, 'Please provide a contact email'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JobRequest = mongoose.model('JobRequest', jobRequestSchema);

module.exports = JobRequest;
