const jobService = require('../services/jobService');

/**
 * JobController handles the HTTP layer - receiving requests and sending responses.
 * It delegates all business logic to the JobService.
 */

exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.getAllJobs(req.query);

    res.status(200).json({
      status: 'success',
      results: jobs.length,
      data: { jobs },
    });
  } catch (err) {
    next(err);
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const job = await jobService.getJobById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { job },
    });
  } catch (err) {
    next(err);
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const newJob = await jobService.createNewJob(req.body);

    res.status(201).json({
      status: 'success',
      data: { job: newJob },
    });
  } catch (err) {
    // Mongoose validation errors are handled by global error handler
    // but we can catch them specifically here if needed.
    if (err.name === 'ValidationError') {
      err.statusCode = 400;
    }
    next(err);
  }
};

exports.updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const job = await jobService.updateJobStatus(req.params.id, status);

    res.status(200).json({
      status: 'success',
      data: { job },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    await jobService.deleteJob(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
