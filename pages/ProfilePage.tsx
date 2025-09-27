
import React, { useMemo, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MOCK_ALUMNI } from '../constants';
import { useAuth } from '../context/AuthContext';
import { Card, Button, Badge, Avatar, Modal, Input, Textarea, Toast } from '../components/ui';
import { AlumniProfile, PrivacySetting } from '../types';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // In a real app, you would fetch this data. Here we manage a local copy of state.
  const [alumniData, setAlumniData] = useState(MOCK_ALUMNI); 
  
  const profile = useMemo(() => alumniData.find(p => p.id === id), [id, alumniData]);
  const [editedProfile, setEditedProfile] = useState<AlumniProfile | null>(profile || null);

  const canEdit = user?.role === 'admin' || user?.profileId === profile?.id;

  if (!profile) {
    return <Navigate to="/" />;
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (editedProfile) {
        setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
    }
  };

  const handleSave = () => {
    if (editedProfile) {
        // In a real app, this would be an API call.
        const updatedAlumni = alumniData.map(p => p.id === editedProfile.id ? editedProfile : p);
        setAlumniData(updatedAlumni);
        setIsEditing(false);
        setShowToast(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {showToast && <Toast message="Profile updated successfully!" type="success" onDismiss={() => setShowToast(false)} />}
      <Card>
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
            <Avatar src={profile.photoUrl} alt={profile.name} size="xl" />
            <div className="mt-4 md:mt-0 flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-lg text-primary">{profile.currentRole} at {profile.company}</p>
              <p className="text-md text-gray-600">{profile.location}</p>
              <p className="text-sm text-gray-500">Batch of {profile.batchYear} - {profile.department}</p>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                {profile.skills.map(skill => <Badge key={skill}>{skill}</Badge>)}
              </div>
            </div>
            {canEdit && <Button onClick={() => { setEditedProfile(profile); setIsEditing(true); }} className="mt-4 md:mt-0">Edit Profile</Button>}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-700 whitespace-pre-line">{profile.bio}</p>
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Projects</h2>
              {profile.projects.map((proj, idx) => (
                <div key={idx} className="mb-4">
                  <h3 className="font-bold">{proj.title}</h3>
                  <p className="text-gray-600">{proj.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Links</h2>
              <ul className="space-y-2">
                {profile.links.linkedin && <li><a href={profile.links.linkedin} className="text-accent hover:underline">LinkedIn</a></li>}
                {profile.links.github && <li><a href={profile.links.github} className="text-accent hover:underline">GitHub</a></li>}
              </ul>
            </div>
          </Card>
        </div>
      </div>

       <Modal isOpen={isEditing && editedProfile !== null} onClose={() => setIsEditing(false)} title="Edit Profile">
          <div className="space-y-4">
             <Input label="Name" name="name" value={editedProfile?.name} onChange={handleEditChange} />
             <Input label="Current Role" name="currentRole" value={editedProfile?.currentRole} onChange={handleEditChange} />
             <Input label="Company" name="company" value={editedProfile?.company} onChange={handleEditChange} />
             <Textarea label="Bio" name="bio" value={editedProfile?.bio} onChange={handleEditChange} rows={4} />
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Privacy</label>
                <select name="privacy" value={editedProfile?.privacy} onChange={handleEditChange} className="w-full p-2 border rounded">
                    {Object.values(PrivacySetting).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
             </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
          </div>
       </Modal>
    </div>
  );
};

export default ProfilePage;
