import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  nextRoundTime: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ nextRoundTime }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(nextRoundTime).getTime();
      const difference = target - now;

      if (difference > 0) {
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(
          `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
          )}:${String(seconds).padStart(2, "0")}`
        );
      } else {
        setTimeLeft("00:00:00");
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
