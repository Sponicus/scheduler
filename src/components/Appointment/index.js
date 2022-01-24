import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status"
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const {time, interview, bookInterview, cancelInterview} = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING"
  
   

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY 
  );
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    const result = bookInterview(props.id, interview);
    console.log(result);
    result.then(() => {transition(SHOW)});
  }
  
  const cancel = () => {
    transition(DELETING);
    cancelInterview(props.id)
    .then(() => {transition(EMPTY)})
  };
 
  
  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === SHOW && <Show 
        interview={interview} 
        student={props.interview.student} 
        interviewer={props.interview.interviewer} 
        onDelete={() => transition(CONFIRM)}
      />}
      {mode === EMPTY && <Empty
        onAdd={() => transition(CREATE)}
      />}
      {mode === CREATE && <Form 
        interviewers={props.interviewers} 
        onCancel={() => back()}
        onSave={save}
      />}
      {mode === CONFIRM && <Confirm 
        message={'Are you sure you want to delete this appointment?'}
        onCancel={() => back()}
        onConfirm={cancel}
        />}
      {mode === SAVING && <Status
        message='SAVING...'
        />}
      {mode === DELETING && <Status
        message='DELETING...'
        />}
    </article>  
  )
};