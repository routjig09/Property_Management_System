export type ContactMethod = 'CALL' | 'WHATSAPP' | 'EMAIL';
export type InquiryStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

export interface Inquiry {
  id: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  propertyId: number;
  propertyTitle: string;
  message: string;
  contactMethod: ContactMethod;
  status: InquiryStatus;
  assignedTo?: string;
  notes?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateInquiryData {
  propertyId: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  contactMethod: ContactMethod;
}
