import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {
  
  const dayListItems = props.days.map((day) => 
    <DayListItem selected={day.name === props.day} setDay={props.setDay} key={day.id} name={day.name} spots={day.spots} />
  )
  
  return ( 
    <ul>{dayListItems}</ul>
    );
}