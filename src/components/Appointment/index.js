import React from "react"
import "components/Appointment/styles.scss";
import Header from "./header.js";
import Show from "./show.js";
import Empty from "./empty.js";
import Form from "./form.js";
import useVisualMode from "hooks/useVisualMode.js"

const EMPTY = "EMPTY"
const SHOW = "SHOW"
const CREATE = "CREATE"
const SAVE = "SAVE"

export default function Appointment(props) {
  console.log("props", props)


  function save(name, interviewer) {
    // calls a function that books
    props.bookInterview(
      props.id, {
        student: name,
        interviewer 
      })
    transition(SHOW);
  }

  // appointment mode is intially set to empty or show, dependent upon whether an interview is booked.
  let {mode, transition, back} = useVisualMode(props.interview? SHOW : EMPTY)


  return (
  
  <article class="appointment">
  <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd ={() => (transition(CREATE)) }/>} 
    {mode === CREATE && <Form 
      interviewer={props.interviewer}
       
      interviewers={props.interviewers}
       
       onSave={(name, interviewer) => {
          
          save(name, interviewer)
          }}
       
       onCancel={() =>(back())} />}

    {mode === SHOW && ( <Show 
      student= {props.interview ? props.interview.student : "" }
      interviewer= {props.interviewer}
      onEdit={props.onEdit}
      onDelete={props.onDelete}/> 
      ) 
    }
  </article>
  );
} 

