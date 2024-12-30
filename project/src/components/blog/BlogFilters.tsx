import React from 'react';
import { Filter } from 'lucide-react';
import { CategoryFilter } from '../../types/blog';

interface BlogFiltersProps {
  selectedCategory: CategoryFilter;
  selectedTags: string[];
  onCategoryChange: (category: CategoryFilter) => void;
  onTagsChange: (tags: string[]) => void;
}

const categories: CategoryFilter[] = ['All', 'Tutorials', 'News', 'Analysis', 'Research'];
const availableTags = ['Zero Trust', 'Web Security', 'Penetration Testing', 'OWASP', 'Security Architecture', 'Enterprise Security'];

const BlogFilters: React.FC<BlogFiltersProps> = ({
  selectedCategory,
  selectedTags,
  onCategoryChange,
  onTagsChange,
}) => {
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Categories</h3>
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
                className="text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>

        <div>
          <h3 className="font-medium mb-3">Tags</h3>
          {availableTags.map((tag) => (
            <label key={tag} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-gray-700">{tag}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogFilters;