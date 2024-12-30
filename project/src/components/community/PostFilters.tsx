import React from 'react';
import { Filter } from 'lucide-react';
import type { PostCategory } from '@/types/community';

interface PostFiltersProps {
  selectedCategories: PostCategory[];
  onCategoryChange: (categories: PostCategory[]) => void;
}

const categories: PostCategory[] = ['Discussion', 'Question', 'Resource', 'Event'];

const PostFilters: React.FC<PostFiltersProps> = ({
  selectedCategories,
  onCategoryChange,
}) => {
  const toggleCategory = (category: PostCategory) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => toggleCategory(category)}
              className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="text-gray-700">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PostFilters;