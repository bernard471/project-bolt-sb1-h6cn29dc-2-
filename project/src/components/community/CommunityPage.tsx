import React, { useState } from 'react';
import { Search } from 'lucide-react';
import PostList from './PostList';
import PostFilters from './PostFilters';
import PostSort from './PostSort';
import CreatePost from './CreatePost';
import { filterPosts } from '@/utils/postFilters';
import { sortPosts } from '@/utils/postSorting';
import { posts } from '@/data/community';
import type { PostCategory, SortOption } from '@/types/community';

export const CommunityPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<PostCategory[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const filteredPosts = filterPosts(posts, searchQuery, selectedCategories);
  const sortedPosts = sortPosts(filteredPosts, sortOption);

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Community</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Connect with cybersecurity professionals, share knowledge, and stay updated
            with the latest discussions and events.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <PostFilters
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div className="flex gap-4">
                  <PostSort
                    sortOption={sortOption}
                    onSortChange={setSortOption}
                  />
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                  >
                    New Post
                  </button>
                </div>
              </div>
            </div>

            <PostList posts={sortedPosts} />
          </div>
        </div>
      </div>

      {showCreatePost && (
        <CreatePost onClose={() => setShowCreatePost(false)} />
      )}
    </div>
  );
};

export default CommunityPage;