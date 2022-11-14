import React from "react";
import { timerProps } from "./timerInterface";

const timer = ({ hours, minutes, seconds }: timerProps) => {
  return (
    <div className="timer-wrapper">
      <div className="timer-inner">
        <div className="timer-segment">
          <span className="time">{hours}</span>
          <span className="label">:</span>
        </div>
        <div className="timer-segment">
          <span className="time">{minutes}</span>
          <span className="label">:</span>
        </div>
        <div className="timer-segment">
          <span className="time">{seconds}</span>
          <span className="label"></span>
        </div>
        <audio
          // controls
          id="a1"
          src="/resources/bell.mp3"
          crossOrigin="anonymous"
          preload="auto"
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
    </div>
  );
};

export default timer;
