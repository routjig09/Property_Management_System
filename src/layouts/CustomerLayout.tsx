import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Search, Heart, MessageSquare, FileText,
  User, Settings, LogOut, Menu, X, Bell, ChevronRight
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store/authStore';

const customerNav = [
  { label: 'Dashboard', href: '/customer/dashboard', icon: LayoutDashboard },
  { label: 'Browse Properties', href: '/properties', icon: Search },
  { label: 'Favorites', href: '/customer/favorites', icon: Heart },
  { label: 'My Inquiries', href: '/customer/inquiries', icon: MessageSquare },
  { label: 'My Requirements', href: '/customer/requirements', icon: FileText },
  { label: 'Profile', href: '/customer/profile', icon: User },
  { label: 'Settings', href: '/customer/settings', icon: Settings },
];

export function CustomerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-[var(--z-sticky)] bg-white border-b border-beige h-16 flex items-center px-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-ivory transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5 text-charcoal" />
        </button>
        <Link to="/" className="ml-3">
          <Logo variant="full" size="sm" />
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-ivory transition-colors relative">
            <Bell className="w-5 h-5 text-charcoal" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full" />
          </button>
        </div>
      </header>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-[var(--z-modal-backdrop)]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-72 bg-white border-r border-beige z-[var(--z-modal)] transition-transform duration-300 flex flex-col',
          'lg:translate-x-0 lg:z-auto',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="h-[72px] flex items-center justify-between px-6 border-b border-beige">
          <Link to="/">
            <Logo variant="full" size="sm" />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-ivory transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-beige">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center text-white font-semibold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-navy-900 truncate">{user?.name ?? 'User'}</p>
              <p className="text-xs text-charcoal-light truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Customer navigation">
          <ul className="space-y-1">
            {customerNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-navy-900 text-white shadow-sm'
                        : 'text-charcoal hover:bg-ivory hover:text-navy-900'
                    )}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                    {item.label}
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-beige">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-error hover:bg-error-light transition-colors"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72 min-h-screen">
        <div className="pt-16 lg:pt-0">
          {/* Desktop Header */}
          <header className="hidden lg:flex items-center justify-between h-[72px] px-8 bg-white border-b border-beige">
            <div>
              <h2 className="text-lg font-semibold text-navy-900 font-heading">
                {customerNav.find(n => n.href === location.pathname)?.label ?? 'Customer Portal'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-ivory transition-colors relative">
                <Bell className="w-5 h-5 text-charcoal" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full" />
              </button>
              <div className="w-px h-8 bg-beige" />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-navy-900 flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
                </div>
                <div>
                  <p className="text-sm font-medium text-navy-900">{user?.name}</p>
                  <p className="text-xs text-charcoal-light">Customer</p>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6 lg:p-10 max-w-7xl mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
