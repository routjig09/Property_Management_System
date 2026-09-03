import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/common/EmptyState';
import { MessageSquare } from 'lucide-react';
import { mockInquiries } from '@/mock';
import { formatDate } from '@/utils/format';
import { useAuthStore } from '@/store/authStore';

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'info' | 'error'> = {
  NEW: 'info',
  CONTACTED: 'warning',
  IN_PROGRESS: 'warning',
  RESOLVED: 'success',
  CLOSED: 'default',
};

export function InquiriesPage() {
  const user = useAuthStore((s) => s.user);
  const inquiries = user ? mockInquiries.filter((inq) => inq.customerId === user.id) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-navy-900">My Inquiries</h1>
        <p className="text-navy-500 font-body mt-1">{inquiries.length} inquiries submitted</p>
      </div>

      {inquiries.length === 0 ? (
        <EmptyState
          icon={<MessageSquare className="w-8 h-8 text-navy-300" />}
          title="No inquiries yet"
          message="When you send inquiries about properties, they'll appear here."
        />
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <Card key={inq.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <p className="font-body font-semibold text-navy-900 mb-1">
                  Property #{inq.propertyId}
                </p>
                <p className="text-sm text-navy-500 font-body line-clamp-1">{inq.message}</p>
                <p className="text-xs text-navy-400 font-body mt-1">{formatDate(inq.createdAt)}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={statusVariant[inq.status]} size="md" dot>
                  {inq.status.replace('_', ' ')}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
