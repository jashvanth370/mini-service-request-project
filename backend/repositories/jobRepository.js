const JobRequest = require('../models/JobRequest');

/**
 * JobRepository handles all direct interactions with the MongoDB collection.
 */
class JobRepository {
  async findAll(query = {}) {
    return await JobRequest.find(query).sort('-createdAt');
  }

  async findById(id) {
    return await JobRequest.findById(id);
  }

  async create(jobData) {
    return await JobRequest.create(jobData);
  }

  async updateStatus(id, status) {
    return await JobRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    return await JobRequest.findByIdAndDelete(id);
  }
}

module.exports = new JobRepository();
