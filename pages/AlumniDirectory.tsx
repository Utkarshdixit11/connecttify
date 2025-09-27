
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_ALUMNI } from '../constants';
import { AlumniProfile, ProfileStatus } from '../types';
import { Card, Button, Badge, Avatar, Input, Modal } from '../components/ui';

const AlumniCard: React.FC<{ alumni: AlumniProfile, onConnect: (name: string) => void }> = ({ alumni, onConnect }) => (
  <Card className="flex flex-col text-center items-center p-6 space-y-4">
    <Avatar src={alumni.photoUrl} alt={alumni.name} size="lg" />
    <div className="space-y-1">
      <h3 className="text-lg font-semibold text-gray-900">{alumni.name}</h3>
      <p className="text-sm text-primary font-medium">{alumni.currentRole} at {alumni.company}</p>
      <p className="text-xs text-gray-500">Batch of {alumni.batchYear}</p>
      {alumni.status === ProfileStatus.PENDING && <Badge color="yellow">Pending Approval</Badge>}
    </div>
    <div className="flex flex-wrap justify-center gap-2 pt-2">
      {alumni.skills.slice(0, 3).map(skill => <Badge key={skill} color="gray">{skill}</Badge>)}
    </div>
    <div className="pt-4 flex space-x-2 w-full">
      <Link to={`/alumni/${alumni.id}`} className="flex-1">
        <Button variant="ghost" className="w-full">View Profile</Button>
      </Link>
      <Button onClick={() => onConnect(alumni.name)} className="flex-1">Connect</Button>
    </div>
  </Card>
);

const AlumniDirectory: React.FC = () => {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [batchYear, setBatchYear] = useState('');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [connectAlumniName, setConnectAlumniName] = useState('');
  
  const uniqueDepartments = useMemo(() => [...new Set(MOCK_ALUMNI.map(a => a.department))], []);
  const uniqueYears = useMemo(() => [...new Set(MOCK_ALUMNI.map(a => a.batchYear))].sort((a,b)=>b-a), []);

  const filteredAlumni = useMemo(() => {
    return MOCK_ALUMNI.filter(alumni => {
        const nameMatch = alumni.name.toLowerCase().includes(search.toLowerCase());
        const departmentMatch = department ? alumni.department === department : true;
        const yearMatch = batchYear ? alumni.batchYear.toString() === batchYear : true;
        return nameMatch && departmentMatch && yearMatch;
    });
  }, [search, department, batchYear]);

  const handleConnect = (name: string) => {
    setConnectAlumniName(name);
    setIsConnectModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Alumni Directory</h1>
        <p className="text-gray-600">Find and connect with fellow alumni.</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input 
            label="Search by name" 
            placeholder="e.g., Alice Johnson" 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Department</label>
            <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                value={department}
                onChange={e => setDepartment(e.target.value)}
            >
                <option value="">All Departments</option>
                {uniqueDepartments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Batch Year</label>
            <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                value={batchYear}
                onChange={e => setBatchYear(e.target.value)}
            >
                <option value="">All Years</option>
                {uniqueYears.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAlumni.map(alumni => (
          <AlumniCard key={alumni.id} alumni={alumni} onConnect={handleConnect} />
        ))}
      </div>
      
      <Modal 
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        title={`Send connection request to ${connectAlumniName}`}
      >
        <p>In a real application, you could write a personalized message here. For this prototype, clicking "Send" will just close this dialog.</p>
        <div className="mt-4">
            <textarea className="w-full p-2 border rounded" placeholder="Your message..."></textarea>
        </div>
        <div className="mt-4 flex justify-end">
            <Button onClick={() => setIsConnectModalOpen(false)}>Send Request</Button>
        </div>
      </Modal>

    </div>
  );
};

export default AlumniDirectory;
