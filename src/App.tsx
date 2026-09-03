import { useEffect } from 'react';
import { AppRoutes } from '@/routes/AppRoutes';
import { ToastContainer } from '@/components/common/ToastContainer';
import { useAuthStore } from '@/store/authStore';

function App() {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
