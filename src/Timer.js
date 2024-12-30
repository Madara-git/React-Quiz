import { useEffect } from "react";

function Timer({ timerDown, dispatch, timer }) {
  function showTime() {
    const min = String(Math.floor(timerDown / 60)).padStart(2, "0");
    const sec = String(Math.floor(timerDown % 60)).padStart(2, "0");

    return `${min}:${sec}`;
  }
  useEffect(() => {
    let time = setInterval(() => {
      dispatch({ type: "timer" });
      showTime();
    }, 1000);
    return () => clearInterval(time);
  }, [dispatch, showTime]);

  return (
    <>
      <button className="timer">{showTime()}</button>
    </>
  );
}

export default Timer;
