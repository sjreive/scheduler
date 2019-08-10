import React from "react"
import "components/Appointment/styles.scss";
import Header from "./header.js";
import Show from "./show.js";
import Empty from "./empty.js";
import Form from "./form.js";
import Status from "./status.js";
import useVisualMode from "hooks/useVisualMode.js";
import Confirm  from "./confirm.js";
import Error from "./error.js";

const EMPTY = "EMPTY"
const SHOW = "SHOW"
const CREATE = "CREATE"
const SAVE = "SAVE"
const CONFIRM = "CONFIRM"
const DELETE = "DELETE"
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {
  console.log("props", props)


  function save(name, interviewer) {
    //show SAVE mode
    transition(SAVE)  
    // calls a function that books interview & sends data to API
    props.bookInterview(
      props.id, {
        student: name,
        interviewer 
      }
    )
   // once data has been returned, show appointment
    .then(() => {
      transition(SHOW)
    })
    .catch(error => transition(ERROR_SAVE, true));
  };

  function deleteInt(id) {
    //show CONFIRM mode 
    transition(DELETE)
     // calls a function that deletes interview locally and from API
    props.deleteInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
      .catch(error => transition(ERROR_DELETE, true));
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
      onEdit={() => transition(EDIT) }
      onDelete={() => {transition(CONFIRM)
      } }/> 
      ) 
    }
    {mode === SAVE && <Status message="SAVING" /> }
    {mode === CONFIRM && <Confirm message="Are you sure you want to delete this appointment?" onConfirm={(()=>{deleteInt(props.id)})} onCancel={()=>back()} />}
    {mode === DELETE && <Status message="DELETING" />}
    
    {mode === EDIT && <Form 
      interviewer={props.interview.interviewer}
      name={props.interview.student}
      interviewers={props.interviewers}
       onSave={(name, interviewer) => {
          save(name, interviewer)
          }}
       onCancel={() =>(back())} />}

    {mode === ERROR_SAVE && <Error  
      message="Could not create appointment."
      onClose={() => transition(EDIT)}
      />
    }

    {mode === ERROR_DELETE && <Error
      message="Could not delete appointment."
      onClose={() => transition(SHOW)}
      />
    } 

  
  </article>
  );
}

