import React, { useState } from 'react';
import { AssessmentQuestion as QuestionType } from '../../types/assessment';

interface AssessmentQuestionProps {
  question: QuestionType;
  onAnswer: (answer: string | string[]) => void;
}

export const AssessmentQuestion: React.FC<AssessmentQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>('');

  const handleAnswerChange = (value: string | string[]) => {
    setSelectedAnswer(value);
    onAnswer(value);
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">{question.question}</h3>

      {question.type === 'multiple-choice' && (
        <div className="space-y-2">
          {question.options?.map((option) => (
            <label key={option} className="flex items-center space-x-3">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={selectedAnswer === option}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === 'practical' && (
        <div className="space-y-2">
          <textarea
            value={selectedAnswer as string}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500"
            placeholder="Enter your solution..."
          />
        </div>
      )}

      {question.type === 'code' && (
        <div className="space-y-2">
          <textarea
            value={selectedAnswer as string}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="w-full h-48 p-3 font-mono text-sm bg-slate-800 text-white rounded-lg focus:ring-2 focus:ring-cyan-500"
            placeholder="Write your code here..."
          />
        </div>
      )}
    </div>
  );
};