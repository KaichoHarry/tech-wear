'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginPageBackground } from '../components/LoginPageBackground';
import { LoginPageTitle } from '../components/LoginPageTitle';
import { LoginCard } from '../components/LoginCard';
import { EmailInput } from '../components/EmailInput';
import { PasswordInput } from '../components/PasswordInput';
import { PasswordConfirmInput } from '../components/PasswordConfirmInput';
import { Button } from '../components/ui/button';

export default function CreateAccountPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle account creation
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Password match validation
    if (password !== passwordConfirm) {
      alert('Error: Passwords do not match.');
      return;
    }

    setIsLoading(true);

    // Get backend URL from environment variables
    const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      // 2. Call backend API for registration
      const response = await fetch(`${BACKEND_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 3. Success case
        alert('Account created successfully! Please log in.');
        router.push('/login');
      } else {
        // 4. Handle errors from backend (e.g., domain check fail or duplicate email)
        const errorMessage = data.detail || 'Unknown error occurred.';
        alert(`Registration Failed: ${errorMessage}`);
      }
    } catch (error) {
      // Network errors (e.g., server is not running)
      console.error('Connection Error:', error);
      alert('Network error occurred. Please check if the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="relative size-full min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <LoginPageBackground imageUrl="https://images.unsplash.com/photo-1763824969015-e5d1d6755782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGJvdXRpcXVlJTIwc2hvcHxlbnwxfHx8fDE3Njg4MDg5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />

      {/* Create Account Form Container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Title */}
        <LoginPageTitle 
          title="Tech Wear"
          subtitle="Create Your Account"
        />

        {/* Create Account Form Card */}
        <LoginCard onSubmit={handleCreateAccount}>
          {/* Email Input */}
          <EmailInput value={email} onChange={setEmail} />

          {/* Password Input */}
          <PasswordInput value={password} onChange={setPassword} />

          {/* Password Confirm Input */}
          <PasswordConfirmInput value={passwordConfirm} onChange={setPasswordConfirm} />

          {/* Create Account Button */}
          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-black hover:bg-gray-800 text-white py-6"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>

          {/* Navigate to Login Button */}
          <Button 
            type="button"
            variant="outline"
            onClick={handleNavigateToLogin}
            className="w-full border-2 border-gray-300 hover:bg-gray-50 py-6"
          >
            Already have an account? Log in
          </Button>
        </LoginCard>
      </div>
    </div>
  );
}