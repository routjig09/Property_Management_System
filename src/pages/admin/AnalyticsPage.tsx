import { Card } from '@/components/ui/Card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

const monthlyListings = [
  { month: 'Jan', count: 12 }, { month: 'Feb', count: 18 }, { month: 'Mar', count: 25 },
  { month: 'Apr', count: 22 }, { month: 'May', count: 30 }, { month: 'Jun', count: 35 },
  { month: 'Jul', count: 42 }, { month: 'Aug', count: 48 },
];

const conversionData = [
  { stage: 'Views', value: 12400 },
  { stage: 'Inquiries', value: 850 },
  { stage: 'Site Visits', value: 240 },
  { stage: 'Deals Closed', value: 45 },
];

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-navy-900">Analytics & Insights</h1>
        <p className="text-navy-500 font-body text-sm mt-1">Platform performance, engagement metrics, and growth trends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Listing Growth */}
        <Card>
          <h3 className="font-heading font-semibold text-navy-900 mb-4">Listing Growth (Monthly)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyListings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d9e0ed" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6783b7' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6783b7' }} />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#C9A96E" fill="#C9A96E" fillOpacity={0.2} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <h3 className="font-heading font-semibold text-navy-900 mb-4">Customer Funnel</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={conversionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#d9e0ed" />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#6783b7' }} />
              <YAxis dataKey="stage" type="category" tick={{ fontSize: 12, fill: '#6783b7' }} width={90} />
              <Tooltip />
              <Bar dataKey="value" fill="#1B2A4A" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
