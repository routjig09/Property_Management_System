import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table, type Column } from '@/components/ui/Table';
import { Dropdown } from '@/components/ui/Dropdown';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { useProperties, useDeleteProperty } from '@/hooks/useProperties';
import type { Property } from '@/types';
import { formatPrice } from '@/utils/format';
import { useUiStore } from '@/store/uiStore';

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
  PUBLISHED: 'success', AVAILABLE: 'success', DRAFT: 'default',
  SOLD: 'error', RENTED: 'warning', UNPUBLISHED: 'default',
};

export function PropertiesListPage() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { data, isLoading } = useProperties({});
  const deleteMutation = useDeleteProperty();
  const addToast = useUiStore((s) => s.addToast);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    addToast({ message: 'Property deleted successfully', type: 'success' });
    setDeleteId(null);
  };

  const columns: Column<Property>[] = [
    {
      key: 'title', header: 'Property', sortable: true,
      render: (p) => (
        <div className="flex items-center gap-3 min-w-[200px]">
          <img src={p.images[0]?.url} alt="" className="w-12 h-10 rounded-lg object-cover shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-navy-900 truncate">{p.title}</p>
            <p className="text-xs text-navy-400">{p.location.area}, {p.location.city}</p>
          </div>
        </div>
      ),
    },
    { key: 'propertyType', header: 'Type', render: (p) => <Badge variant="outline" size="sm">{p.propertyType}</Badge> },
    { key: 'price', header: 'Price', sortable: true, render: (p) => <span className="font-medium">{formatPrice(p.price)}</span> },
    { key: 'bedrooms', header: 'BHK', render: (p) => p.bedrooms > 0 ? `${p.bedrooms} BHK` : '-' },
    { key: 'status', header: 'Status', render: (p) => <Badge variant={statusVariant[p.status]} size="sm" dot>{p.status}</Badge> },
    { key: 'viewCount', header: 'Views', sortable: true, render: (p) => p.viewCount.toLocaleString() },
    {
      key: 'actions', header: '', className: 'w-12',
      render: (p) => (
        <Dropdown
          align="right"
          trigger={<button className="p-1 rounded hover:bg-navy-50"><MoreVertical className="w-4 h-4 text-navy-400" /></button>}
          items={[
            { label: 'View', icon: <Eye className="w-4 h-4" />, onClick: () => navigate(`/admin/properties/${p.id}`) },
            { label: 'Edit', icon: <Edit className="w-4 h-4" />, onClick: () => navigate(`/admin/properties/${p.id}`) },
            { divider: true, label: '' },
            { label: 'Delete', icon: <Trash2 className="w-4 h-4" />, danger: true, onClick: () => setDeleteId(p.id) },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-navy-900">Properties</h1>
          <p className="text-navy-500 font-body mt-1">{data?.total ?? 0} properties total</p>
        </div>
        <Link to="/admin/properties/new">
          <Button variant="accent" leftIcon={<Plus className="w-4 h-4" />}>Add Property</Button>
        </Link>
      </div>

      <Table<Property> columns={columns} data={data?.data ?? []} isLoading={isLoading} />

      <ConfirmDeleteModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Property"
        message="This will permanently delete the property and all associated data."
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
