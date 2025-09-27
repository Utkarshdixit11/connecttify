
export enum UserRole {
  STUDENT = 'student',
  ALUMNI = 'alumni',
  ADMIN = 'admin',
}

export enum PrivacySetting {
  PUBLIC = 'Public',
  ALUMNI_ONLY = 'Alumni Only',
  ADMIN_ONLY = 'Admin Only',
}

export enum ProfileStatus {
  APPROVED = 'Approved',
  PENDING = 'Pending Approval',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  profileId?: string; // Links to AlumniProfile ID
}

export interface AlumniProfile {
  id: string;
  name: string;
  batchYear: number;
  department: string;
  currentRole: string;
  company: string;
  location: string;
  skills: string[];
  bio: string;
  projects: { title: string; description: string }[];
  achievements: string[];
  links: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
  privacy: PrivacySetting;
  photoUrl: string;
  status: ProfileStatus;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  posterType: 'alumni' | 'recruiter';
  location: string;
  remote: boolean;
  skills: string[];
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  description: string;
  postedAt: string;
}

export interface Mentor {
  id: string;
  alumniId: string; // Links to AlumniProfile ID
  name: string;
  photoUrl: string;
  domains: string[];
  availabilitySlots: { date: string; time: string; id: string }[];
  bio: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
}
