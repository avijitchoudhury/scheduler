import React from "react";

import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/show"
import Empty from "components/Appointment/Empty"
import useVisualMode from "hooks/useVisualMode"
import Form from "components/Appointment/Form"
import Saving from "components/Appointment/statusSaving"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";


export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY 
  ) 
  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
    console.log("props", props);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
        {mode === SAVING && <Saving message = "saving" /> }
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === CREATE && <Form name={props.name} interviewers={props.interviewers} onSave={save} onCancel= {() => transition(EMPTY)} />} 
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}

    </article>
    
  )
}

