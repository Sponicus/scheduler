import React from "react";
import "styles/InterviewerListItem.scss";
import classNames from "classnames";

export function InterviewerListItem (props) {
  const {selected} = props;
  const interviewerClass = classNames(
    "interviewers__item",
    {"interviewers__item--selected":selected});
  
  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {selected && props.name}
    </li>
  )
};