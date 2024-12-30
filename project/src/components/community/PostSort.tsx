import React from 'react';
import { SortAsc } from 'lucide-react';
import type { SortOption } from '@/types/community';

interface PostSortProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Most Recent' },
  { value: 'popular', label: 'Most Viewed' },
  { value: 'unanswered', label: 'Unanswered' },
];

const PostSort: React.FC<PostSortProps> = ({ sortOption, onSortChange }) => {
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

export default PostSort;