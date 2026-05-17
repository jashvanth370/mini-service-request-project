import Link from 'next/link';
import { getStatusClass } from '@/constants/jobs';

export default function JobCard({ job }) {
  return (
    <Link href={`/jobs/${job._id}`} className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span className="badge" style={{ background: '#e0e7ff', color: '#4338ca' }}>{job.category}</span>
        <span className={`badge ${getStatusClass(job.status)}`}>{job.status}</span>
      </div>
      <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{job.title}</h3>
      <p style={{ 
        display: '-webkit-box', 
        WebkitLineClamp: 2, 
        WebkitBoxOrient: 'vertical', 
        overflow: 'hidden',
        marginBottom: '1.5rem',
        fontSize: '0.95rem'
      }}>
        {job.description}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        📍 <span>{job.location}</span>
      </div>
      <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem' }}>{new Date(job.createdAt).toLocaleDateString()}</span>
        <span style={{ fontWeight: 600, color: 'var(--primary)' }}>View Details</span>
      </div>
    </Link>
  );
}
