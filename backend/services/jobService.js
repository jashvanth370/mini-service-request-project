const jobRepository = require('../repositories/jobRepository');

/**
 * JobService contains the business logic for processing job requests.
 * It acts as a bridge between the Controller and the Repository.
 */
class JobService {
  async getAllJobs(filters) {
    const { category, status, search } = filters;
    let query = {};

    if (category) query.category = category;
    if (status) query.status = status;
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    return await jobRepository.findAll(query);
  }

  async getJobById(id) {
    const job = await jobRepository.findById(id);
    if (!job) {
      const error = new Error('No job found with that ID');
      error.statusCode = 404;
      throw error;
    }
    return job;
  }

  async createNewJob(jobData) {
    // Business logic like extra validation could go here
    return await jobRepository.create(jobData);
  }

  async updateJobStatus(id, status) {
    const job = await jobRepository.updateStatus(id, status);
    if (!job) {
      const error = new Error('No job found with that ID');
      error.statusCode = 404;
      throw error;
    }
    return job;
  }

  async deleteJob(id) {
    const job = await jobRepository.delete(id);
    if (!job) {
      const error = new Error('No job found with that ID');
      error.statusCode = 404;
      throw error;
    }
    return job;
  }
}

module.exports = new JobService();
