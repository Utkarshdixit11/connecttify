
import { User, UserRole, AlumniProfile, PrivacySetting, ProfileStatus, Job, Mentor } from './types';

export const MOCK_USERS: User[] = [
  { id: 'user-1', email: 'admin@connecttify.com', role: UserRole.ADMIN },
  { id: 'user-2', email: 'alumni@connecttify.com', role: UserRole.ALUMNI, profileId: 'alumni-1' },
  { id: 'user-3', email: 'student@connecttify.com', role: UserRole.STUDENT },
];

export const MOCK_ALUMNI: AlumniProfile[] = Array.from({ length: 20 }, (_, i) => ({
  id: `alumni-${i + 1}`,
  name: ['Utkarsh Dixit', 'Shanshank Sharma', 'Arjun Redddy', 'Kshitij Kushwaha', 'Devesh Upadhyay', 'Amitesh', 'Eshita', 'Ayush ', 'Ishaan Iyer', 'Devansh Yadav', 'Aditya Singh', 'Rudra Menon', 'Kunal Deshmukh', 'Shaurya Gupta', 'Nirav Patel', 'Aditya Singh ', 'Raghav Kapoor', 'Samar Nair', 'Moksh Bansal', 'Yuvraj Rathore'][i % 20],
  batchYear: 2015 + (i % 8),
  department: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Business Administration', 'Civil Engineering'][i % 5],
  currentRole: ['Software Engineer', 'Product Manager', 'Data Scientist', 'Marketing Director', 'Lead Architect'][i % 5],
  company: ['Google', 'Microsoft', 'Amazon', 'Facebook', 'Apple'][i % 5],
  location: ['Pune', 'Banglore', 'Lucknow', 'Hyderbad', 'Noida'][i % 5],
  skills: [['React', 'Node.js', 'TypeScript'], ['Project Management', 'Agile'], ['Python', 'Machine Learning', 'SQL'], ['Digital Marketing', 'SEO'], ['AWS', 'Microservices', 'DevOps']][i % 5],
  bio: 'A passionate professional with extensive experience in creating innovative solutions. Eager to connect and share knowledge with fellow alumni and students.',
  projects: [{ title: 'Project Titan', description: 'Led the development of a scalable web application.' }],
  achievements: ['Won the 2020 Innovator of the Year award.'],
  links: {
    linkedin: 'https://linkedin.com/in/example',
    github: 'https://github.com/example',
  },
  privacy: PrivacySetting.ALUMNI_ONLY,
  photoUrl: `https://picsum.photos/seed/${i + 1}/200/200`,
  status: i % 10 === 0 ? ProfileStatus.PENDING : ProfileStatus.APPROVED,
}));
MOCK_ALUMNI[0].name = "Utkarsh Dixit";
MOCK_ALUMNI[0].status = ProfileStatus.APPROVED;


export const MOCK_JOBS: Job[] = Array.from({ length: 15 }, (_, i) => ({
  id: `job-${i + 1}`,
  title: ['Frontend Developer', 'Backend Engineer', 'UX Designer', 'DevOps Specialist', 'Data Analyst'][i % 5],
  company: ['Innovate Inc.', 'Tech Solutions', 'Creative Minds', 'Data Corp', 'Future Systems'][i % 5],
  posterType: i % 3 === 0 ? 'alumni' : 'recruiter',
  location: ['Remote', 'Lucknow', 'Noida', 'Banglore'][i % 4],
  remote: i % 4 === 0,
  skills: [['React', 'CSS'], ['Go', 'PostgreSQL'], ['Figma', 'User Research'], ['Kubernetes', 'Terraform'], ['Tableau', 'SQL']][i % 5],
  // FIX: Cast experienceLevel to the correct literal type to match the Job interface.
  experienceLevel: ['Entry', 'Mid', 'Senior', 'Lead'][i % 4] as 'Entry' | 'Mid' | 'Senior' | 'Lead',
  description: 'Seeking a talented individual to join our dynamic team. This role offers competitive salary, great benefits, and opportunities for growth.',
  postedAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
}));

export const MOCK_MENTORS: Mentor[] = MOCK_ALUMNI.slice(0, 10).map((alumni, i) => ({
  id: `mentor-${i + 1}`,
  alumniId: alumni.id,
  name: alumni.name,
  photoUrl: alumni.photoUrl,
  domains: [['Software Development', 'Career Growth'], ['Product Management'], ['Data Science'], ['Marketing Strategy'], ['Cloud Architecture']][i % 5],
  availabilitySlots: [
    { date: '2025-08-10', time: '10:00 AM', id: 'slot-1' },
    { date: '2025-08-10', time: '02:00 PM', id: 'slot-2' },
    { date: '2025-08-11', time: '11:00 AM', id: 'slot-3' },
  ],
  bio: `Experienced ${alumni.currentRole} at ${alumni.company}. Happy to provide guidance on career paths and skill development.`,
}));
