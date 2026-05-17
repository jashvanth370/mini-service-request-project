'use client';

import { useState, useEffect } from 'react';
import { jobApi } from '@/lib/api/jobApi';
import JobCard from '@/components/jobs/JobCard';
import CategoryFilter from '@/components/jobs/CategoryFilter';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [category, status]);

  const fetchJobs = async (isSearch = false) => {
    setLoading(true);
    try {
      const filters = {};
      if (category) filters.category = category;
      if (status) filters.status = status;
      if (search && isSearch) filters.search = search;

      const data = await jobApi.getAll(filters);
      console.log('Fetched jobs:', data);
      if (data.status === 'success') {
        setJobs(data.data.jobs);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(true);
  };

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Find Your Next <span style={{ color: 'var(--primary)' }}>Project</span></h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            The simplest way for homeowners to connect with skilled tradespeople. 
            Browse open requests or post your own.
          </p>
          
          <form onSubmit={handleSearch} style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search by keyword (e.g. leaking tap, painting...)" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, boxShadow: 'var(--shadow)' }}
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
      </section>

      <div className="container" style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h2>Available Requests</h2>
          <CategoryFilter 
            selected={category} 
            onChange={setCategory} 
            status={status} 
            onStatusChange={setStatus} 
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p>Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: 'var(--radius)', marginTop: '2rem' }}>
            <span style={{ fontSize: '3rem' }}>🔍</span>
            <h3>No requests found</h3>
            <p>Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="job-grid">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
