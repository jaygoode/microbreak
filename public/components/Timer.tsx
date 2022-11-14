import React, { useState, useEffect } from "react";

export interface timerProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const Timer = ({ seconds }: timerProps) => {
  const [time, setTime] = useState({
    // hours: 0,
    minutes: 0,
    seconds: "0",
  });

  useEffect(() => {
    setTime({
      // hours: Math.floor(seconds / 3600),
      minutes: Math.floor(seconds / 60),
      seconds: convertSeconds(),
    });
    // console.log(time.hours);
    console.log(time.minutes);
    console.log(time.seconds);
  }, [seconds]);

  const convertSeconds = () => {
    const convertedSeconds = Math.round(
      (seconds / 60 - Math.floor(seconds / 60)) * 60
    );
    let paddedSeconds = convertedSeconds.toString();
    if (paddedSeconds.length < 2) paddedSeconds = "0".concat("", paddedSeconds);

    return paddedSeconds;
  };

  return (
    <div className="timer-wrapper">
      <div className="timer-inner">
        <div className="timer-segment">
          {/* <span className="time">{time.hours}</span> */}
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
