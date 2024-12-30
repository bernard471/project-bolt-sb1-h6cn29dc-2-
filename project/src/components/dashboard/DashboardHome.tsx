import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useProgress } from '../../hooks/useProgress';
import { coursesService } from '../../services/courses.service';
import { labsService } from '../../services/labs.service';
import { achievementsService } from '../../services/achievements.service';

export const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const { progress } = useProgress();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome back, {user?.displayName}!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-cyan-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-cyan-900 mb-2">
              Course Progress
            </h3>
            <p className="text-cyan-600">
              {progress?.completedCourses || 0} courses completed
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              Lab Achievements
            </h3>
            <p className="text-purple-600">
              {progress?.completedLabs || 0} labs completed
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Total Points
            </h3>
            <p className="text-green-600">
              {progress?.totalPoints || 0} points earned
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          {/* Activity list would go here */}
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Recommended Courses
          </h3>
          {/* Course recommendations would go here */}
        </div>
      </div>
    </div>
  );
};