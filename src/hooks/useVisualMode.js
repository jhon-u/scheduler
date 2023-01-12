import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if(replace) {
      back()
    }
    setMode(mode);
    setHistory([...history, mode])
  }

  function back() {
    history.pop()
    if (history.length > 0) {
      setMode(history[history.length - 1])
    }
  }

  return { mode, transition, back };
}
