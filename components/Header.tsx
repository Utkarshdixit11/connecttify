
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
// FIX: Import Button component.
import { Avatar, Button } from './ui';
import { MOCK_ALUMNI } from '../constants';

const NotificationBell: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications] = useState([
        { id: 1, message: 'New job matched your profile: Frontend Developer.', read: false },
        { id: 2, message: 'Your mentorship request was approved by Alice Johnson.', read: false },
        { id: 3, message: 'Upcoming event: Annual Alumni Meetup 2024.', read: true },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="relative text-gray-600 hover:text-primary focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a1 1 0 00-2 0v.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">{unreadCount}</span>}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20">
                    <div className="p-4 font-bold border-b">Notifications</div>
                    <ul className="divide-y max-h-96 overflow-y-auto">
                        {notifications.map(n => (
                            <li key={n.id} className={`p-4 text-sm ${!n.read ? 'bg-primary-light' : ''} hover:bg-gray-50`}>
                                {n.message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const alumniProfile = user?.profileId ? MOCK_ALUMNI.find(p => p.id === user.profileId) : null;

  const navLinkClass = ({ isActive }: {isActive: boolean}) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-primary-light text-primary' : 'text-gray-700 hover:bg-gray-100'}`;

  const mobileNavLinkClass = ({ isActive }: {isActive: boolean}) => 
    `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-primary-light text-primary' : 'text-gray-700 hover:bg-gray-100'}`;

  const navLinks = [
    { to: '/', text: 'Alumni', roles: [UserRole.STUDENT, UserRole.ALUMNI, UserRole.ADMIN] },
    { to: '/jobs', text: 'Jobs/Intership', roles: [UserRole.STUDENT, UserRole.ALUMNI, UserRole.ADMIN] },
    { to: '/mentorship', text: 'Mentorship', roles: [UserRole.STUDENT, UserRole.ALUMNI, UserRole.ADMIN] },
    { to: '/admin', text: 'Admin', roles: [UserRole.ADMIN] },
  ];

  const filteredNavLinks = navLinks.filter(link => user && link.roles.includes(user.role));

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-2xl text-primary">CONNECTTify</span>
            <nav className="hidden md:ml-10 md:flex md:space-x-4">
              {filteredNavLinks.map(link => (
                <NavLink key={link.to} to={link.to} className={navLinkClass}>
                  {link.text}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <NotificationBell />
            <div className="relative">
              {alumniProfile && <NavLink to={`/alumni/${alumniProfile.id}`}><Avatar src={alumniProfile.photoUrl} alt={alumniProfile.name} size="sm" /></NavLink>}
            </div>
            <Button onClick={logout} variant="ghost" size="sm" className="hidden sm:block">Log Out</Button>
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-primary focus:outline-none">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {filteredNavLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                {link.text}
              </NavLink>
            ))}
            <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                Log Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
