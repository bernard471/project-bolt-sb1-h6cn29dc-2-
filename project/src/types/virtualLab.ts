export type LabEnvironment = 'Kali' | 'Ubuntu' | 'Windows' | 'Custom';
export type LabDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export interface VirtualLab {
  id: number;
  title: string;
  description: string;
  environment: LabEnvironment;
  difficulty: LabDifficulty;
  duration: number; // in minutes
  tools: string[];
  objectives: string[];
  setupInstructions: string[];
  tasks: LabTask[];
}

export interface LabTask {
  id: number;
  title: string;
  description: string;
  hints: string[];
  validation: {
    type: 'command' | 'file' | 'network' | 'custom';
    criteria: string;
  };
  points: number;
}