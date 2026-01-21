import { Lock } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface PasswordConfirmInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function PasswordConfirmInput({ value, onChange }: PasswordConfirmInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="password-confirm" className="text-sm font-medium">
        Password confirmation
      </Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
        <Input
          id="password-confirm"
          type="password"
          placeholder="••••••••"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10"
          required
        />
      </div>
    </div>
  );
}
