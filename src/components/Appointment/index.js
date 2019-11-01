import React from "react";

import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/show"
import Empty from "components/Appointment/Empty"
import useVisualMode from "hooks/useVisualMode"
import Form from "components/Appointment/Form"
import Saving from "components/Appointment/statusSaving"
import Deleting from "components/Appointment/delete"
import Confirm from "components/Appointment/confirm"


export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY 
  ) 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
    console.log("props", props);
  }

  function remove(name, interviewer) {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(() => transition(CONFIRM))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form name={props.name} interviewers={props.interviewers} onSave={save} onCancel= {() => transition(EMPTY)} />} 
      {mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete = { remove }
        onEdit={() => transition(EDIT)}
        />
        )}
      {mode === EDIT && <Form 
        name={props.interview.student} 
        interviewer={props.interview.interviewer} 
        interviewers={props.interviewer.name} 
        onSave={save} onCancel={() => back()} />}
      {mode === SAVING && <Saving message = "saving" /> }
      {mode === DELETING && <Deleting message = "deleting" />}
      {mode === CONFIRM && <Confirm 
        message="Are you sure you would like to delete?"
        onConfirm={() => transition(EMPTY)} 
        onCancel={() => back()}  
        />}    
    </article>
    
  )
}

