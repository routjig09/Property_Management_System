import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export function LoginRequiredModal({
  isOpen,
  onClose,
  message = 'Please sign in to access this feature.',
}: LoginRequiredModalProps) {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-navy-50 mx-auto mb-4 flex items-center justify-center">
          <LogIn className="w-7 h-7 text-navy-400" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-navy-900 mb-2">Sign In Required</h3>
        <p className="text-navy-500 font-body text-sm mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="accent"
            leftIcon={<LogIn className="w-4 h-4" />}
            onClick={() => {
              onClose();
              navigate('/login');
            }}
          >
            Sign In
          </Button>
        </div>
      </div>
    </Modal>
  );
}
