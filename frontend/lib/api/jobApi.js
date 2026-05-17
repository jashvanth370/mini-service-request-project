const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * api.js centralizes all fetch requests to the backend.
 */
export const jobApi = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_URL}/jobs?${params}`);
    return await res.json();
  },

  getOne: async (id) => {
    const res = await fetch(`${API_URL}/jobs/${id}`);
    return await res.json();
  },

  create: async (jobData) => {
    const res = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });
    return await res.json();
  },

  updateStatus: async (id, status) => {
    const res = await fetch(`${API_URL}/jobs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_URL}/jobs/${id}`, { method: 'DELETE' });
    return res;
  }
};
