
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_ALUMNI, MOCK_JOBS, MOCK_MENTORS } from '../constants';
import { AlumniProfile, ProfileStatus } from '../types';
import { Card, Button, Badge, Toast } from '../components/ui';

const chartData = [
  { name: 'Jan', signups: 12, jobs: 5, sessions: 8 },
  { name: 'Feb', signups: 19, jobs: 7, sessions: 12 },
  { name: 'Mar', signups: 32, jobs: 15, sessions: 20 },
  { name: 'Apr', signups: 25, jobs: 12, sessions: 18 },
  { name: 'May', signups: 45, jobs: 22, sessions: 30 },
];

const AdminDashboard: React.FC = () => {
    const [alumni, setAlumni] = useState<AlumniProfile[]>(MOCK_ALUMNI);
    const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const pendingProfiles = useMemo(() => alumni.filter(p => p.status === ProfileStatus.PENDING), [alumni]);

    const handleApproval = (profileId: string, newStatus: ProfileStatus) => {
        setAlumni(prevAlumni =>
            prevAlumni.map(p =>
                p.id === profileId ? { ...p, status: newStatus } : p
            )
        );
        setShowToast({ message: `Profile has been ${newStatus.toLowerCase()}.`, type: 'success' });
    };

    return (
        <div className="space-y-6">
            {showToast && <Toast message={showToast.message} type={showToast.type} onDismiss={() => setShowToast(null)} />}
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                    <h3 className="text-gray-500 font-semibold">Total Alumni</h3>
                    <p className="text-3xl font-bold">{MOCK_ALUMNI.length}</p>
                </Card>
                <Card className="p-6">
                    <h3 className="text-gray-500 font-semibold">Job Postings</h3>
                    <p className="text-3xl font-bold">{MOCK_JOBS.length}</p>
                </Card>
                <Card className="p-6">
                    <h3 className="text-gray-500 font-semibold">Active Mentors</h3>
                    <p className="text-3xl font-bold">{MOCK_MENTORS.length}</p>
                </Card>
                <Card className="p-6">
                    <h3 className="text-gray-500 font-semibold">Pending Approvals</h3>
                    <p className="text-3xl font-bold text-yellow-500">{pendingProfiles.length}</p>
                </Card>
            </div>
            
            {/* Charts */}
            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Platform Activity</h2>
                 <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="signups" fill="#0077B5" name="New Alumni" />
                        <Bar dataKey="jobs" fill="#F5A623" name="Jobs Posted" />
                        <Bar dataKey="sessions" fill="#4A90E2" name="Mentor Sessions" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            {/* Approvals Queue */}
            <Card>
                <h2 className="text-xl font-semibold p-6">Profile Approvals Queue</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Year</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pendingProfiles.map(profile => (
                                <tr key={profile.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{profile.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{profile.batchYear}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{profile.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap"><Badge color="yellow">{profile.status}</Badge></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                                        <Button size="sm" onClick={() => handleApproval(profile.id, ProfileStatus.APPROVED)}>Approve</Button>
                                        <Button size="sm" variant="danger" onClick={() => handleApproval(profile.id, ProfileStatus.APPROVED)}>Reject</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {pendingProfiles.length === 0 && <p className="text-center p-6 text-gray-500">No profiles awaiting approval.</p>}
            </Card>
        </div>
    );
};

export default AdminDashboard;
