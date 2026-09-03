export type ActivityType = 
  | 'LOGIN'
  | 'PROPERTY_VIEW'
  | 'PROPERTY_FAVORITED'
  | 'PROPERTY_UNFAVORITED'
  | 'INQUIRY_CREATED'
  | 'INQUIRY_UPDATED'
  | 'PROPERTY_CREATED'
  | 'PROPERTY_UPDATED'
  | 'PROPERTY_DELETED'
  | 'PROPERTY_PUBLISHED'
  | 'USER_REGISTERED'
  | 'REQUIREMENT_SUBMITTED';

export interface Activity {
  id: number;
  type: ActivityType;
  userId: number;
  userName: string;
  description: string;
  entityId?: number;
  entityType?: 'PROPERTY' | 'USER' | 'INQUIRY';
  timestamp: string;
}
