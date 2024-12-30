import React, { useState } from 'react';
import { User, Mail, Award, BookOpen, Terminal } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { progress } = useProgress();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [bio, setBio] = useState('');

  const handleSave = async () => {
    // Update profile logic here
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.displayName}`}
                  alt={user?.displayName}
                  className="w-32 h-32 rounded-full mx-auto"
                />
                <button className="absolute bottom-0 right-0 bg-cyan-600 text-white p-2 rounded-full hover:bg-cyan-700">
                  <User className="w-4 h-4" />
                </button>
              </div>
              {isEditing ? (
                <div className="mt-4">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              ) : (
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {user?.displayName}
                </h2>
              )}
              <p className="text-gray-500 flex items-center justify-center gap-2 mt-2">
                <Mail className="w-4 h-4" />
                {user?.email}
              </p>
            </div>

            {isEditing ? (
              <div className="mt-6">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="w-full h-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full mt-6 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Progress Section */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Progress Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProgressCard
                icon={BookOpen}
                title="Courses"
                value={progress?.completedCourses || 0}
                label="completed"
                color="cyan"
              />
              <ProgressCard
                icon={Terminal}
                title="Labs"
                value={progress?.completedLabs || 0}
                label="completed"
                color="purple"
              />
              <ProgressCard
                icon={Award}
                title="Points"
                value={progress?.totalPoints || 0}
                label="earned"
                color="green"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
            {/* Activity list would go here */}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h3>
            {/* Achievements grid would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProgressCardProps {
  icon: React.ElementType;
  title: string;
  value: number;
  label: string;
  color: 'cyan' | 'purple' | 'green';
}

const ProgressCard: React.FC<ProgressCardProps> = ({ icon: Icon, title, value, label, color }) => {
  const colorClasses = {
    cyan: 'bg-cyan-50 text-cyan-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
  };

  return (
    <div className={`rounded-lg p-4 ${colorClasses[color]}`}>
      <div className="flex items-center gap-3">
        <Icon className="w-6 h-6" />
        <div>
          <h4 className="font-medium">{title}</h4>
          <p>{value} {label}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;