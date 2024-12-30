import React, { useState } from 'react';
import { Search } from 'lucide-react';
import CourseGrid from '@/components/courses/CourseGrid';
import CourseFilters from '@/components/courses/CourseFilters';
import CourseSort from '@/components/courses/CourseSort';
import CourseDetails from '@/components/courses/CourseDetails';
import { filterCourses } from '@/utils/courseFilters';
import { sortCourses } from '@/utils/courseSorting';
import { courses } from '@/data/courses';
import type { Course, CourseLevel, CourseTopic, CourseDuration, SortOption } from '@/types/course';

const CoursesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<CourseLevel[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<CourseTopic[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<CourseDuration[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = filterCourses(
    courses,
    searchQuery,
    selectedLevels,
    selectedTopics,
    selectedDurations
  );
  
  const sortedCourses = sortCourses(filteredCourses, sortOption);

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Cybersecurity Courses</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of cybersecurity courses,
            from foundational concepts to advanced techniques.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <CourseFilters
            selectedLevels={selectedLevels}
            selectedTopics={selectedTopics}
            selectedDurations={selectedDurations}
            onLevelChange={setSelectedLevels}
            onTopicChange={setSelectedTopics}
            onDurationChange={setSelectedDurations}
          />
          
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <CourseSort
                  sortOption={sortOption}
                  onSortChange={setSortOption}
                />
              </div>
            </div>

            <CourseGrid 
            courses={sortedCourses} 
            onCourseClick={setSelectedCourse}
            />
            {selectedCourse && (
              <CourseDetails
                course={selectedCourse}
                onClose={() => setSelectedCourse(null)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;