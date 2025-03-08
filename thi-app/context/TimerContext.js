import React, { createContext, useState, useEffect } from "react";

// Create context
export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [inputHours, setInputHours] = useState("");
  const [inputMinutes, setInputMinutes] = useState("10");
  const [inputSeconds, setInputSeconds] = useState("");

  const formatTime = (time) => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      return {
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
      };
  };

  {/* Checks for when running/paused and updates countdown */}  
  useEffect(() => {
    let interval;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const startTimer = (hours, minutes, seconds) => {
    const totalTime = hours * 3600 + minutes * 60 + seconds;
    setTimeLeft(totalTime);
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
    setIsRunning(false);
  };

  const resumeTimer = () => {
    setIsPaused(false);
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
  };

  return (
    <TimerContext.Provider
      value={{
        timeLeft,
        isRunning,
        isPaused,
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
        inputHours,
        setInputHours,
        inputMinutes,
        setInputMinutes,
        inputSeconds,
        setInputSeconds,
        formatTime,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
