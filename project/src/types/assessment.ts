export type AssessmentType = 'Quiz' | 'Practice' | 'CTF' | 'Project';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Assessment {
  id: number;
  title: string;
  type: AssessmentType;
  skillLevel: SkillLevel;
  points: number;
  timeLimit?: number; // in minutes
  questions: AssessmentQuestion[];
  prerequisites?: string[];
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  type: 'multiple-choice' | 'practical' | 'code';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface UserProgress {
  userId: string;
  courseId: number;
  completedLessons: number[];
  assessmentScores: Record<number, number>;
  earnedBadges: string[];
  skillLevels: Record<string, SkillLevel>;
}
export interface AssessmentSubmission {
  userId: string;
  assessmentId: number;
  answers: Record<number, string | string[]>;
  score: number;
}