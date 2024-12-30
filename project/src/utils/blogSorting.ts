import { BlogPost, SortOption } from '../types/blog';

export const sortBlogPosts = (posts: BlogPost[], sortOption: SortOption): BlogPost[] => {
  const sortedPosts = [...posts];
  
  switch (sortOption) {
    case 'newest':
      return sortedPosts.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    case 'popular':
      return sortedPosts.sort((a, b) => b.views - a.views);
    case 'trending':
      return sortedPosts.sort((a, b) => b.likes - a.likes);
    default:
      return sortedPosts;
  }
};