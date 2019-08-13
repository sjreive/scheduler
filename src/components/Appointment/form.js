import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewList";

import PropTypes from "prop-types";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // function to clear name & interviewer
  function reset() {
    setName("");
    setInterviewer(null);
  }

  function handleOnCancel() {
    reset();
    props.onCancel();
  }

  // This function validates input into student name field
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
        {console.log("interviewer props:", props.interviewer)}
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={handleOnCancel} danger>
            Cancel
          </Button>
          <Button onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
