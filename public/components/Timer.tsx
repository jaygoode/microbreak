import React, { useState, useEffect } from "react";

export interface timerProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const Timer = ({ seconds, minutes, hours }: timerProps) => {
  const [time, setTime] = useState<any>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    setTime({
      seconds: paddedNumbers(seconds),
      minutes: paddedNumbers(minutes),
      hours: paddedNumbers(hours),
    });
    console.log(time.minutes);
    console.log(minutes);
  }, [seconds]);

  const paddedNumbers = (number: number) => {
    let paddedNumbers = number.toString();
    if (paddedNumbers.length < 2) {
      paddedNumbers = "0".concat("", paddedNumbers);
      console.log(paddedNumbers);
    }
    return paddedNumbers;
  };

  // const convertSeconds = () => {

  //   const convertedSeconds = Math.round(
  //     (seconds / 60 - Math.floor(seconds / 60)) * 60
  //   );
  //   let paddedSeconds = convertedSeconds.toString();
  //   if (paddedSeconds.length < 2) paddedSeconds = "0".concat("", paddedSeconds);

  //   return paddedSeconds;
  // };

  // const convertMinutes = () => {
  //   const convertedMinutes = Math.round(
  //     (seconds / 60 - Math.floor(seconds / 60)) * 60
  //   );
  //   let paddedSeconds = convertedMinutes.toString();
  //   if (paddedSeconds.length < 2) paddedSeconds = "0".concat("", paddedSeconds);

  //   return paddedSeconds;
  // };

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
