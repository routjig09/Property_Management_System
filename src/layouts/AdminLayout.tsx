import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Users, MessageSquare, Activity,
  BarChart3, Settings, LogOut, Menu, X, Bell, ChevronRight, PlusCircle
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store/authStore';

const adminNav = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Properties', href: '/admin/properties', icon: Building2 },
  { label: 'Add Property', href: '/admin/properties/new', icon: PlusCircle },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { label: 'Activity Log', href: '/admin/activity', icon: Activity },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminLayout() {
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
      <header className="lg:hidden fixed top-0 left-0 right-0 z-[var(--z-sticky)] bg-navy-900 border-b border-navy-800 h-16 flex items-center px-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-lg text-white hover:bg-navy-800 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link to="/" className="ml-3">
          <Logo variant="full" size="sm" />
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <button className="p-2 rounded-lg text-white hover:bg-navy-800 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full" />
          </button>
        </div>
      </header>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-[var(--z-modal-backdrop)]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-72 bg-navy-900 border-r border-navy-800 text-white z-[var(--z-modal)] transition-transform duration-300 flex flex-col',
          'lg:translate-x-0 lg:z-auto',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="h-[72px] flex items-center justify-between px-6 border-b border-navy-800">
          <Link to="/">
            <Logo variant="full" size="sm" />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-white hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info / Admin Badge */}
        <div className="px-6 py-4 border-b border-navy-800 bg-navy-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-navy-900 font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() ?? 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name ?? 'Admin User'}</p>
              <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-gold/20 text-gold rounded-full uppercase tracking-wider">
                Administrator
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Admin navigation">
          <ul className="space-y-1">
            {adminNav.map((item) => {
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
                        ? 'bg-gold text-navy-900 shadow-md font-semibold'
                        : 'text-navy-200 hover:bg-navy-800 hover:text-white'
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
        <div className="p-3 border-t border-navy-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-navy-800 transition-colors"
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
                {adminNav.find(n => n.href === location.pathname)?.label ?? 'Admin Portal'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-ivory transition-colors relative">
                <Bell className="w-5 h-5 text-charcoal" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full" />
              </button>
              <div className="w-px h-8 bg-beige" />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-navy-900 font-bold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() ?? 'A'}
                </div>
                <div>
                  <p className="text-sm font-medium text-navy-900">{user?.name ?? 'Admin'}</p>
                  <p className="text-xs text-charcoal-light">Administrator</p>
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
