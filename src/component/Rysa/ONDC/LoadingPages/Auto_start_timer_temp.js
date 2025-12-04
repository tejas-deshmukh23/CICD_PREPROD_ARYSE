"use client";
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});const AutoStartTimer = () => {
  const [timeLeft, setTimeLeft] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Timer automatically starts when component mounts
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setIsCompleted(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCircleProgress = () => {
    const progress = ((60 - timeLeft) / 60) * 283; // 283 is circumference
    return progress;
  };

  const getTimerColor = () => {
    if (isCompleted) return "text-green-500";
    if (timeLeft <= 10) return "text-green-500";
    if (timeLeft <= 20) return "text-green-500";
    return "text-red-500";
  };

  const getBackgroundColor = () => {
    if (isCompleted) return "bg-green-50 border-green-200";
    if (timeLeft <= 10) return "bg-green-50 border-green-200";
    if (timeLeft <= 20) return "bg-green-50 border-green-200";
    return "bg-red-50 border-red-200";
  };

  return (
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className={`min-h-screen bg-gray-100 flex items-center justify-center p-4 ${outfit}`}>
      <div
        className={`max-w-sm w-full ${getBackgroundColor()} rounded-xl shadow-lg p-6 transition-all duration-300 border-2`}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Please Wait</h2>
          </div>
          <p className="text-gray-600 text-sm">
            {isCompleted
              ? "You can proceed now!"
              : "Processing your request..."}
          </p>
        </div>

        {/* Circular Timer */}
        <div className="relative flex items-center justify-center mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-gray-300"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className={getTimerColor()}
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={283 - getCircleProgress()}
              style={{
                transition: "stroke-dashoffset 1s linear",
              }}
            />
          </svg>

          {/* Time display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${getTimerColor()} transition-colors duration-300`}
              >
                {timeLeft}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {isCompleted ? "Done" : "seconds"}
              </div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="text-center">
          {isCompleted ? (
            <div className="p-3 bg-green-100 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium text-sm">
                Finding best offers for you!
              </p>
            </div>
          ) : (
            <div className="p-3 bg-gray-100 border border-gray-200 rounded-lg">
              <p className="text-gray-600 text-sm">
                {timeLeft > 20
                  ? "Please wait..."
                  : timeLeft > 10
                  ? "Almost ready..."
                  : "Just a moment..."}
              </p>
            </div>
          )}
        </div>

        {/* Progress Bar (Alternative visual) */}
        {/* <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${
                isCompleted ? 'bg-green-500' : 
                timeLeft <= 10 ? 'bg-red-500' : 
                timeLeft <= 20 ? 'bg-yellow-500' : 'bg-blue-500'
              }`}
              style={{ width: `${((30 - timeLeft) / 30) * 100}%` }}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AutoStartTimer;
