import type { Post, SortOption } from '@/types/community';

export const sortPosts = (posts: Post[], sortOption: SortOption): Post[] => {
  const sortedPosts = [...posts];
  
  switch (sortOption) {
    case 'newest':
      return sortedPosts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'popular':
      return sortedPosts.sort((a, b) => b.views - a.views);
    case 'unanswered':
      return sortedPosts.sort((a, b) => a.replies - b.replies);
    default:
      return sortedPosts;
  }
};