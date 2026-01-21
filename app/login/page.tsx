'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginPageBackground } from '../components/LoginPageBackground';
import { LoginPageTitle } from '../components/LoginPageTitle';
import { LoginCard } from '../components/LoginCard';
import { EmailInput } from '../components/EmailInput';
import { PasswordInput } from '../components/PasswordInput';
import { LoginButton } from '../components/LoginButton';
import { CreateAccountButton } from '../components/CreateAccountButton';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        
        // --- 【重要】ここを追加：セッション情報を保存する ---
        // ダッシュボード側のチェック（isLoggedIn, userId）と名前を合わせます
        sessionStorage.setItem('isLoggedIn', 'true');
        // Python側が返してくるキー名が "user_id" であることを確認してください
        sessionStorage.setItem('userId', data.user_id || 'UNKNOWN_ID');
        // --------------------------------------------------

        alert('Login Successful!');
        
        // 保存が完了してから遷移
        router.push('/dashboard');
      } else {
        alert(`Login Failed: ${data.detail}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Cannot connect to the server. Please check your network settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    router.push('/create_account');
  };

  return (
    <div className="relative size-full min-h-screen flex items-center justify-center">
      <LoginPageBackground imageUrl="https://images.unsplash.com/photo-1729487151777-b4be9098ecbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg3ODg2NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />

      <div className="relative z-10 w-full max-w-md mx-4">
        <LoginPageTitle 
          title="Tech Wear"
          subtitle="Welcome Back, Please Log In"
        />

        <LoginCard onSubmit={handleLogin}>
          <EmailInput value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />

          {/* ローディング中はボタンを無効化する等の処理が必要なら LoginButton 内で対応 */}
          <LoginButton />

          <CreateAccountButton onClick={handleCreateAccount} />
        </LoginCard>
      </div>
    </div>
  );
}