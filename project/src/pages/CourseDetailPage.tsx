import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { coursesService } from '../services/courses.service';
import { Course } from '../types/course';
import { Terminal, BookOpen, Clock } from 'lucide-react';

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await coursesService.getCourseById(Number(id));
        setCourse(data);
      } catch (error) {
        console.error('Failed to fetch course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="relative h-64">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium 
              ${course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                course.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'}`}
            >
              {course.level}
            </span>
            <h1 className="mt-2 text-3xl font-bold text-white">{course.title}</h1>
          </div>
        </div>

        <div className="p-6">
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
              <Terminal className="w-5 h-5 text-gray-400" />
              <span>Hands-on Labs</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">About this course</h2>
            <p className="text-gray-600">{course.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Course Content</h2>
            <div className="space-y-4">
              {course.chapters.map((chapter, index) => (
                <div
                  key={chapter.id}
                  className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">
                        Chapter {index + 1}: {chapter.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {chapter.description}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">{chapter.duration}</span>
                  </div>
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
export default CourseDetailPage;