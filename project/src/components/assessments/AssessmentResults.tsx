import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Assessment, AssessmentSubmission } from '../../types/assessment';

interface AssessmentResultsProps {
  assessment: Assessment;
  submission: AssessmentSubmission;
}

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  assessment,
  submission,
}) => {
  const percentageScore = Math.round((submission.score / assessment.totalPoints) * 100);
  const passed = percentageScore >= 70;

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="text-center">
        {passed ? (
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        ) : (
          <XCircle className="mx-auto h-12 w-12 text-red-500" />
        )}
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Assessment Complete
        </h2>
        <p className="mt-1 text-gray-500">
          You scored {submission.score} out of {assessment.totalPoints} points
        </p>
      </div>

      <div className="mt-8">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-cyan-200 text-cyan-800">
                Score
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-cyan-600">
                {percentageScore}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-cyan-200">
            <div
              style={{ width: `${percentageScore}%` }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                passed ? 'bg-cyan-500' : 'bg-red-500'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Question Review</h3>
        {assessment.questions.map((question, index) => (
          <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">Question {index + 1}</p>
                <p className="mt-1 text-gray-600">{question.question}</p>
              </div>
              <div className="flex items-center">
                {submission.answers[question.id] === question.correctAnswer ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>
            {submission.answers[question.id] !== question.correctAnswer && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500">Explanation:</p>
                <p className="mt-1 text-sm text-gray-600">{question.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};