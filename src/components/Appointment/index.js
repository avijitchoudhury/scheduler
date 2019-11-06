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
import ErrorDeleting from "components/Appointment/error-delete"
import ErrorSaving from "components/Appointment/error-saving"


export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY 
  ) 
  function save(name, interviewer, changeSpots) {
    const interview = {student: name,interviewer
    };
    if(!interview.student || !interview.interviewer){
      transition(ERROR_SAVE, true);
      return
    }
    transition(SAVING, true)

    props.bookInterview(props.id, interview, changeSpots)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  }

  function remove(name, interviewer) {

    transition(DELETING, true)

    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form 
        name={props.name} 
        interviewers={props.interviewers} 
        onSave={save} 
        onCancel= {() => transition(EMPTY)} 
        isCreate={true}
        />} 
        {console.log(props)}
      {mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete = {() => transition(CONFIRM, true) }
        onEdit={() => transition(EDIT)}
        />
        )}
      {mode === EDIT && <Form 
        name={props.interview.student} 
        interviewers={props.interviewers} 
        interviewer={props.interview.interviewer} 
        onSave={save} 
        onCancel={() => back()} 
        />}
      {mode === SAVING && <Saving message = "saving" /> }
      {mode === DELETING && <Deleting message = "deleting" />}
      {mode === CONFIRM && <Confirm 
        message="Are you sure you would like to delete?"
        onConfirm={ remove }
        onCancel={() => back()}  
        />}    
      {mode === ERROR_SAVE && <ErrorSaving 
        message = "Error saving"
        onClose={() => back()} 
        /> }
      {mode === ERROR_DELETE && <ErrorDeleting
        message = "Error deleting"
        onClose={() => back()} /> }
    </article>
    
  )
}

