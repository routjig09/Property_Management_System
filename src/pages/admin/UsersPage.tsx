import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Heart, FileText } from 'lucide-react';
import { Table, type Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { mockFavorites, mockRequirements, mockUserStore } from '@/mock';
import type { User } from '@/types';
import { formatDate, formatRelativeTime } from '@/utils/format';
import { cn } from '@/utils/cn';

const RECENT_WINDOW_MS = 24 * 60 * 60 * 1000;

function isRecentlyActive(lastActiveAt?: string) {
  if (!lastActiveAt) return false;
  return Date.now() - new Date(lastActiveAt).getTime() < RECENT_WINDOW_MS;
}

export function UsersPage() {
  const navigate = useNavigate();
  const [users] = useState<User[]>(mockUserStore.getAll());

  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-3">
          <Avatar name={u.name} size="sm" />
          <div>
            <p className="text-sm font-semibold text-navy-900">{u.name}</p>
            <p className="text-xs text-navy-400 font-body">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (u) => (
        <Badge variant={u.role === 'ADMIN' ? 'premium' : 'outline'} size="sm">
          {u.role}
        </Badge>
      ),
    },
    {
      key: 'lastActiveAt',
      header: 'Last Login',
      sortable: true,
      render: (u) =>
        u.lastActiveAt ? (
          <div className="flex items-center gap-2">
            <span
              className={cn('w-2 h-2 rounded-full shrink-0', isRecentlyActive(u.lastActiveAt) ? 'bg-success' : 'bg-navy-200')}
              aria-hidden="true"
            />
            <span className="text-xs font-body text-navy-600">{formatRelativeTime(u.lastActiveAt)}</span>
          </div>
        ) : (
          <span className="text-xs font-body text-navy-300">Never logged in</span>
        ),
    },
    {
      key: 'liked',
      header: 'Liked',
      render: (u) => {
        const count = mockFavorites.filter((f) => f.userId === u.id).length;
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-navy-700">
            <Heart className="w-3.5 h-3.5 text-error" />
            {count}
          </span>
        );
      },
    },
    {
      key: 'wants',
      header: 'Requirements',
      render: (u) => {
        const count = mockRequirements.filter((r) => r.customerId === u.id).length;
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-navy-700">
            <FileText className="w-3.5 h-3.5 text-gold" />
            {count}
          </span>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (u) => (
        <Badge variant={u.status === 'ACTIVE' ? 'success' : 'error'} size="sm" dot>
          {u.status}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Joined',
      sortable: true,
      render: (u) => formatDate(u.createdAt),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-16',
      render: (u) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/admin/users/${u.id}`)}
          leftIcon={<Eye className="w-4 h-4" />}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-navy-900">User Management</h1>
          <p className="text-navy-500 font-body text-sm mt-1">{users.length} registered users</p>
        </div>
      </div>

      <Table<User> columns={columns} data={users} />
    </div>
  );
}
