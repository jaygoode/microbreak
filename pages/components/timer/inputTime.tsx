import React from "react";
import { timerProps } from "./timerInterface";
import { useEffect, useState, useRef } from "react";
import Timer from "./timer";

const InputTimer = () => {
  const [timerFinished, setTimerFinished] = useState(true);
  const [isMicroBreak, setIsMicroBreak] = useState(false);
  const [isTimeSet, setIsTimeSet] = useState(false);
  // const [hours, setHours] = useState(20);
  // const [minutes, setMinutes] = useState(20);
  // const [seconds, setSeconds] = useState(20);
  const seconds = useRef(0);
  const minutes = useRef(0);
  const hours = useRef(0);

  const submitHandler = (e: any) => {
    e.preventDefault();
    microBreakCounter = 0;
    totalTimeCounter = 0;
    setIsTimeSet(true);
    hours.current = e.target[0].value;
    minutes.current = e.target[1].value;
    seconds.current = e.target[2].value;
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
    timeUntilMicroBreak();

    // breakAlert();
    let intervalId = setInterval(() => {
      if (isTimeSet) {
        if (microBreak) {
          microBreakCounter += 1;
        }
        if (totalTimeCounter === timeToMicroBreak) {
          console.log("total is same as time to micro if statement");
          microBreak = true;
          totalTimeCounter = 0;
        }

        if (microBreakCounter >= 10) {
          console.log("ismicro" + microBreak);
          microBreakCounter = 0;
          microBreak = false;
          timeUntilMicroBreak();
        }

        console.log("tot = " + totalTimeCounter + "micro" + microBreakCounter);

        if (seconds.current > 0) {
          seconds.current = seconds.current - 1;
        } else if (seconds.current <= 0 && minutes.current > 0) {
          seconds.current = 59;
          minutes.current = minutes.current - 1;
        }
        if (minutes.current < 1 && hours.current > 0) {
          hours.current = hours.current - 1;
          minutes.current = minutes.current + 59;
        }
        if (
          hours.current <= 0 &&
          minutes.current <= 0 &&
          seconds.current <= 0
        ) {
          setTimerFinished(true);
        }

        totalTimeCounter += 1;
      }
    }, 100);

    if (isTimeSet === false) {
      clearInterval(intervalId);
    }
  }, [isTimeSet]);

  const cancelTimerHandler = (intervalId: any) => {
    setIsTimeSet(false);
    clearInterval(intervalId);
  };

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
          {microBreak && <p>{microBreakCounter}</p>}
          <Timer
            hours={hours.current}
            minutes={minutes.current}
            seconds={seconds.current}
          />
        </>
      )}
    </div>
  );
};

export default InputTimer;
