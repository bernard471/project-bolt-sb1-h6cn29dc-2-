import { MentorshipStatus } from './mentorship';

export interface Notification {
  id: string;
  userId: string;
  type: 'session' | 'message' | 'payment';
  message: string;
  read: boolean;
  metadata: Record<string, any>;
  createdAt: string;
}