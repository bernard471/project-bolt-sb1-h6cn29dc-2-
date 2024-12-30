import React, { useState, useEffect } from 'react';
import { Calendar, MessageSquare, Users, Star } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { mentorshipService } from '../../../services/mentorship.service';
import { SessionCalendar } from './SessionCalendar';
import { SessionsList } from './SessionsList';
import { ChatList } from '../chat/ChatList';

export const MentorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'sessions' | 'chat' | 'reviews'>('sessions');
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;
      try {
        const data = await mentorshipService.getMentorshipSessions(user.id);
        setSessions(data);
      } catch (error) {
        console.error('Failed to fetch sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mentor Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('sessions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'sessions' 
                ? 'bg-cyan-600 text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Sessions
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'chat' 
                ? 'bg-cyan-600 text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Chat
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'reviews' 
                ? 'bg-cyan-600 text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Star className="w-5 h-5" />
            Reviews
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'sessions' && (
              <>
                <SessionCalendar sessions={sessions} />
                <SessionsList sessions={sessions} />
              </>
            )}
            {activeTab === 'chat' && <ChatList />}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                {/* Reviews component would go here */}
              </div>
            )}
          </div>
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Sessions</span>
                  <span className="font-semibold">{sessions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Mentees</span>
                  <span className="font-semibold">
                    {new Set(sessions.map(s => s.mentee_id)).size}
                  </span>
                </div>
                {/* Add more stats */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};