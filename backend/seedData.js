const mongoose = require('mongoose');
const Skill = require('./models/Skill');
require('dotenv').config({ path: './config.env' });

const initialSkills = [
  // Frontend Skills
  { skillName: 'HTML', percentage: 90, category: 'FRONT END', order: 0 },
  { skillName: 'CSS', percentage: 85, category: 'FRONT END', order: 1 },
  { skillName: 'JavaScript', percentage: 80, category: 'FRONT END', order: 2 },
  { skillName: 'React', percentage: 85, category: 'FRONT END', order: 3 },
  { skillName: 'SCSS/Sass', percentage: 75, category: 'FRONT END', order: 4 },
  
  // Backend Skills
  { skillName: 'Java', percentage: 90, category: 'BACK END', order: 0 },
  { skillName: 'Python', percentage: 70, category: 'BACK END', order: 1 },
  { skillName: 'Node.js', percentage: 75, category: 'BACK END', order: 2 },
  { skillName: 'Express.js', percentage: 80, category: 'BACK END', order: 3 },
  
  // Database Skills
  { skillName: 'MongoDB', percentage: 85, category: 'DATABASE', order: 0 },
  { skillName: 'SQL', percentage: 80, category: 'DATABASE', order: 1 },
  { skillName: 'MySQL', percentage: 75, category: 'DATABASE', order: 2 },
  
  // Tools & Others
  { skillName: 'Git', percentage: 85, category: 'TOOLS', order: 0 },
  { skillName: 'GitHub', percentage: 90, category: 'TOOLS', order: 1 },
  { skillName: 'VS Code', percentage: 95, category: 'TOOLS', order: 2 },
  { skillName: 'Postman', percentage: 80, category: 'TOOLS', order: 3 }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing skills
    await Skill.deleteMany({});
    console.log('Cleared existing skills');

    // Insert initial skills
    await Skill.insertMany(initialSkills);
    console.log('Seeded initial skills data');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
