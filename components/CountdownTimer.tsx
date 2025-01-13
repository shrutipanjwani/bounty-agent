import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  nextRoundTime: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ nextRoundTime }) => {
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  useEffect(() => {
    const calculateTimeLeft = () => {
      try {
        // Use actual current time
        const now = Date.now(); // Current timestamp
        const target = new Date(nextRoundTime).getTime();
        const difference = target - now;

        // Debug logging
        console.log({
          currentTime: new Date().toISOString(),
          targetTime: new Date(target).toISOString(),
          difference: Math.floor(difference / 1000), // in seconds
        });

        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          const formattedTime = [hours, minutes, seconds]
            .map(unit => unit.toString().padStart(2, '0'))
            .join(':');

          setTimeLeft(formattedTime);
        } else {
          setTimeLeft('00:00:00');
        }
      } catch (error) {
        console.error('Error calculating time:', error);
        setTimeLeft('00:00:00');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [nextRoundTime]);

  return (
    <div className="flex flex-col text-center items-center justify-center">
      <div className="text-6xl font-og-bold tracking-wider text-gray-900">
        {timeLeft}
      </div>
      <p className="text-sm mt-2 text-gray-500">Until the next round begins</p>
    </div>
  );
};

export default CountdownTimer;
