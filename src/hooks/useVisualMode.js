import {useState, useEffect} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);
  // const history = [];
  // console.log(`History: ${JSON.stringify(history)} ${history.length}`);
  // history needs to be an array.
    // Our Initial state is in []. 
      // how to use setHistory?
  const transition = (event) => {
    //push new mode to history.
    history.push(mode)
    console.log(`History: ${JSON.stringify(history)}`);
    //set mode to first transition
    setMode(event)
    
  };
  
  const back = () => {
    //pop first item in array
    
    //set mode to first item in the history array
    setMode(history.pop())
  }
  
  return {mode, transition, back};
}
