import React, { useState } from 'react';
import { Search } from 'lucide-react';
import BlogGrid from './BlogGrid';
import BlogFilters from './BlogFilters';
import BlogSort from './BlogSort';
import { filterBlogPosts } from '../../utils/blogFilters';
import { sortBlogPosts } from '../../utils/blogSorting';
import { BlogPost, SortOption, CategoryFilter } from '../../types/blog';
import { blogPosts } from '../../data/blog';

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  const filteredPosts = filterBlogPosts(blogPosts, searchQuery, selectedCategory, selectedTags);
  const sortedPosts = sortBlogPosts(filteredPosts, sortOption);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Cybersecurity Blog</h2>
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
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
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
    </section>
  );
};

export default BlogPage;