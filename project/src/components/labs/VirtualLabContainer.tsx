import React, { useState } from 'react';
import { Terminal, Play, RefreshCw, HelpCircle } from 'lucide-react';
import { VirtualLab, LabTask } from '../../types/virtualLab';

interface VirtualLabContainerProps {
  lab: VirtualLab;
}

const VirtualLabContainer: React.FC<VirtualLabContainerProps> = ({ lab }) => {
  const [currentTask, setCurrentTask] = useState<LabTask>(lab.tasks[0]);
  const [showHints, setShowHints] = useState(false);

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden">
      <div className="border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-cyan-500" />
            <h3 className="text-lg font-semibold text-white">{lab.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-cyan-400 transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button 
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Lab
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Terminal emulator would go here */}
          <div className="bg-slate-800 rounded-lg p-4 h-96">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <pre className="text-slate-300 font-mono text-sm">
              {/* Terminal output would go here */}
              root@kali:~# _
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <h4 className="text-lg font-medium text-white mb-2">Current Task</h4>
            <p className="text-slate-300 mb-4">{currentTask.description}</p>
            {showHints && (
              <div className="bg-slate-700/50 rounded p-3 mt-4">
                <h5 className="text-sm font-medium text-cyan-400 mb-2">Hints:</h5>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                  {currentTask.hints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 mt-4 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualLabContainer;