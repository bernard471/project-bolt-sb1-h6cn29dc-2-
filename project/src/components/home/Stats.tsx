import React from 'react';
import { Users, BookOpen, Award, Target } from 'lucide-react';

const Stats: React.FC = () => {
  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: '10K+',
      label: 'Active Learners'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      value: '80+',
      label: 'Courses'
    },
    {
      icon: <Target className="w-6 h-6" />,
      value: '50+',
      label: 'Hands-on Labs'
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: '5K+',
      label: 'Certifications'
    }
  ];

  return (
    <div className="mt-20 py-8 border-t border-slate-700/50">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 mb-4">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;