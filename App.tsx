
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import AlumniDirectory from './pages/AlumniDirectory';
import ProfilePage from './pages/ProfilePage';
import JobsPage from './pages/JobsPage';
import MentorshipPage from './pages/MentorshipPage';
import AdminDashboard from './pages/AdminDashboard';
import { UserRole } from './types';

// Wrapper to protect routes that require authentication
const ProtectedRoute: React.FC<{ children: React.ReactElement; roles?: UserRole[] }> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />; // Or a specific "access denied" page
  }
  return children;
};

const AppContent: React.FC = () => {
    const { isAuthenticated } = useAuth();
    
    return (
        <div className="bg-neutral-100 min-h-screen font-sans">
            {isAuthenticated && <Header />}
            <main className={isAuthenticated ? "p-4 sm:p-6 lg:p-8" : ""}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<ProtectedRoute><AlumniDirectory /></ProtectedRoute>} />
                    <Route path="/alumni/:id" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path="/jobs" element={<ProtectedRoute><JobsPage /></ProtectedRoute>} />
                    <Route path="/mentorship" element={<ProtectedRoute><MentorshipPage /></ProtectedRoute>} />
                    <Route 
                        path="/admin" 
                        element={
                            <ProtectedRoute roles={[UserRole.ADMIN]}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
    );
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
