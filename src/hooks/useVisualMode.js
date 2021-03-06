import React, { useState } from "react";


export default function useVisualMode (initial) {
  const[mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) {
    if(replace) {
     setMode(newMode);
     setHistory(prev => [...prev, history[0]])
    } else {
      setMode(newMode);
      setHistory(prev => [...prev, mode]);
    }
  }

  function back() {
    if(history.length > 1) {
    setMode(history.pop());
    } else {
      setMode(history[0]);
    }
  }

  return { mode, transition, back };

}
