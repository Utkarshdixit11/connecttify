
import React, { useState, useMemo } from 'react';
import { MOCK_MENTORS } from '../constants';
import { Mentor } from '../types';
import { Card, Button, Badge, Modal, Avatar, Toast } from '../components/ui';

const MentorCard: React.FC<{ mentor: Mentor; onRequest: (mentor: Mentor) => void }> = ({ mentor, onRequest }) => (
    <Card className="p-6 text-center flex flex-col items-center space-y-3">
        <Avatar src={mentor.photoUrl} alt={mentor.name} size="lg" />
        <h3 className="text-lg font-bold">{mentor.name}</h3>
        <p className="text-sm text-gray-600 flex-grow">{mentor.bio}</p>
        <div className="flex flex-wrap justify-center gap-2 pt-2">
            {mentor.domains.map(domain => <Badge key={domain} color="blue">{domain}</Badge>)}
        </div>
        <div className="w-full pt-3">
            <Button className="w-full" onClick={() => onRequest(mentor)}>Request Session</Button>
        </div>
    </Card>
);

const MentorshipPage: React.FC = () => {
    const [mentors] = useState(MOCK_MENTORS);
    const [filterDomain, setFilterDomain] = useState('');
    const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const allDomains = useMemo(() => [...new Set(mentors.flatMap(m => m.domains))], [mentors]);

    const filteredMentors = useMemo(() => {
        if (!filterDomain) return mentors;
        return mentors.filter(mentor => mentor.domains.includes(filterDomain));
    }, [mentors, filterDomain]);

    const handleRequest = (mentor: Mentor) => {
        setSelectedMentor(mentor);
        setModalOpen(true);
    };

    const submitRequest = () => {
        setModalOpen(false);
        setShowToast(true);
    };

    return (
        <div className="space-y-6">
            {showToast && <Toast message="Mentorship request sent successfully!" type="success" onDismiss={() => setShowToast(false)} />}
            <Card className="p-6">
                <h1 className="text-3xl font-bold text-gray-800">Find a Mentor</h1>
                <p className="text-gray-600">Connect with experienced alumni for guidance.</p>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Domain</label>
                    <select
                        className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        value={filterDomain}
                        onChange={e => setFilterDomain(e.target.value)}
                    >
                        <option value="">All Domains</option>
                        {allDomains.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMentors.map(mentor => <MentorCard key={mentor.id} mentor={mentor} onRequest={handleRequest} />)}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                title={`Request a session with ${selectedMentor?.name}`}
            >
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Available Slots:</h4>
                        <div className="mt-2 space-y-2">
                            {selectedMentor?.availabilitySlots.map(slot => (
                                <label key={slot.id} className="flex items-center p-3 border rounded-md has-[:checked]:bg-primary-light has-[:checked]:border-primary">
                                    <input type="radio" name="slot" className="h-4 w-4 text-primary focus:ring-primary border-gray-300" />
                                    <span className="ml-3 text-sm">{slot.date} at {slot.time}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
                        <textarea className="w-full p-2 border rounded" rows={4} placeholder="What would you like to discuss?"></textarea>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                    <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                    <Button onClick={submitRequest}>Send Request</Button>
                </div>
            </Modal>
        </div>
    );
};

export default MentorshipPage;
