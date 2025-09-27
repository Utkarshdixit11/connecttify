
import React, { useState, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Card } from '../components/ui';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-primary">CONNECTTify</h1>
        <p className="text-neutral-600 mt-2">Your Professional Alumni Network</p>
      </div>
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@connecttify.com"
            required
          />
           <div className="text-xs text-gray-500">
              
              
          </div>
          <Button type="submit" className="w-full" size="lg">
            Log In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
