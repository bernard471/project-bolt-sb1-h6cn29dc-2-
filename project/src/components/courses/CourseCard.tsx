import React from 'react';
import { BookOpen, Clock, Award } from 'lucide-react';
import { Course } from '@/types/course';

type CourseCardProps = Pick<Course, 'title' | 'description' | 'level' | 'duration' | 'image'>;

const CourseCard: React.FC<CourseCardProps> = ({ title, description, level, duration, image }) => {
  const levelColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-blue-100 text-blue-800',
    Advanced: 'bg-purple-100 text-purple-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${levelColors[level]}`}>
          {level}
        </span>
        <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600 line-clamp-2">{description}</p>
        <div className="mt-4 flex items-center gap-4 text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm">Course</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4" />
            <span className="text-sm">Certificate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;