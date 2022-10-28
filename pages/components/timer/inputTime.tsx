import React from "react";
import { timerProps } from "./timerInterface";
import { useEffect, useState } from "react";
import Timer from "./timer";

const InputTimer = () => {
  const [timerFinished, setTimerFinished] = useState(true);
  const [isTimeSet, setIsTimeSet] = useState(false);
  const [isMicroBreak, setIsMicroBreak] = useState(false);
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");

  const submitHandler = (e: any) => {
    setIsTimeSet(true);
    e.preventDefault();
    setHours(e.target[0].value);
    setMinutes(e.target[1].value);
    setSeconds(e.target[2].value);
  };

  let microBreakCounter = 0;
  useEffect(() => {
    const studySessionInterval = setInterval(() => {
      const coinFlip = () => {
        const plusOrMinus = Math.random() < 0.5;
        if (plusOrMinus) {
          return "+";
        } else {
          return "-";
        }
      };
      console.log(coinFlip());

      if (isMicroBreak) {
        microBreakCounter += 1;
      }

      if (microBreakCounter >= 10) {
        microBreakCounter = 0;
        setIsMicroBreak(false);
      }

      let h = parseInt(hours);
      let m = parseInt(minutes);
      let s = parseInt(seconds);

      //   if (h > 0) {
      //     setHours(String(h));
      //   }

      if (m > 0) {
        setMinutes(String(m));
      } else if (m < 1 && h > 0) {
        m = 59;
        h -= 1;
        setHours(String(h));
        setMinutes(String(m));
      }

      if (s > 0) {
        s -= 1;

        setSeconds(String(s));
      } else if (s <= 0 && m > 0) {
        s = 59;
        m -= 1;
        setMinutes(String(m));
        setSeconds(String(s));
      }

      if (h <= 0 && m <= 0 && s <= 0) {
        setTimerFinished(true);
      }
    }, 1000);

    const microBreakInterval = setInterval(() => {}, 1000);

    return () => {
      clearInterval(studySessionInterval);
      clearInterval(microBreakInterval);
    };
  }, [submitHandler]);

  return (
    <div>
      {isTimeSet ? (
        <Timer hours={hours} minutes={minutes} seconds={seconds} />
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
