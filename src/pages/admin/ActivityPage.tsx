import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockActivities } from '@/mock';
import { formatRelativeTime, formatDate } from '@/utils/format';
import {
  User, LogIn, Eye, Heart, MessageSquare, PlusCircle, Edit, Trash2, CheckCircle, UserPlus, FileText,
} from 'lucide-react';
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

export function ActivityPage() {
  const [activities] = useState(
    [...mockActivities].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-bold text-navy-900">Activity Log</h1>
        <p className="text-navy-500 font-body text-sm mt-1">Audit trail of system events, actions, and changes</p>
      </div>

      <Card>
        <div className="space-y-4">
          {activities.map((act) => {
            const Icon = activityIcons[act.type];
            return (
              <div
                key={act.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-ivory/50 border border-beige/60 hover:bg-ivory transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-navy-900">{act.description}</p>
                    <span className="text-xs text-navy-400 font-body">{formatRelativeTime(act.timestamp)}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-navy-500 font-body mt-2">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-navy-400" />
                      {act.userName || `User #${act.userId}`}
                    </span>
                    <span className="text-navy-300">•</span>
                    <span>{formatDate(act.timestamp)}</span>
                    {act.entityType && (
                      <>
                        <span className="text-navy-300">•</span>
                        <Badge variant="outline" size="sm">
                          {act.entityType}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
