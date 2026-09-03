import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Bell, Shield, Eye } from 'lucide-react';

export function SettingsPage() {
  const settings = [
    { icon: Bell, title: 'Notifications', description: 'Manage email and push notification preferences.' },
    { icon: Shield, title: 'Privacy', description: 'Control your profile visibility and data sharing.' },
    { icon: Eye, title: 'Appearance', description: 'Customize your browsing experience.' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold text-navy-900">Settings</h1>

      {settings.map((setting) => {
        const Icon = setting.icon;
        return (
          <Card key={setting.title} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-ivory flex items-center justify-center">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="font-body font-semibold text-navy-900">{setting.title}</p>
                <p className="text-sm text-navy-500 font-body">{setting.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Configure</Button>
          </Card>
        );
      })}

      <Card className="border border-error-light">
        <h3 className="font-heading font-semibold text-navy-900 mb-2">Danger Zone</h3>
        <p className="text-sm text-navy-500 font-body mb-4">
          Permanently delete your account and all associated data.
        </p>
        <Button variant="danger" size="sm">Delete Account</Button>
      </Card>
    </div>
  );
}
