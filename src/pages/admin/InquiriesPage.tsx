import { useState } from 'react';
import { Eye } from 'lucide-react';
import { Table, type Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { mockInquiries, mockProperties } from '@/mock';
import { inquiryApi } from '@/services';
import type { Inquiry } from '@/types';
import { formatDate } from '@/utils/format';
import { useUiStore } from '@/store/uiStore';

const statusVariant: Record<string, 'info' | 'warning' | 'success' | 'default' | 'error'> = {
  NEW: 'info',
  CONTACTED: 'warning',
  IN_PROGRESS: 'warning',
  RESOLVED: 'success',
  CLOSED: 'default',
};

export function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const addToast = useUiStore((s) => s.addToast);

  const updateStatus = async (id: number, status: Inquiry['status']) => {
    try {
      await inquiryApi.updateInquiryStatus(id, status);
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status } : i))
      );
      addToast({ message: `Inquiry status updated to ${status}`, type: 'success' });
      if (selectedInquiry?.id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status } : null));
      }
    } catch {
      addToast({ message: 'Failed to update inquiry status. Please try again.', type: 'error' });
    }
  };

  const columns: Column<Inquiry>[] = [
    {
      key: 'name',
      header: 'Customer',
      sortable: true,
      render: (i) => (
        <div>
          <p className="font-semibold text-navy-900 text-sm">{i.customerName}</p>
          <p className="text-xs text-navy-400 font-body">{i.customerEmail}</p>
        </div>
      ),
    },
    {
      key: 'propertyId',
      header: 'Property',
      render: (i) => {
        const prop = mockProperties.find((p) => p.id === i.propertyId);
        return (
          <span className="text-sm font-body text-navy-800 font-medium">
            {prop ? prop.title : `Property #${i.propertyId}`}
          </span>
        );
      },
    },
    {
      key: 'phone',
      header: 'Contact',
      render: (i) => (
        <div className="text-xs font-body">
          <p className="text-navy-800">{i.customerPhone}</p>
          <p className="text-navy-400 capitalize">via {i.contactMethod.toLowerCase()}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (i) => (
        <Badge variant={statusVariant[i.status]} size="sm" dot>
          {i.status.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Date',
      sortable: true,
      render: (i) => formatDate(i.createdAt),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-16',
      render: (i) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedInquiry(i)}
          leftIcon={<Eye className="w-4 h-4" />}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-navy-900">Inquiry Management</h1>
        <p className="text-navy-500 font-body text-sm mt-1">{inquiries.length} total customer inquiries</p>
      </div>

      <Table<Inquiry> columns={columns} data={inquiries} />

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <Modal
          isOpen={!!selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          title={`Inquiry from ${selectedInquiry.customerName}`}
          size="md"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs text-navy-400 font-body">Contact Details</p>
              <p className="text-sm font-semibold text-navy-900 mt-0.5">
                {selectedInquiry.customerEmail} • {selectedInquiry.customerPhone}
              </p>
              <p className="text-xs text-navy-500 font-body">
                Preferred Method: <span className="font-medium text-navy-700 capitalize">{selectedInquiry.contactMethod.toLowerCase()}</span>
              </p>
            </div>

            <div>
              <p className="text-xs text-navy-400 font-body">Message</p>
              <div className="p-3 bg-ivory border border-beige rounded-lg text-sm text-navy-800 font-body mt-1">
                {selectedInquiry.message}
              </div>
            </div>

            <div>
              <p className="text-xs text-navy-400 font-body mb-2">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {(['NEW', 'CONTACTED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as Inquiry['status'][]).map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(selectedInquiry.id, status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-colors border ${
                      selectedInquiry.status === status
                        ? 'bg-navy-900 text-white border-navy-900'
                        : 'bg-white text-navy-600 border-navy-200 hover:border-navy-400'
                    }`}
                  >
                    {status.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
