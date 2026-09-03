import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const store = useAuthStore();
  
  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    login: store.login,
    register: store.register,
    logout: store.logout,
    checkAuth: store.checkAuth,
    isAdmin: store.isAdmin(),
    isCustomer: store.isCustomer()
  };
};
