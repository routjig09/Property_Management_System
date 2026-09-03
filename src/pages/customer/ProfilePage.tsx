import { useAuthStore } from '@/store/authStore';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/utils/format';

export function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold text-navy-900">Profile</h1>

      <Card>
        <div className="flex items-center gap-4 mb-6">
          <Avatar name={user?.name || 'User'} size="lg" />
          <div>
            <p className="text-lg font-heading font-semibold text-navy-900">{user?.name}</p>
            <p className="text-sm text-navy-500 font-body">{user?.email}</p>
            <p className="text-xs text-navy-400 font-body mt-1">
              Member since {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
            </p>
          </div>
        </div>

        <form className="space-y-4">
          <Input label="Full Name" defaultValue={user?.name} />
          <Input label="Email" type="email" defaultValue={user?.email} />
          <Input label="Phone" type="tel" defaultValue={user?.phone || ''} />
          <Button variant="accent">Save Changes</Button>
        </form>
      </Card>
    </div>
  );
}
