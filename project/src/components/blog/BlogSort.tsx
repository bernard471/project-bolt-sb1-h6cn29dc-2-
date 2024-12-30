import React from 'react';
import { SortAsc } from 'lucide-react';
import { SortOption } from '../../types/blog';

interface BlogSortProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Most Recent' },
  { value: 'popular', label: 'Most Viewed' },
  { value: 'trending', label: 'Trending' },
];

const BlogSort: React.FC<BlogSortProps> = ({ sortOption, onSortChange }) => {
  return (
    <div className="flex items-center gap-2">
      <SortAsc className="w-5 h-5 text-gray-500" />
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        {sortOptions.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
};

export default BlogSort;