import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const {time, interview, bookInterview, cancelInterview} = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING"
  const EDIT = "EDIT";
  const ERROR_SAVING = "ERROR_SAVING";
  const ERROR_DELETING = "ERROR_DELETING";
  
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
    result.then(() => {transition(SHOW)});
    result.catch(error => {transition(ERROR_SAVING, true)})
  }
  
  const cancel = () => {
    transition(DELETING, true);
    const result = cancelInterview(props.id);
    result.then(() => {transition(EMPTY)})
    result.catch(error => {transition(ERROR_DELETING, true)})
  };
  

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === SHOW && <Show 
        interview={interview} 
        student={props.interview.student} 
        interviewer={props.interview.interviewer} 
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
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
      {mode === EDIT && <Form
        interviewer={props.interview.interviewer.id} //this line here
        student={props.interview.student}
        interviewers={props.interviewers} 
        onCancel={() => back()}
        onSave={save}
      />}
      {mode === ERROR_SAVING && <Error
      onClose={() => transition(EMPTY)}
      message="Failed to book interview"
      />}
      {mode === ERROR_DELETING && <Error
      onClose={() => transition(SHOW)}
      message="Failed to cancel interview"
      />}
    </article>  
  )
};