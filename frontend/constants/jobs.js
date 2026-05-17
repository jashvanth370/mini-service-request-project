export const CATEGORIES = [
  'Plumbing',
  'Electrical',
  'Painting',
  'Joinery',
  'Gardening',
  'Other'
];

export const STATUSES = [
  { label: 'Open', value: 'Open', class: 'badge-open' },
  { label: 'In Progress', value: 'In Progress', class: 'badge-progress' },
  { label: 'Closed', value: 'Closed', class: 'badge-closed' }
];

export const getStatusClass = (status) => {
  const s = STATUSES.find(item => item.value === status);
  return s ? s.class : '';
};
