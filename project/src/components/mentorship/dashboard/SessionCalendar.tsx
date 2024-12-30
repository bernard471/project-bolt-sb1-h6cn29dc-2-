import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { MentorshipSession } from '../../../types/mentorship';

interface SessionCalendarProps {
  sessions: MentorshipSession[];
}

export const SessionCalendar: React.FC<SessionCalendarProps> = ({ sessions }) => {
  const upcomingSessions = sessions
    .filter(session => new Date(session.scheduledFor) > new Date())
    .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime());

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6">Upcoming Sessions</h2>
      <div className="space-y-4">
        {upcomingSessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-shrink-0 w-16 h-16 bg-cyan-100 rounded-lg flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-cyan-700">
                {new Date(session.scheduledFor).getDate()}
              </span>
              <span className="text-sm text-cyan-600">
                {new Date(session.scheduledFor).toLocaleString('default', { month: 'short' })}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{session.topic}</h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(session.scheduledFor).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                <span>{session.duration} minutes</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
              Join Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};