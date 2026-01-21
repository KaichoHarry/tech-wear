import { ReactNode } from 'react';

interface LoginCardProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginCard({ children, onSubmit }: LoginCardProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-8">
      <form onSubmit={onSubmit} className="space-y-6">
        {children}
      </form>
    </div>
  );
}
