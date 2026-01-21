import { Button } from './ui/button';

interface CreateAccountButtonProps {
  onClick: () => void;
}

export function CreateAccountButton({ onClick }: CreateAccountButtonProps) {
  return (
    <Button 
      type="button"
      variant="outline"
      onClick={onClick}
      className="w-full border-2 border-gray-300 hover:bg-gray-50 py-6"
    >
      Create an account
    </Button>
  );
}
