import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Calendar, Search, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { useFeaturedProperties } from '@/hooks/useProperties';

export function CustomerDashboard() {
  const user = useAuthStore((s) => s.user);
  const { favorites } = useFavoriteStore();
  const { data: recommended, isLoading } = useFeaturedProperties();

  const stats = [
    { label: 'Favorite Properties', value: favorites.length, icon: Heart, color: 'text-error', bg: 'bg-error-light', href: '/customer/favorites' },
    { label: 'Active Inquiries', value: 2, icon: MessageSquare, color: 'text-info', bg: 'bg-info-light', href: '/customer/inquiries' },
    { label: 'Upcoming Visits', value: 0, icon: Calendar, color: 'text-warning', bg: 'bg-warning-light', href: '#' },
    { label: 'Saved Searches', value: 1, icon: Search, color: 'text-success', bg: 'bg-success-light', href: '/properties' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-navy-900">
          Welcome back, {user?.name?.split(' ')[0] || 'User'} 👋
        </h1>
        <p className="text-navy-500 font-body mt-1">Here's what's happening with your property search.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} to={stat.href}>
              <Card hoverable className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-navy-900">{stat.value}</p>
                  <p className="text-xs text-navy-500 font-body">{stat.label}</p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recommended */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-semibold text-navy-900">Recommended Properties</h2>
          <Link to="/properties">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All
            </Button>
          </Link>
        </div>
        <PropertyGrid properties={recommended?.slice(0, 3) || []} isLoading={isLoading} skeletonCount={3} />
      </div>
    </div>
  );
}
