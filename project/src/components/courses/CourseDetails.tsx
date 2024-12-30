import React from 'react';
import { Clock, BookOpen, Award } from 'lucide-react';
import { Course } from '../../types/course';

interface CourseDetailsProps {
  course: Course;
  onClose: () => void;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium 
              ${course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                course.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'}`}
            >
              {course.level}
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
          <p className="text-gray-600 mb-6">{course.description}</p>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-400" />
              <span>{course.chapters.length} Chapters</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-gray-400" />
              <span>Certificate</span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Course Content</h3>
            <div className="space-y-4">
              {course.chapters.map((chapter) => (
                <div 
                  key={chapter.id}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{chapter.title}</h4>
                    <span className="text-sm text-gray-500">{chapter.duration}</span>
                  </div>
                  <p className="text-sm text-gray-600">{chapter.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <button className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors">
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseDetails;