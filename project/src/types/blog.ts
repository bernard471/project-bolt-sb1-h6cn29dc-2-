export interface Author {
  id: number;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  publishedAt: string;
  readingTime: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
}

export type SortOption = 'newest' | 'popular' | 'trending';
export type CategoryFilter = 'All' | 'Tutorials' | 'News' | 'Analysis' | 'Research';