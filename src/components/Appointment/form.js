import React, { useState }  from "react"; 
import Button from "components/Button";
import InterviewerList from "components/InterviewList"


export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  // function to clear name & interviewer DO I EVEN NEED THIS ??? *******
  // function reset () {
  //   setName("")
  //   setInterviewer(null)
  // }

  
  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
    <form autoComplete="off"
    onSubmit={event => event.preventDefault()} >
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        value={name}
        placeholder="Enter Student Name"
        onChange = {(event) => setName(event.target.value)}
      />
    </form>
    <InterviewerList interviewers={props.interviewers} value = {interviewer} onChange={setInterviewer}/>
    </section>
    <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={props.onCancel} danger>Cancel</Button>
      <Button onClick={() => props.onSave(name,interviewer)} confirm>Save</Button>
    </section>
    </section>
    </main>
  );  
} 