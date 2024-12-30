import React from 'react';
import CourseCard from './CourseCard';
import { courses } from '@/data/courses';

const CourseCatalog: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Start your cybersecurity journey with our expert-crafted courses,
            from foundational concepts to advanced techniques.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCatalog;