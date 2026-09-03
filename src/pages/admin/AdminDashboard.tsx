import { Building2, Users, MessageSquare, Heart, Eye, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { mockProperties, mockInquiries, mockActivities, mockUserStore } from '@/mock';
import { formatRelativeTime } from '@/utils/format';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#C9A96E', '#1B2A4A', '#059669', '#dc2626', '#d97706'];

export function AdminDashboard() {
  const totalProperties = mockProperties.length;
  const published = mockProperties.filter((p) => p.status === 'PUBLISHED' || p.status === 'AVAILABLE').length;
  const totalUsers = mockUserStore.getAllCustomers().length;
  const newInquiries = mockInquiries.filter((i) => i.status === 'NEW').length;
  const totalViews = mockProperties.reduce((sum, p) => sum + p.viewCount, 0);
  const totalFavorites = mockProperties.reduce((sum, p) => sum + p.favoriteCount, 0);

  const stats = [
    { label: 'Total Properties', value: totalProperties, icon: Building2, color: 'text-gold', bg: 'bg-gold/10', change: '+3 this month' },
    { label: 'Total Customers', value: totalUsers, icon: Users, color: 'text-info', bg: 'bg-info-light', change: '+12 this month' },
    { label: 'New Inquiries', value: newInquiries, icon: MessageSquare, color: 'text-warning', bg: 'bg-warning-light', change: '5 pending' },
    { label: 'Total Views', value: totalViews.toLocaleString(), icon: Eye, color: 'text-success', bg: 'bg-success-light', change: '+15% this week' },
    { label: 'Total Favorites', value: totalFavorites, icon: Heart, color: 'text-error', bg: 'bg-error-light', change: '+8 this week' },
    { label: 'Active Listings', value: published, icon: CheckCircle, color: 'text-success', bg: 'bg-success-light', change: `${published} of ${totalProperties}` },
  ];

  const propertyByType = [
    { name: 'Apartment', value: mockProperties.filter((p) => p.propertyType === 'APARTMENT').length },
    { name: 'Villa', value: mockProperties.filter((p) => p.propertyType === 'VILLA').length },
    { name: 'Office', value: mockProperties.filter((p) => p.propertyType === 'OFFICE').length },
    { name: 'Other', value: mockProperties.filter((p) => !['APARTMENT', 'VILLA', 'OFFICE'].includes(p.propertyType)).length },
  ].filter((d) => d.value > 0);

  const viewsData = [
    { name: 'Mon', views: 120 }, { name: 'Tue', views: 190 }, { name: 'Wed', views: 150 },
    { name: 'Thu', views: 280 }, { name: 'Fri', views: 250 }, { name: 'Sat', views: 310 }, { name: 'Sun', views: 200 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-navy-900">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-navy-500 font-body">{stat.label}</p>
                  <p className="text-3xl font-heading font-bold text-navy-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-navy-400 font-body mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Views Chart */}
        <Card className="lg:col-span-2">
          <h3 className="font-heading font-semibold text-navy-900 mb-4">Property Views (This Week)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d9e0ed" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6783b7' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6783b7' }} />
              <Tooltip />
              <Bar dataKey="views" fill="#C9A96E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Type Distribution */}
        <Card>
          <h3 className="font-heading font-semibold text-navy-900 mb-4">By Type</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={propertyByType} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                {propertyByType.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {propertyByType.map((item, i) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs font-body text-navy-600">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                {item.name}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <h3 className="font-heading font-semibold text-navy-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {mockActivities.slice(0, 8).map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 py-2 border-b border-navy-50 last:border-0">
              <div className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-body text-navy-800">{activity.description}</p>
                <p className="text-xs font-body text-navy-400 mt-0.5">{formatRelativeTime(activity.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
