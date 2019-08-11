import { useState } from "react";

export default function useVisualMode(initial) {
    
    const [mode, setMode] = useState(initial)
    const [history, setHistory] = useState([initial])

    const transition =  function(mode, replace = false) {

      if (!replace) {
        setHistory(prev => ([...prev, mode]));
      }
        return setMode(mode); 
      }

    const back = function() {
      if (history.length > 1) {
      history.pop()
      return setMode(history[history.length-1])
      }
    }
     
    return { mode, transition, back};
  }
  