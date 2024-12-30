import { BlogPost, CategoryFilter } from '../types/blog';

export const filterBlogPosts = (
  posts: BlogPost[],
  searchQuery: string,
  category: CategoryFilter,
  tags: string[]
): BlogPost[] => {
  return posts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = category === 'All' || post.category === category;
    
    const matchesTags = tags.length === 0 || 
      tags.some(tag => post.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });
};