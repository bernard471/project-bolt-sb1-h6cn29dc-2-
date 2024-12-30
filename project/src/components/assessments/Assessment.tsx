import React, { useState } from 'react';
import { AssessmentQuestion } from './AssessmentQuestion';
import { AssessmentTimer } from './AssessmentTimer';
import { AssessmentResults } from './AssessmentResults';
import { Assessment as AssessmentType, AssessmentSubmission } from '../../types/assessment';
import { assessmentsService } from '../../services/assessments.service';
import { useAuth } from '../../hooks/useAuth';

interface AssessmentProps {
  assessment: AssessmentType;
  onComplete: () => void;
}

export const Assessment: React.FC<AssessmentProps> = ({
  assessment,
  onComplete,
}) => {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submission, setSubmission] = useState<AssessmentSubmission | null>(null);

  const handleAnswer = (answer: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [assessment.questions[currentQuestion].id]: answer,
    }));
  };

  const handleSubmit = async () => {
    if (!user) return;

    const score = assessment.questions.reduce((total, question) => {
      const answer = answers[question.id];
      const correct = Array.isArray(question.correctAnswer)
        ? question.correctAnswer.every((a) => answer.includes(a))
        : answer === question.correctAnswer;
      return total + (correct ? question.points : 0);
    }, 0);

    const submission: AssessmentSubmission = {
      userId: user.id,
      assessmentId: assessment.id,
      answers,
      score,
    };

    await assessmentsService.submitAssessment(submission);
    setSubmission(submission);
    setSubmitted(true);
    onComplete();
  };

  if (submitted && submission) {
    return <AssessmentResults assessment={assessment} submission={submission} />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {assessment.timeLimit && (
        <AssessmentTimer
          timeLimit={assessment.timeLimit}
          onTimeUp={handleSubmit}
        />
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {assessment.title}
          </h2>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{assessment.questions.length} Questions</span>
            <span>{assessment.points} Points</span>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <AssessmentQuestion
            question={assessment.questions[currentQuestion]}
            onAnswer={handleAnswer}
          />
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              disabled={currentQuestion === 0}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
            >
              Previous
            </button>
            
            {currentQuestion === assessment.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Submit Assessment
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion((prev) => prev + 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};