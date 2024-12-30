import React from 'react';
import { Terminal, Clock, Trophy } from 'lucide-react';
import { Lab } from '../../types/lab';

const LabCard: React.FC<Lab> = ({ title, description, difficulty, duration, points }) => {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
          <div className="flex items-center text-cyan-600">
            <Trophy className="w-4 h-4 mr-1" />
            <span className="font-medium">{points} pts</span>
          </div>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4 flex items-center gap-4 text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Terminal className="w-4 h-4" />
            <span className="text-sm">Hands-on</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabCard;