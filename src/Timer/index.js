import { useRef, useState } from "react";

export function useTimer() {
  // a  browser timer job ID we need to cancel this job when our timer is being destroyed
  const timer_Id = useRef(null);

  // the time when timer started
  const [startTimeStamp, setStartTime] = useState(null);

  // the time on the next update cycle
  const [currentTimeStamp, setCurrentTimeStamp] = useState(null);

  function start() {
    setStartTime(Date.now());
    setCurrentTimeStamp(Date.now());

    // start the timed job in browser
    timer_Id.current = setInterval(() => {
      setCurrentTimeStamp(Date.now());
    }, 1000);

    console.log("TIMER: START ?", timer_Id);
  }

  function stopAndClear() {
    // stop the timed job we started earlier
    clearInterval(timer_Id.current);
    setStartTime(Date.now());
    setCurrentTimeStamp(Date.now());
    timer_Id.current = null;
    console.log("TIMER: END ?", timer_Id);
  }

  const secondsPassed = (currentTimeStamp - startTimeStamp) / 1000;

  return {
    start,
    stopAndClear,
    timer_Id,
    secondsPassed,
  };
}
