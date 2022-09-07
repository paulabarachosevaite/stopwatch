import "./styles.css";
import { useReducer, useEffect, useRef } from "react";

const initialState = {
  isRunning: false,
  time: 0,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const ref = useRef(0);

  useEffect(() => {
    if (!state.isRunning) {
      return;
    }
    ref.current = setInterval(() => dispatch({ type: "INCREASE" }), 1000);
    return () => {
      clearInterval(ref.current);
      ref.current = 0;
    };
  }, [state.isRunning]);

  return (
    <div className="stopwatch">
      <div className="timer-screen">{state.time}</div>
      <div>
        <button
          onClick={() => dispatch({ type: "START" })}
          className="btn-start"
        ></button>
        <button
          onClick={() => dispatch({ type: "STOP" })}
          className="btn-stop"
        ></button>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="btn-reset"
        ></button>
      </div>
    </div>
  );
}

function reducer(state, ACTIONS) {
  switch (ACTIONS.type) {
    case "START":
      return { ...state, isRunning: true };
    case "STOP":
      return { ...state, isRunning: false };
    case "RESET":
      return { isRunning: false, time: 0 };
    case "INCREASE":
      return { ...state, time: state.time + 1 };
    default:
      throw new Error();
  }
}

export default App;
