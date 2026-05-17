'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { jobApi } from '@/lib/api/jobApi';
import { CATEGORIES } from '@/constants/jobs';

export default function NewJob() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Plumbing',
    location: '',
    contactName: '',
    contactEmail: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await jobApi.create(formData);

      if (data.status === 'success') {
        router.push('/');
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '700px', padding: '4rem 2rem' }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--primary)', fontWeight: 600 }}>
        Back to Board
      </Link>
      
      <div className="card" style={{ padding: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Post a Service Request</h1>
        <p style={{ marginBottom: '2rem' }}>Fill in the details below to find the right tradesperson for your job.</p>

        {error && (
          <div style={{ padding: '1rem', background: '#fee2e2', color: '#ef4444', borderRadius: 'var(--radius)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <input 
              type="text" 
              id="title" 
              name="title"
              className="form-control" 
              placeholder="e.g. Need a plumber for a leaking kitchen tap" 
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select 
                id="category" 
                name="category"
                className="form-control" 
                required
                value={formData.category}
                onChange={handleChange}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input 
                type="text" 
                id="location" 
                name="location"
                className="form-control" 
                placeholder="Enter Location" 
                required
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Detailed Description</label>
            <textarea 
              id="description" 
              name="description"
              className="form-control" 
              rows="5" 
              placeholder="Please describe the issue in detail..." 
              required
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Contact Information</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label htmlFor="contactName">Your Name</label>
              <input 
                type="text" 
                id="contactName" 
                name="contactName"
                className="form-control" 
                placeholder="Enter Name" 
                required
                value={formData.contactName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactEmail">Email Address</label>
              <input 
                type="email" 
                id="contactEmail" 
                name="contactEmail"
                className="form-control" 
                placeholder="Enter Email" 
                required
                value={formData.contactEmail}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }} disabled={loading}>
            {loading ? 'Posting...' : 'Post Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
