import React from 'react';
import LabCard from './LabCard';
import { Lab } from '../../types/lab';

interface LabGridProps {
  labs: Lab[];
  onLabClick: (lab: Lab) => void;
}

const LabGrid: React.FC<LabGridProps> = ({ labs, onLabClick }) => {
  if (labs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No labs found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {labs.map((lab) => (
        <div key={lab.id} onClick={() => onLabClick(lab)} className="cursor-pointer">
          <LabCard {...lab} />
        </div>
      ))}
    </div>
  );
};

export default LabGrid;