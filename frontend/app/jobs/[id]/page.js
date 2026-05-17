'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { jobApi } from '@/lib/api/jobApi';
import { getStatusClass } from '@/constants/jobs';

export default function JobDetail({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [params.id]);

  const fetchJob = async () => {
    try {
      const data = await jobApi.getOne(params.id);
      if (data.status === 'success') {
        setJob(data.data.job);
      }
    } catch (err) {
      console.error('Error fetching job:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      const data = await jobApi.updateStatus(params.id, newStatus);
      if (data.status === 'success') {
        setJob(data.data.job);
      }
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this job request?')) return;

    try {
      const res = await jobApi.delete(params.id);
      if (res.status === 204) {
        router.push('/');
      }
    } catch (err) {
      alert('Failed to delete job');
    }
  };

  if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;
  if (!job) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Job not found</div>;

  return (
    <div className="container" style={{ padding: '4rem 2rem' }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--primary)', fontWeight: 600 }}>
        Back to Board
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="card" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <span className="badge" style={{ background: '#e0e7ff', color: '#4338ca' }}>{job.category}</span>
            <span className={`badge ${getStatusClass(job.status)}`}>{job.status}</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{job.title}</h1>
          <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            <span>📍 {job.location}</span>
            <span>📅 Posted on {new Date(job.createdAt).toLocaleDateString()}</span>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Description</h3>
          <p style={{ color: 'var(--text)', whiteSpace: 'pre-wrap', fontSize: '1.1rem' }}>
            {job.description}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Manage Request</h3>
            
            <div className="form-group">
              <label>Update Status</label>
              <select 
                className="form-control" 
                value={job.status}
                onChange={(e) => handleStatusUpdate(e.target.value)}
                disabled={updating}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <button onClick={handleDelete} className="btn btn-danger" style={{ width: '100%', marginTop: '0.5rem' }}>
              Delete Request
            </button>
          </div>

          <div className="card" style={{ background: '#f1f5f9', border: 'none' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Contact Homeowner</h3>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>Name</p>
              <p style={{ fontWeight: 600, color: 'var(--text)' }}>{job.contactName}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>Email</p>
              <p style={{ fontWeight: 600, color: 'var(--text)' }}>
                <a href={`mailto:${job.contactEmail}`} style={{ color: 'var(--primary)' }}>{job.contactEmail}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
