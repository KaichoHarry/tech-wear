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

  // --- パスワードの強度チェックロジック ---
  const isPasswordValid = 
    password.length >= 8 && 
    password.length <= 32 &&
    /[A-Za-z]/.test(password) &&
    /\d/.test(password) &&
    /[@$!%*#?&]/.test(password);

  // フォーム全体の送信可否
  const canSubmit = isPasswordValid && password === passwordConfirm && email !== '' && !isLoading;

  // Handle account creation
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    // 二重チェック（念のため）
    if (!isPasswordValid) {
      alert('Password does not meet the security requirements.');
      return;
    }

    // 1. Password match validation
    if (password !== passwordConfirm) {
      alert('Error: Passwords do not match.');
      return;
    }

    setIsLoading(true);

    const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
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
        alert('Account created successfully! Please log in.');
        router.push('/login');
      } else {
        const errorMessage = data.detail || 'Unknown error occurred.';
        alert(`Registration Failed: ${errorMessage}`);
      }
    } catch (error) {
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
      <LoginPageBackground imageUrl="https://images.unsplash.com/photo-1763824969015-e5d1d6755782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGJvdXRpcXVlJTIwc2hvcHxlbnwxfHx8fDE3Njg4MDg5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />

      <div className="relative z-10 w-full max-w-md mx-4">
        <LoginPageTitle 
          title="Tech Wear"
          subtitle="Create Your Account"
        />

        <LoginCard onSubmit={handleCreateAccount}>
          <EmailInput value={email} onChange={setEmail} />

          <PasswordInput value={password} onChange={setPassword} />

          <PasswordConfirmInput value={passwordConfirm} onChange={setPasswordConfirm} />

          {/* 送信ボタンの制御 */}
          <Button 
            type="submit"
            disabled={!canSubmit} // 条件を満たさない場合はクリック不可
            className={`w-full py-6 transition-all ${
              canSubmit ? 'bg-black hover:bg-gray-800 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>

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