import { useEffect, useState, useRef } from "react";
import Timer from "./Timer";

const InputTimer = () => {
  const [timerFinished, setTimerFinished] = useState(true);
  const [isTimeSet, setIsTimeSet] = useState(false);
  const [prevTime, setPrevTime] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const interval = useRef<any>(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const isMicroBreak = useRef(false);
  const tenSecBreak = useRef(0);
  const totalTimeCounter = useRef(0);
  const timeToMicroBreak = useRef(1);

  const submitHandler = (e: any) => {
    e.preventDefault();
    totalTimeCounter.current = 0;
    timeToMicroBreak.current = 1;
    tenSecBreak.current = 10;
    isMicroBreak.current = false;
    setIsTimeSet(true);
    setSeconds(e.target[2].value);
    setMinutes(e.target[1].value);
    setHours(e.target[0].value);
    timeUntilMicroBreak();
  };

  const timeUntilMicroBreak = () => {
    let timeRandomizationDeviation = Math.floor(Math.random() * 15);
    timeToMicroBreak.current = 120;
    const plusOrMinus = Math.random() < 0.5;
    if (plusOrMinus) {
      timeToMicroBreak.current += timeRandomizationDeviation;
      return timeToMicroBreak;
    } else {
      timeToMicroBreak.current -= timeRandomizationDeviation;
      return timeToMicroBreak;
    }
  };

  const breakAlert = () => {
    const audio = new Audio("../resources/bell.mp3");
    if (audio) {
      audio.play();
    }
  };

  useEffect(() => {
    breakAlert();
  }, [isMicroBreak.current]);

  if (seconds <= 0 && minutes > 0) {
    setSeconds((prevSeconds) => prevSeconds + 59);
    setMinutes((prevMinutes) => prevMinutes - 1);
  }
  if (minutes <= 0 && hours > 0) {
    setMinutes((prevMinutes) => prevMinutes + 59);
    setSeconds((prevSeconds) => prevSeconds + 59);
    setHours((prevHours) => prevHours - 1);
  }
  if (totalTimeCounter.current === timeToMicroBreak.current) {
    isMicroBreak.current = true;
    totalTimeCounter.current = 0;
    timeUntilMicroBreak();
  }
  useEffect(() => {
    if (isTimeSet) {
      interval.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
        totalTimeCounter.current = totalTimeCounter.current + 1;
        if (isMicroBreak.current) {
          tenSecBreak.current = tenSecBreak.current - 1;
        }
        if (tenSecBreak.current <= 0) {
          isMicroBreak.current = false;
          tenSecBreak.current = 10;
          console.log(isMicroBreak);
        }
        console.log(isMicroBreak);
      }, 1000);
    }
    return () => clearInterval(interval.current);
  }, [isTimeSet]);

  const cancelTimerHandler = () => {
    setIsTimeSet(false);
  };

  useEffect(() => {
    if (seconds <= 0 && minutes <= 0 && hours <= 0) {
      setTimerFinished(true);
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
                <button type="submit" value="Submit" className="time-input">
                  Start
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
          {isMicroBreak.current && <p>{tenSecBreak.current} of break left.</p>}
          <Timer hours={hours} minutes={minutes} seconds={seconds} />
        </>
      )}
    </div>
  );
};

export default InputTimer;
