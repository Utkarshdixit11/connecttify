
import React, { useState, useMemo } from 'react';
import { MOCK_JOBS } from '../constants';
import { Job } from '../types';
import { Card, Button, Badge, Modal, Input, Textarea, Toast } from '../components/ui';

const JobCard: React.FC<{ job: Job; onApply: (job: Job) => void; onView: (job: Job) => void }> = ({ job, onApply, onView }) => {
    return (
        <Card className="p-6 flex flex-col">
            <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                <p className="text-md text-primary">{job.company}</p>
                <p className="text-sm text-gray-500">{job.location} {job.remote && <Badge color="green">Remote</Badge>}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                    {job.skills.map(skill => <Badge key={skill} color="gray">{skill}</Badge>)}
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
                <Button variant="ghost" className="flex-1" onClick={() => onView(job)}>View Details</Button>
                <Button className="flex-1" onClick={() => onApply(job)}>Apply</Button>
            </div>
        </Card>
    );
};

const JobsPage: React.FC = () => {
    const [jobs, setJobs] = useState(MOCK_JOBS);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isApplyModalOpen, setApplyModalOpen] = useState(false);
    const [isPostModalOpen, setPostModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [showToast, setShowToast] = useState<string | null>(null);
    
    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => 
            (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (location ? job.location === location : true)
        ).sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    }, [jobs, searchTerm, location]);

    const handleApply = (job: Job) => {
        setSelectedJob(job);
        setApplyModalOpen(true);
    };

    const handleView = (job: Job) => {
        setSelectedJob(job);
        setViewModalOpen(true);
    };

    const submitApplication = () => {
        setApplyModalOpen(false);
        setShowToast('Application submitted successfully!');
    };

    const submitNewJob = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newJob: Job = {
            id: `job-${Date.now()}`,
            title: formData.get('title') as string,
            company: formData.get('company') as string,
            location: formData.get('location') as string,
            description: formData.get('description') as string,
            // Mock other fields
            posterType: 'alumni',
            remote: formData.get('remote') === 'on',
            skills: (formData.get('skills') as string).split(',').map(s => s.trim()),
            experienceLevel: 'Mid',
            postedAt: new Date().toISOString(),
        };
        setJobs(prevJobs => [newJob, ...prevJobs]);
        setPostModalOpen(false);
        setShowToast('Job posted successfully!');
    };

    return (
        <div className="space-y-6">
            {showToast && <Toast message={showToast} type="success" onDismiss={() => setShowToast(null)} />}
            <Card className="p-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Job Board</h1>
                    <p className="text-gray-600">Opportunities from the alumni network.</p>
                </div>
                <Button onClick={() => setPostModalOpen(true)}>Post a Job</Button>
            </Card>

            <Card className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Search by title or company" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    <Input label="Filter by location" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g., Remote" />
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map(job => <JobCard key={job.id} job={job} onApply={handleApply} onView={handleView} />)}
            </div>

            {/* View Details Modal */}
            <Modal isOpen={isViewModalOpen} onClose={() => setViewModalOpen(false)} title={selectedJob?.title || ''}>
                <div className="space-y-4">
                    <h4 className="font-bold text-lg">{selectedJob?.company} - {selectedJob?.location}</h4>
                    <p className="text-gray-700">{selectedJob?.description}</p>
                    <div>
                        <h5 className="font-semibold">Required Skills:</h5>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedJob?.skills.map(s => <Badge key={s}>{s}</Badge>)}
                        </div>
                    </div>
                </div>
            </Modal>
            
            {/* Apply Modal */}
            <Modal isOpen={isApplyModalOpen} onClose={() => setApplyModalOpen(false)} title={`Apply for ${selectedJob?.title}`}>
                <div className="space-y-4">
                    <Input label="Full Name" type="text" required />
                    <Input label="Email" type="email" required />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload CV (mock)</label>
                        <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-blue-200"/>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                    <Button variant="ghost" onClick={() => setApplyModalOpen(false)}>Cancel</Button>
                    <Button onClick={submitApplication}>Submit Application</Button>
                </div>
            </Modal>

            {/* Post Job Modal */}
            <Modal isOpen={isPostModalOpen} onClose={() => setPostModalOpen(false)} title="Post a New Job">
                <form onSubmit={submitNewJob} className="space-y-4">
                    <Input name="title" label="Job Title" required/>
                    <Input name="company" label="Company" required/>
                    <Input name="location" label="Location" required/>
                    <Input name="skills" label="Skills (comma separated)" required/>
                    <Textarea name="description" label="Job Description" rows={5} required/>
                    <div className="flex items-center">
                        <input id="remote" name="remote" type="checkbox" className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"/>
                        <label htmlFor="remote" className="ml-2 block text-sm text-gray-900">Remote position</label>
                    </div>
                    <div className="mt-6 flex justify-end space-x-2">
                        <Button variant="ghost" type="button" onClick={() => setPostModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Post Job</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default JobsPage;
