import { Lock, Check, Circle } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function PasswordInput({ value, onChange }: PasswordInputProps) {
  // バリデーションルールの定義
  const rules = [
    { label: '8-32 characters', test: (val: string) => val.length >= 8 && val.length <= 32 },
    { label: 'At least one letter', test: (val: string) => /[A-Za-z]/.test(val) },
    { label: 'At least one number', test: (val: string) => /\d/.test(val) },
    { label: 'At least one special character', test: (val: string) => /[@$!%*#?&]/.test(val) },
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="password" className="text-sm font-medium">
        Password
      </Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10"
          required
        />
      </div>

      {/* バリデーションチェックリスト */}
      <div className="mt-3 grid grid-cols-1 gap-2 border-t pt-3">
        {rules.map((rule, index) => {
          const isMet = rule.test(value);
          return (
            <div
              key={index}
              className={`flex items-center gap-2 text-xs transition-colors ${
                isMet ? 'text-green-600' : value.length > 0 ? 'text-red-400' : 'text-gray-500'
              }`}
            >
              {isMet ? (
                <Check className="size-3.5 stroke-[3]" />
              ) : (
                <Circle className="size-3.5 fill-current opacity-20" />
              )}
              <span>{rule.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}