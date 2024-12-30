import React from 'react';
import CourseCard from './CourseCard';
import type { Course } from '@/types/course';

interface CourseGridProps {
  courses: Course[];
  onCourseClick: (course: Course) => void;
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses, onCourseClick }) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No courses found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <div key={course.id} onClick={() => onCourseClick(course)} className="cursor-pointer">
        <CourseCard
         {...course} />
        </div>
      ))}
    </div>
  );
};

export default CourseGrid;