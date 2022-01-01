import {useState, useEffect} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (event) => {
    //push new mode to history.
    history.push(mode);
    // console.log(`History: ${JSON.stringify(history)}`);
    //set mode to first transition
    setMode(event);
    
  };
  
  const back = () => {  
    //set mode to last item in the history array and remove it from the array
    setMode(history.pop());
    // console.log(`History: ${JSON.stringify(history)}`);
  }
  
  return {mode, transition, back};
}
