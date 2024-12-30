import React, { useState } from 'react';
import { Search } from 'lucide-react';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogFilters from '@/components/blog/BlogFilters';
import BlogSort from '@/components/blog/BlogSort';
import { filterBlogPosts } from '@/utils/blogFilters';
import { sortBlogPosts } from '@/utils/blogSorting';
import { blogPosts } from '@/data/blog';
import type { CategoryFilter, SortOption } from '@/types/blog';

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  const filteredPosts = filterBlogPosts(blogPosts, searchQuery, selectedCategory, selectedTags);
  const sortedPosts = sortBlogPosts(filteredPosts, sortOption);

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Cybersecurity Blog</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest cybersecurity insights, tutorials, and industry analysis.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <BlogFilters
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
            onCategoryChange={setSelectedCategory}
            onTagsChange={setSelectedTags}
          />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <BlogSort
                  sortOption={sortOption}
                  onSortChange={setSortOption}
                />
              </div>
            </div>

            <BlogGrid posts={sortedPosts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;