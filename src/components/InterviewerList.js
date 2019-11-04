import React from "react";
import classnames from "classnames";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import Proptypes from 'prop-types';


export default function InterviewerList (props) {
  InterviewerList.propTypes = {
    value: Proptypes.number,
    onChange: Proptypes.func.isRequired
  };
  const interviewers = props.interviewers.map( interviewer => {
    return (
      <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id) }
      />
    )
  })

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">{props.name}</h4>
    <ul className="interviewers__list">{interviewers}</ul>
  </section>
  )
}