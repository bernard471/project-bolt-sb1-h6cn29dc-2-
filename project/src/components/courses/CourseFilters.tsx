import React from 'react';
import { Filter } from 'lucide-react';
import type { CourseLevel, CourseTopic, CourseDuration } from '@/types/course';

interface CourseFiltersProps {
  selectedLevels: CourseLevel[];
  selectedTopics: CourseTopic[];
  selectedDurations: CourseDuration[];
  onLevelChange: (levels: CourseLevel[]) => void;
  onTopicChange: (topics: CourseTopic[]) => void;
  onDurationChange: (durations: CourseDuration[]) => void;
}

const levels: CourseLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
const topics: CourseTopic[] = ['Network Security', 'Web Security', 'Cryptography', 'Malware Analysis', 'Incident Response', 'Forensics'];
const durations: CourseDuration[] = ['0-2 hours', '2-4 hours', '4-8 hours', '8+ hours'];

const CourseFilters: React.FC<CourseFiltersProps> = ({
  selectedLevels,
  selectedTopics,
  selectedDurations,
  onLevelChange,
  onTopicChange,
  onDurationChange,
}) => {
  const toggleFilter = <T extends string>(
    current: T[],
    value: T,
    onChange: (values: T[]) => void
  ) => {
    if (current.includes(value)) {
      onChange(current.filter(v => v !== value));
    } else {
      onChange([...current, value]);
    }
  };

  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="space-y-6">
        <FilterSection
          title="Level"
          items={levels}
          selected={selectedLevels}
          onChange={(value) => toggleFilter(selectedLevels, value as CourseLevel, onLevelChange)}
        />

        <FilterSection
          title="Topics"
          items={topics}
          selected={selectedTopics}
          onChange={(value) => toggleFilter(selectedTopics, value as CourseTopic, onTopicChange)}
        />

        <FilterSection
          title="Duration"
          items={durations}
          selected={selectedDurations}
          onChange={(value) => toggleFilter(selectedDurations, value as CourseDuration, onDurationChange)}
        />
      </div>
    </div>
  );
};

interface FilterSectionProps {
  title: string;
  items: string[];
  selected: string[];
  onChange: (value: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  items,
  selected,
  onChange,
}) => (
  <div>
    <h3 className="font-medium mb-3">{title}</h3>
    {items.map((item) => (
      <label key={item} className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={selected.includes(item)}
          onChange={() => onChange(item)}
          className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
        />
        <span className="text-gray-700">{item}</span>
      </label>
    ))}
  </div>
);

export default CourseFilters;