import React, { useState, useEffect } from "react";

export interface timerProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const Timer = ({ seconds, minutes, hours }: timerProps) => {
  const [time, setTime] = useState<any>({
    hours: "",
    minutes: "",
    seconds: "",
  });

  useEffect(() => {
    setTime({
      seconds: paddedNumbers(seconds),
      minutes: paddedNumbers(minutes),
      hours: paddedNumbers(hours),
    });
  }, [seconds]);

  const paddedNumbers = (number: number) => {
    let paddedNumbers = number.toString();
    if (paddedNumbers.length < 2) {
      paddedNumbers = "0".concat("", paddedNumbers);
    }
    return paddedNumbers;
  };

  return (
    <div className="timer-wrapper">
      <div className="timer-inner">
        <div className="timer-segment">
          <span className="time">{time.hours}</span>
          <span className="label">:</span>
        </div>
        <div className="timer-segment">
          <span className="time">{time.minutes}</span>
          <span className="label">:</span>
        </div>
        <div className="timer-segment">
          <span className="time">{time.seconds}</span>
          <span className="label"></span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
