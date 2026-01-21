import { Button } from './ui/button';

interface LoginButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export function LoginButton({ type = 'submit', onClick }: LoginButtonProps) {
  return (
    <Button 
      type={type}
      onClick={onClick}
      className="w-full bg-black hover:bg-gray-800 text-white py-6"
    >
      Log in
    </Button>
  );
}
