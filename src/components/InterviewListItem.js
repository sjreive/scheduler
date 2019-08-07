import React from "react";
import classnames from "classnames";

import "components/InterviewListItem.scss";
import { render } from "@testing-library/react";


export default function InterviewListItem(props) {
  const interviewerItemClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  const interviewerItemImgClass = classnames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected && props.image
  });

return (
<li className={interviewerItemClass} onClick={props.setInterviewer}>
  <img
    className={interviewerItemImgClass}
    src={props.avatar}
    alt={props.name}
  />
  {props.selected ? props.name : "" }
  
</li>
)};