import { useState } from 'react';
import { cn } from '@/utils/cn';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (id: string) => void;
  children?: React.ReactNode;
}

export function Tabs({ tabs, activeTab, onChange, children }: TabsProps) {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id);
  const currentTab = activeTab !== undefined ? activeTab : internalActive;

  const handleTabChange = (id: string) => {
    if (onChange) {
      onChange(id);
    } else {
      setInternalActive(id);
    }
  };

  return (
    <div className="w-full">
      <div className="border-b border-navy-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm font-body flex items-center transition-colors',
                  isActive
                    ? 'border-gold text-navy-900'
                    : 'border-transparent text-navy-500 hover:text-navy-700 hover:border-navy-300'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function TabPanel({
  value,
  activeTab,
  children,
}: {
  value: string;
  activeTab: string;
  children: React.ReactNode;
}) {
  if (value !== activeTab) return null;
  return <div className="animate-fade-in">{children}</div>;
}
