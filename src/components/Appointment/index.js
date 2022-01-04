import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const {time, interview} = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY // prior to noticing a single line in the instructions, COMPASS doesn't have the SHOW or EMPTY components as react components... but this is also the only way I can get it to not throw errors.
  );
  
  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === SHOW && <Show 
        interview={interview} 
        student={props.interview.student} 
        interviewer={props.interview.interviewer} 
      />}
      {mode === EMPTY && <Empty
        onAdd={() => transition(CREATE)}
      />}
      {mode === CREATE && <Form 
        interviewers={props.interviewers} 
        onCancel={() => back()}
      />}
    </article>  
  )
};