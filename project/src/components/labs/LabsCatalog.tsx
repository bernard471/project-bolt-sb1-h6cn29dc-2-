import React from 'react';
import LabCard from './LabCard';
import { labs } from '../../data/labs';

const LabsCatalog: React.FC = () => {
  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Practical Labs</h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Put your skills to the test with our hands-on cybersecurity labs.
            Practice in real-world scenarios and earn points.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labs.map((lab) => (
            <LabCard key={lab.id} {...lab} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabsCatalog;