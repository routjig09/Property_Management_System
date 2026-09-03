import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowLeft, Mail, Phone, Calendar, Clock, LogIn, Eye, Heart, MessageSquare,
  PlusCircle, Edit, Trash2, CheckCircle, UserPlus, FileText,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabPanel } from '@/components/ui/Tabs';
import { mockInquiries, mockActivities, mockProperties, mockFavorites, mockRequirements, mockUserStore } from '@/mock';
import { formatDate, formatRelativeTime, formatPrice } from '@/utils/format';
import type { ActivityType } from '@/types';

const activityIcons: Record<ActivityType, typeof LogIn> = {
  LOGIN: LogIn,
  PROPERTY_VIEW: Eye,
  PROPERTY_FAVORITED: Heart,
  PROPERTY_UNFAVORITED: Heart,
  INQUIRY_CREATED: MessageSquare,
  INQUIRY_UPDATED: MessageSquare,
  PROPERTY_CREATED: PlusCircle,
  PROPERTY_UPDATED: Edit,
  PROPERTY_DELETED: Trash2,
  PROPERTY_PUBLISHED: CheckCircle,
  USER_REGISTERED: UserPlus,
  REQUIREMENT_SUBMITTED: FileText,
};

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const allUsers = mockUserStore.getAll();
  const user = mockUserStore.findById(Number(id)) ?? allUsers[1];
  const [activeTab, setActiveTab] = useState('inquiries');

  const userInquiries = mockInquiries.filter((i) => i.customerId === user.id);
  const userActivities = mockActivities
    .filter((a) => a.userId === user.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  const userFavorites = mockFavorites
    .filter((f) => f.userId === user.id)
    .map((f) => ({ favorite: f, property: mockProperties.find((p) => p.id === f.propertyId) }))
    .filter((entry) => entry.property);
  const userRequirements = mockRequirements.filter((r) => r.customerId === user.id);

  const tabs = [
    { id: 'inquiries', label: `Inquiries (${userInquiries.length})` },
    { id: 'liked', label: `Liked (${userFavorites.length})` },
    { id: 'requirements', label: `Requirements (${userRequirements.length})` },
    { id: 'activity', label: `Activity (${userActivities.length})` },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/users')}
          className="p-2 rounded-lg hover:bg-navy-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-navy-600" />
        </button>
        <h1 className="text-2xl font-heading font-bold text-navy-900">User Profile</h1>
      </div>

      {/* User Header */}
      <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} size="lg" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-heading font-bold text-navy-900">{user.name}</h2>
              <Badge variant={user.role === 'ADMIN' ? 'premium' : 'outline'} size="sm">
                {user.role}
              </Badge>
              <Badge variant={user.status === 'ACTIVE' ? 'success' : 'error'} size="sm" dot>
                {user.status}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-body text-navy-500 mt-2">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-gold" />
                {user.email}
              </span>
              {user.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  {user.phone}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                Joined {formatDate(user.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold" />
                {user.lastActiveAt ? `Last active ${formatRelativeTime(user.lastActiveAt)}` : 'Never logged in'}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs Section */}
      <Card>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab}>
          <TabPanel value="inquiries" activeTab={activeTab}>
            {userInquiries.length === 0 ? (
              <p className="text-sm text-navy-400 py-6 text-center">No inquiries submitted by this user.</p>
            ) : (
              <div className="space-y-3 pt-4">
                {userInquiries.map((inq) => (
                  <div key={inq.id} className="p-4 rounded-lg bg-ivory border border-beige flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{inq.propertyTitle}</p>
                      <p className="text-xs text-navy-600 mt-1">{inq.message}</p>
                      <p className="text-[10px] text-navy-400 mt-1">{formatDate(inq.createdAt)}</p>
                    </div>
                    <Badge variant="warning" size="sm">{inq.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </TabPanel>

          <TabPanel value="liked" activeTab={activeTab}>
            {userFavorites.length === 0 ? (
              <p className="text-sm text-navy-400 py-6 text-center">This user hasn't liked any properties yet.</p>
            ) : (
              <div className="space-y-3 pt-4">
                {userFavorites.map(({ favorite, property }) => (
                  <div key={favorite.id} className="p-3 rounded-lg bg-ivory border border-beige flex items-center gap-3">
                    <img
                      src={property!.images[0]?.url}
                      alt=""
                      className="w-14 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy-900 truncate">{property!.title}</p>
                      <p className="text-xs text-navy-500">{property!.location.area}, {property!.location.city}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-navy-900">{formatPrice(property!.price)}</p>
                      <p className="text-[10px] text-navy-400">Liked {formatRelativeTime(favorite.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabPanel>

          <TabPanel value="requirements" activeTab={activeTab}>
            {userRequirements.length === 0 ? (
              <p className="text-sm text-navy-400 py-6 text-center">This user hasn't posted any requirements.</p>
            ) : (
              <div className="space-y-3 pt-4">
                {userRequirements.map((req) => (
                  <div key={req.id} className="p-4 rounded-lg bg-ivory border border-beige">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-navy-900">
                        {req.bhk ? `${req.bhk} BHK ` : ''}{req.propertyType || 'Property'} · {req.listingType === 'RENT' ? 'For Rent' : 'For Sale'}
                      </p>
                      <Badge variant={req.status === 'ACTIVE' ? 'info' : req.status === 'MATCHED' ? 'success' : 'default'} size="sm">
                        {req.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-navy-600 mt-1">
                      {[req.area, req.city, req.state].filter(Boolean).join(', ') || 'Any location'}
                    </p>
                    {(req.minBudget || req.maxBudget) && (
                      <p className="text-xs text-navy-500 mt-1">
                        Budget: {req.minBudget ? formatPrice(req.minBudget) : 'Any'} – {req.maxBudget ? formatPrice(req.maxBudget) : 'Any'}
                      </p>
                    )}
                    <p className="text-[10px] text-navy-400 mt-2">Posted {formatDate(req.createdAt)}</p>
                  </div>
                ))}
              </div>
            )}
          </TabPanel>

          <TabPanel value="activity" activeTab={activeTab}>
            {userActivities.length === 0 ? (
              <p className="text-sm text-navy-400 py-6 text-center">No recorded activity for this user.</p>
            ) : (
              <div className="space-y-3 pt-4">
                {userActivities.map((act) => {
                  const Icon = activityIcons[act.type];
                  return (
                    <div key={act.id} className="flex items-start gap-3 py-2 border-b border-navy-50 last:border-0">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-navy-800 font-body">{act.description}</p>
                        <p className="text-xs text-navy-400 font-body mt-0.5">{formatRelativeTime(act.timestamp)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabPanel>
        </Tabs>
      </Card>
    </div>
  );
}
