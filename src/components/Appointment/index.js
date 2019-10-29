import React, { Fragment } from "react";

import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/show"
import Empty from "components/Appointment/Empty"

export default function Appointment (props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      <div>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />}
      </div>
    </article>
    
  )
}

