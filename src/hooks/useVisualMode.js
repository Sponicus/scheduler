import {useState, useEffect} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (event, replace = false) => {
    //push new mode to history or replace mode.
    if (replace) {
      //do not push current mode into history
    } else {
      history.push(mode)
    };
    // console.log(`History: ${JSON.stringify(history)}`);
    //set mode to first transition
    setMode(event);
    
  };
  
  const back = () => {  
    //set mode to last item in the history array and remove it from the array
    if (history.length > 1){
      setMode(history.pop());
    } else {
      setMode(history[0]);
    }
    // console.log(`History: ${JSON.stringify(history)}`);
  }
  
  return {mode, transition, back};
}