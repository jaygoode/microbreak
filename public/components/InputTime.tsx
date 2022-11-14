import React from "react";
// import { timerProps } from "./TimerInterface";
import { useEffect, useState, useRef } from "react";
import Timer from "./Timer";

const InputTimer = () => {
  const [timerFinished, setTimerFinished] = useState(true);
  const [isMicroBreak, setIsMicroBreak] = useState(false);
  const [isTimeSet, setIsTimeSet] = useState(false);
  const [prevTime, setPrevTime] = useState(null);
  const [seconds, setSeconds] = useState(1500);
  const interval = useRef<any>(null);
  const [hours, setHours] = useState(20);
  const [minutes, setMinutes] = useState(20);

  const submitHandler = (e: any) => {
    e.preventDefault();
    microBreakCounter = 0;
    totalTimeCounter = 0;
    setIsTimeSet(true);
    setSeconds(
      e.target[2].value + e.target[1].value * 60 + e.target[0].value * 3600
    );
    console.log(e.target[0].value * 3600);
    console.log(e.target[1].value * 60);
    console.log(e.target[2].value);
  };

  let microBreakCounter = 0;
  let totalTimeCounter = 0;
  let timeToMicroBreak = 0;
  let microBreak = false;

  const timeUntilMicroBreak = () => {
    let timeRandomizationDeviation = Math.floor(Math.random() * 20);
    timeToMicroBreak = 30;
    const plusOrMinus = Math.random() < 0.5;
    if (plusOrMinus) {
      timeToMicroBreak += timeRandomizationDeviation;
      console.log("nextMicroBreak = " + timeToMicroBreak);
      return timeToMicroBreak;
    } else {
      timeToMicroBreak -= timeRandomizationDeviation;
      console.log("nextMicroBreak = " + timeToMicroBreak);
      return timeToMicroBreak;
    }
  };

  const breakAlert = () => {
    let audio = document.getElementById("a1") as HTMLAudioElement | null;
    if (audio) {
      audio.play();
    }
  };

  useEffect(() => {
    if (isTimeSet) {
      interval.current = setInterval(
        () => setSeconds((prevSeconds) => prevSeconds - 1),
        1000
      );
    }
    return () => clearInterval(interval.current);
  }, [isTimeSet]);

  const cancelTimerHandler = () => {
    setIsTimeSet(false);
  };

  useEffect(() => {
    if (seconds <= 0) {
      setIsTimeSet(false);
      clearInterval(interval.current);
    }
  }, [seconds]);

  return (
    <div>
      {!isTimeSet ? (
        <div className="timer-wrapper">
          <div className="timer-inner">
            <div className="timer-segment">
              <form onSubmit={submitHandler}>
                <input
                  className="time-input"
                  type="number"
                  id="hours"
                  name="hours"
                  min="0"
                  max="24"
                  step="1"
                  defaultValue="00"
                />
                <input
                  className="time-input"
                  type="number"
                  id="minutes"
                  name="minutes"
                  min="0"
                  max="59"
                  step="1"
                  defaultValue="00"
                />
                <input
                  className="time-input"
                  type="number"
                  id="seconds"
                  name="seconds"
                  min="0"
                  max="59"
                  step="1"
                  defaultValue="00"
                />
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
                <button type="submit" value="Submit" className="time-input">
                  Start
                </button>
                <button onClick={breakAlert} className="time-input">
                  sound
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button onClick={cancelTimerHandler} className="time-input">
            cancel
          </button>
          {seconds}
          {microBreak && <p>{microBreakCounter}</p>}
          <Timer hours={hours} minutes={minutes} seconds={seconds} />
        </>
      )}
    </div>
  );
};

export default InputTimer;
