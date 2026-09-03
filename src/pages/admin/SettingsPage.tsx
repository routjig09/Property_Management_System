import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Save, Shield, Database } from 'lucide-react';
import { useUiStore } from '@/store/uiStore';

export function SettingsPage() {
  const addToast = useUiStore((s) => s.addToast);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({ message: 'Admin settings updated', type: 'success' });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-navy-900">Admin Settings</h1>
        <p className="text-navy-500 font-body text-sm mt-1">Platform configuration and system preferences</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <h3 className="font-heading font-semibold text-navy-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-gold" />
            General Settings
          </h3>
          <div className="space-y-4">
            <Input label="Platform Name" defaultValue="PropSync" />
            <Input label="Support Email" defaultValue="hello@propsync.in" />
            <Input label="Contact Phone" defaultValue="+91 98765 43210" />
          </div>
        </Card>

        <Card>
          <h3 className="font-heading font-semibold text-navy-900 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-gold" />
            API & Backend Configuration
          </h3>
          <div className="space-y-4 font-body text-sm">
            <div className="flex items-center justify-between p-3 bg-ivory border border-beige rounded-lg">
              <div>
                <p className="font-semibold text-navy-900">Mock API Mode</p>
                <p className="text-xs text-navy-500">Currently using mock service layer (`VITE_USE_MOCK_API=true`)</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-success-light text-success">
                ACTIVE
              </span>
            </div>
            <Input label="Spring Boot API Base URL" defaultValue="http://localhost:8080/api" />
          </div>
        </Card>

        <Button type="submit" variant="accent" leftIcon={<Save className="w-4 h-4" />}>
          Save Settings
        </Button>
      </form>
    </div>
  );
}
