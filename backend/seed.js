require('dotenv').config();
const mongoose = require('mongoose');
const JobRequest = require('./models/JobRequest');

const DB = process.env.DATABASE_URL || 'mongodb://localhost:27017/service-request-board';

const jobs = [
  {
    title: 'Leaking kitchen tap in Glasgow',
    description: 'The kitchen tap has been dripping for two days. It seems like the washer needs replacing. Need someone available this weekend.',
    category: 'Plumbing',
    location: 'Glasgow',
    contactName: 'Alice Smith',
    contactEmail: 'alice@example.com',
    status: 'Open'
  },
  {
    title: 'Install new light fixtures in living room',
    description: 'I have purchased three pendant lights that need to be installed in the living room. High ceilings (3m).',
    category: 'Electrical',
    location: 'Edinburgh',
    contactName: 'Bob Jones',
    contactEmail: 'bob@example.com',
    status: 'Open'
  },
  {
    title: 'Paint master bedroom walls',
    description: 'Need the walls of a 4x4m bedroom painted. I have the paint ready (Dulux White). One coat should be enough.',
    category: 'Painting',
    location: 'Glasgow',
    contactName: 'Charlie Brown',
    contactEmail: 'charlie@example.com',
    status: 'In Progress'
  },
  {
    title: 'Fix broken garden fence',
    description: 'Two panels of the garden fence were blown down during the storm. Need them re-attached or replaced.',
    category: 'Gardening',
    location: 'Dundee',
    contactName: 'David Wilson',
    contactEmail: 'david@example.com',
    status: 'Open'
  },
  {
    title: 'Assemble IKEA wardrobe',
    description: 'Need help assembling a large PAX wardrobe. It has sliding doors and several internal drawers.',
    category: 'Joinery',
    location: 'Glasgow',
    contactName: 'Emma Watson',
    contactEmail: 'emma@example.com',
    status: 'Closed'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('DB Connected for seeding...');
    
    await JobRequest.deleteMany();
    console.log('Cleared existing jobs');
    
    await JobRequest.insertMany(jobs);
    console.log('Sample jobs inserted!');
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
