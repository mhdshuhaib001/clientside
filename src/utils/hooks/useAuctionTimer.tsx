import { useState, useEffect, useCallback } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface UseAuctionTimerProps {
  endDateTime: string | Date;
  onTimeEnd?: () => void;
}

interface UseAuctionTimerReturn {
  timeLeft: TimeLeft;
  isEnded: boolean;
  formattedEndTime: {
    date: string;
    time: string;
  };
}

export const useAuctionTimer = ({ 
  endDateTime, 
  onTimeEnd 
}: UseAuctionTimerProps): UseAuctionTimerReturn => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEnded, setIsEnded] = useState(false);

  const calculateTimeLeft = useCallback(() => {
    const endTime = new Date(endDateTime).getTime();
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance <= 0) {
      if (!isEnded) {
        setIsEnded(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        onTimeEnd?.();
      }
      return;
    }

    const newTimeLeft = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };

    // Update state only if there's a change
    setTimeLeft((prevTimeLeft) => (
      JSON.stringify(prevTimeLeft) !== JSON.stringify(newTimeLeft)
        ? newTimeLeft
        : prevTimeLeft
    ));
  }, [endDateTime, onTimeEnd, isEnded]);

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const formattedEndTime = {
    date: new Date(endDateTime).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    time: new Date(endDateTime).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
  };

  return {
    timeLeft,
    isEnded,
    formattedEndTime,
  };
};
