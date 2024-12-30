import React from 'react';
import { Video, Users } from 'lucide-react';

interface VideoIntegrationProps {
  sessionId: string;
  platform: 'zoom' | 'meet';
  meetingUrl: string;
  onJoin: () => void;
}

export const VideoIntegration: React.FC<VideoIntegrationProps> = ({
  platform,
  meetingUrl,
  onJoin,
}) => {
  const platformConfig = {
    zoom: {
      name: 'Zoom',
      icon: Users,
      color: 'bg-blue-600',
    },
    meet: {
      name: 'Google Meet',
      icon: Video,
      color: 'bg-green-600',
    },
  };

  const { name, icon: Icon, color } = platformConfig[platform];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 ${color} rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Join {name} Meeting
          </h3>
          <p className="text-sm text-gray-500">
            Click the button below to join the video call
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">Meeting URL</span>
          <span className="text-sm font-medium text-gray-900">{meetingUrl}</span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => window.open(meetingUrl, '_blank')}
            className={`flex-1 px-4 py-2 ${color} text-white rounded-lg hover:opacity-90 transition-opacity`}
          >
            Join Meeting
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(meetingUrl)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};