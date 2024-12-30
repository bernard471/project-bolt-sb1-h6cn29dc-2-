import React, { useEffect, useState } from 'react';

interface AssessmentTimerProps {
  timeLimit: number; // in minutes
  onTimeUp: () => void;
}

export const AssessmentTimer: React.FC<AssessmentTimerProps> = ({
  timeLimit,
  onTimeUp,
}) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const timeClass = timeLeft < 300 ? 'text-red-600' : 'text-gray-700';

  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4">
      <div className="text-sm font-medium text-gray-500">Time Remaining</div>
      <div className={`text-2xl font-bold ${timeClass}`}>
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
};