import { useState } from "react";

// Creates a history of the modes to be able to go back to previous one
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace) {
    setMode(mode);
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), mode]);
    } else {
      setHistory((prev) => [...prev, mode]);
    }
  }

  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    }
  }

  return { mode, transition, back };
}
