import React, { useState } from 'react';
import { Terminal } from '../../lib/terminal/Terminal';
import { Lab } from '../../types/lab';

interface TerminalLabProps {
  lab: Lab;
  onComplete: (success: boolean) => void;
}

export const TerminalLab: React.FC<TerminalLabProps> = ({ lab, onComplete }) => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const handleCommand = (command: string) => {
    setCommandHistory(prev => [...prev, command]);
    
    // Lab-specific command validation would go here
    // This is a simplified example
    if (lab.validation?.command === command) {
      onComplete(true);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          {lab.title}
        </h3>
        <p className="text-slate-300 mb-4">
          {lab.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {lab.tools.map((tool) => (
            <span 
              key={tool}
              className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-sm"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <Terminal 
        onCommand={handleCommand}
        className="min-h-[400px]"
      />
    </div>
  );
};