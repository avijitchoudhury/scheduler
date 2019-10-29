import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";


export default function InterviewerListItem (props) {
  const interviewerClass = classnames('interviewers__item', {
  "interviewers__item--selected": (props.selected === true),
  })

  
  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className={props.setInterviewer} 
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  )
}