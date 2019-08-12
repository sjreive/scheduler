import React from "react";

import "./InterviewList.scss";
import InterviewListItem from "./InterviewListItem";

export default function InterviewList(props) {
  const interviewListItems = props.interviewers.map(listItem => (
    <InterviewListItem
      selected={listItem.id === props.value}
      setInterviewer={() => props.onChange(listItem.id)}
      key={listItem.id}
      name={listItem.name}
      avatar={listItem.avatar}
      alt={listItem.alt}
    />
  ));

  return (
    <section class="interviewers">
      <h4 class="interviewers__header text--light">Interviewer</h4>
      <ul class="interviewers__list">{interviewListItems}</ul>
    </section>
  );
}
