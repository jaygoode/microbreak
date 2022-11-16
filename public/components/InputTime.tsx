import { useEffect, useState, useRef } from "react";
import Timer from "./Timer";

const InputTimer = () => {
  const [timerFinished, setTimerFinished] = useState(true);
  const [isTimeSet, setIsTimeSet] = useState(false);
  const [prevTime, setPrevTime] = useState(null);
  const [seconds, setSeconds] = useState(1500);
  const interval = useRef<any>(null);
  const [hours, setHours] = useState(20);
  const [minutes, setMinutes] = useState(20);
  const isMicroBreak = useRef(false);
  const tenSecBreak = useRef(0);
  const totalTimeCounter = useRef(0);
  const timeToMicroBreak = useRef(0);

  const submitHandler = (e: any) => {
    e.preventDefault();
    totalTimeCounter.current = 0;
    timeToMicroBreak.current = 1;
    tenSecBreak.current = 0;
    setIsTimeSet(true);
    setSeconds(e.target[2].value);
    setMinutes(e.target[1].value);
    setHours(e.target[0].value);
  };

  const timeUntilMicroBreak = () => {
    let timeRandomizationDeviation = Math.floor(Math.random() * 20);
    timeToMicroBreak.current = 30;
    const plusOrMinus = Math.random() < 0.5;
    if (plusOrMinus) {
      timeToMicroBreak.current += timeRandomizationDeviation;
      // console.log("nextMicroBreak = " + timeToMicroBreak.current);
      return timeToMicroBreak;
    } else {
      timeToMicroBreak.current -= timeRandomizationDeviation;
      // console.log("nextMicroBreak = " + timeToMicroBreak.current);
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
    breakAlert();
  }, [isMicroBreak]);

  if (seconds <= 0 && minutes > 0) {
    setSeconds((prevSeconds) => prevSeconds + 59);
    setMinutes((prevMinutes) => prevMinutes - 1);
  }
  if (minutes <= 0 && hours > 0) {
    setMinutes((prevMinutes) => prevMinutes + 59);
    setHours((prevHours) => prevHours - 1);
  }
  if (totalTimeCounter.current === timeToMicroBreak.current) {
    isMicroBreak.current = true;
    totalTimeCounter.current = 0;
    timeUntilMicroBreak();
  }
  useEffect(() => {
    if (isTimeSet) {
      timeUntilMicroBreak();
      interval.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
        totalTimeCounter.current = totalTimeCounter.current + 1;
        // timeToMicroBreak.current = timeToMicroBreak.current + 1;
        if (isMicroBreak) {
          tenSecBreak.current = tenSecBreak.current + 1;
          // console.log("tensecBreak" + tenSecBreak.current);
          if (tenSecBreak.current >= 10) {
            isMicroBreak.current = false;
            tenSecBreak.current = 0;
          }
        }
        // console.log("totTime " + totalTimeCounter.current);
        // console.log("microbreak at " + timeToMicroBreak.current);
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
                <button className="time-input">sound</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button onClick={cancelTimerHandler} className="time-input">
            cancel
          </button>
          {isMicroBreak && <p>BREAK</p>}
          <Timer hours={hours} minutes={minutes} seconds={seconds} />
        </>
      )}
    </div>
  );
};

export default InputTimer;
