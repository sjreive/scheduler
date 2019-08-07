import React from "react"
import "components/Appointment/styles.scss";
import Header from "./header.js";
import Show from "./show.js";
import Empty from "./empty.js"

export default function Appointment(props) {
 

return (
  <article class="appointment">
  <Header time={props.time}/>
  {props.interview ? <Show 
    student= {props.interview.student}
    interviewer= {props.interview.interviewer}
    onEdit={props.onEdit}
  onDelete={props.onDelete}/> : <Empty onAdd={props.onAdd}/>  
  }
  
  
  
  </article>
 

);

} 