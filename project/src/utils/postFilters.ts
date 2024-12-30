import type { Post, PostCategory } from '@/types/community';

export const filterPosts = (
  posts: Post[],
  searchQuery: string,
  selectedCategories: PostCategory[]
): Post[] => {
  return posts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(post.category);
    
    return matchesSearch && matchesCategory;
  });
};