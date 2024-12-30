export type LabDifficulty = 'Easy' | 'Medium' | 'Hard';
export type SortOption = 'points' | 'difficulty' | 'duration';

export interface Lab {
  [x: string]: any;
  id: number;
  title: string;
  description: string;
  difficulty: LabDifficulty;
  duration: string;
  points: number;
  topics: string[];
  prerequisites: string[];
  tools: string[];
}