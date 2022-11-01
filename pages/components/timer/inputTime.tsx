import React from "react";
import { timerProps } from "./timerInterface";
import { useEffect, useState } from "react";
import Timer from "./timer";

const InputTimer = () => {
  const [timerFinished, setTimerFinished] = useState(true);
  // const [isMicroBreak, setIsMicroBreak] = useState(true);
  const [isTimeSet, setIsTimeSet] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const submitHandler = (e: any) => {
    e.preventDefault();
    microBreakCounter = 0;
    totalTimeCounter = 0;
    setIsTimeSet(true);
    setHours(e.target[0].value);
    setMinutes(e.target[1].value);
    setSeconds(e.target[2].value);
  };

  const cancelTimerHandler = () => {
    setIsTimeSet(false);
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

  useEffect(() => {
    console.log(microBreak);
    timeUntilMicroBreak();
    let intervalId = null;
    intervalId = setInterval(() => {
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
      }
      let h = hours;
      let m = minutes;
      let s = seconds;

      if (minutes > 0) {
        // setMinutes(prev => prev -1);
      } else if (minutes < 1 && hours > 0) {
        m = 59;
        h -= 1;
        setHours((prev) => prev - 1);
        setMinutes((prev) => (prev = m));
      }

      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else if (seconds <= 0 && minutes > 0) {
        console.log("neg min");
        s = 59;
        m -= 1;
        setMinutes((prev) => prev - 1);
        setSeconds((prev) => prev + 59);
      }

      if (hours <= 0 && minutes <= 0 && seconds <= 0) {
        setTimerFinished(true);
      }
      totalTimeCounter += 1;
    }, 1000);

    if (isTimeSet === false) {
      clearInterval(intervalId);
    }
  }, [isTimeSet]);

  console.log(seconds);
  return (
    <div>
      {isTimeSet ? (
        <>
          <button onClick={cancelTimerHandler}>cancel</button>
          {microBreak && <p>{microBreakCounter}</p>}
          <Timer hours={hours} minutes={minutes} seconds={seconds} />
        </>
      ) : (
        <div className="timer-wrapper">
          <div className="timer-inner">
            <div className="timer-segment">
              <form onSubmit={submitHandler}>
                <input
                  type="number"
                  id="hours"
                  name="hours"
                  min="0"
                  max="24"
                  step="1"
                  defaultValue="00"
                />
                <input
                  type="number"
                  id="minutes"
                  name="minutes"
                  min="0"
                  max="59"
                  step="1"
                  defaultValue="00"
                />
                <input
                  type="number"
                  id="seconds"
                  name="seconds"
                  min="0"
                  max="59"
                  step="1"
                  defaultValue="00"
                />
                <button type="submit" value="Submit">
                  Start
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputTimer;
