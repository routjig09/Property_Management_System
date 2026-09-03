import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { LoadingState } from '@/components/common/LoadingState';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) return <LoadingState message="Checking authentication..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
