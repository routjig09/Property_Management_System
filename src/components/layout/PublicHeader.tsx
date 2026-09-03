import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, User, ChevronDown, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store/authStore';

const publicNavLinks = [
  { label: 'Properties', href: '/properties' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function PublicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';
  const headerTransparent = isHomePage && !isScrolled && !isMobileMenuOpen;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-300',
        headerTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-[var(--shadow-subtle)] border-b border-beige'
      )}
    >
      <div className="container-main">
        <nav className="flex items-center justify-between h-[72px]" aria-label="Main navigation">
          {/* Logo */}
          <Link to="/" className="relative z-10" aria-label="PropSync Home">
            <Logo
              variant="full"
              size="md"
              className={headerTransparent ? 'text-white' : ''}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {publicNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm font-medium tracking-wide uppercase transition-colors duration-200',
                  location.pathname === link.href
                    ? 'text-gold'
                    : headerTransparent
                      ? 'text-white/90 hover:text-white'
                      : 'text-charcoal hover:text-gold'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <Link
                  to="/customer/favorites"
                  className={cn(
                    'p-2 rounded-full transition-colors',
                    headerTransparent
                      ? 'text-white/90 hover:bg-white/10'
                      : 'text-charcoal hover:bg-beige'
                  )}
                  aria-label="Favorites"
                >
                  <Heart className="w-5 h-5" />
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
                      headerTransparent
                        ? 'text-white/90 hover:bg-white/10'
                        : 'text-charcoal hover:bg-beige'
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center text-white text-xs font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                    <ChevronDown className={cn('w-4 h-4 transition-transform', isProfileOpen && 'rotate-180')} />
                  </button>

                  {isProfileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-[var(--shadow-elevated)] border border-beige py-2 z-50 animate-[scale-in_0.2s_ease-out]">
                        <div className="px-4 py-2 border-b border-beige">
                          <p className="text-sm font-semibold text-navy-900">{user.name}</p>
                          <p className="text-xs text-charcoal-light">{user.email}</p>
                        </div>
                        <Link
                          to={user.role === 'ADMIN' ? '/admin/dashboard' : '/customer/dashboard'}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal hover:bg-ivory transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <Link
                          to={user.role === 'ADMIN' ? '/admin/settings' : '/customer/settings'}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal hover:bg-ivory transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                        <div className="border-t border-beige mt-1 pt-1">
                          <button
                            onClick={logout}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-error hover:bg-error-light transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant={headerTransparent ? 'ghost' : 'outline'}
                    size="sm"
                    className={headerTransparent ? 'text-white border-white/30 hover:bg-white/10' : ''}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="accent" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors',
              headerTransparent
                ? 'text-white hover:bg-white/10'
                : 'text-charcoal hover:bg-beige'
            )}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-beige animate-[fade-in_0.2s_ease-out]">
          <div className="container-main py-4 space-y-1">
            {publicNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'block px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === link.href
                    ? 'bg-ivory text-gold'
                    : 'text-charcoal hover:bg-ivory'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-beige pt-4 mt-4 space-y-2">
              {isAuthenticated && user ? (
                <>
                  <Link
                    to={user.role === 'ADMIN' ? '/admin/dashboard' : '/customer/dashboard'}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-charcoal hover:bg-ivory rounded-lg"
                  >
                    <User className="w-5 h-5" />
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-error hover:bg-error-light rounded-lg"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block">
                    <Button variant="outline" fullWidth>Sign In</Button>
                  </Link>
                  <Link to="/register" className="block">
                    <Button variant="accent" fullWidth>Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
