import React, { useEffect, useState } from 'react';

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void; // callback to trigger when the time is up
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    // If time is up, call the onTimeUp function
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    // Set interval to decrease the timer every second
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the interval when the component is unmounted or the timer reaches 0
    return () => clearInterval(timerInterval);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="timer">
      <span>{timeLeft} s</span>
    </div>
  );
};

export default Timer;
