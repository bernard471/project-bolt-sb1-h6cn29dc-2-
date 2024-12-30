import React from 'react';
import { ArrowRight } from 'lucide-react';
import LabCard from '../labs/LabCard';
import { labs } from '../../data/labs';

const FeaturedLabs: React.FC = () => {
  const featuredLabs = labs.slice(0, 3);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Popular Labs</h2>
            <p className="mt-2 text-gray-600">Practice your skills with hands-on cybersecurity labs</p>
          </div>
          <button 
            onClick={() => document.getElementById('labs')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition-colors"
          >
            Explore All Labs <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredLabs.map((lab) => (
            <LabCard key={lab.id} {...lab} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLabs;