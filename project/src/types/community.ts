export type PostCategory = 'Discussion' | 'Question' | 'Resource' | 'Event';
export type UserRole = 'Student' | 'Professional' | 'Instructor' | 'Expert';

export interface User {
  id: number;
  name: string;
  role: UserRole;
  avatar: string;
  reputation: number;
  joinedDate: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  category: PostCategory;
  author: User;
  createdAt: string;
  likes: number;
  replies: number;
  views: number;
  tags: string[];
}

export type SortOption = 'newest' | 'popular' | 'unanswered';