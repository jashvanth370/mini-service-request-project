import { CATEGORIES } from '@/constants/jobs';

export default function CategoryFilter({ selected, onChange, onStatusChange, status }) {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <select 
        className="form-control" 
        style={{ width: 'auto' }}
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      
      <select 
        className="form-control" 
        style={{ width: 'auto' }}
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
}
