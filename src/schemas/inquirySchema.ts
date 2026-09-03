import { z } from 'zod';

export const inquirySchema = z.object({
  propertyId: z.number(),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  contactMethod: z.enum(['CALL', 'WHATSAPP', 'EMAIL'])
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
