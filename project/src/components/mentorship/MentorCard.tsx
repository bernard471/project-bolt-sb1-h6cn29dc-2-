import React from 'react';
import { Star, Clock, Award, CheckCircle } from 'lucide-react';
import { Mentor } from '../../types/mentorship';

interface MentorCardProps {
  mentor: Mentor;
  onRequestSession: (mentorId: string) => void;
}

export const MentorCard: React.FC<MentorCardProps> = ({ mentor, onRequestSession }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={mentor.user?.avatar_url || `https://ui-avatars.com/api/?name=${mentor.user?.display_name}`}
              alt={mentor.user?.display_name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {mentor.user?.display_name}
                </h3>
                {mentor.isVerified && (
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-600">
                  {mentor.rating.toFixed(1)} ({mentor.totalSessions} sessions)
                </span>
              </div>
            </div>
          </div>
          <span className="text-cyan-600 font-medium">
            ${mentor.hourlyRate}/hr
          </span>
        </div>

        <div className="mt-4">
          <p className="text-gray-600 line-clamp-2">{mentor.bio}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {mentor.expertise.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{mentor.yearsOfExperience}+ years experience</span>
          </div>
          <button
            onClick={() => onRequestSession(mentor.id)}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Request Session
          </button>
        </div>
      </div>
    </div>
  );
};