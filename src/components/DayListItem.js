import React from "react";
import classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  // Conditional for spots remaining message
  let spotsRemaining = "";
  if (props.spots > 1) {
    spotsRemaining = `${props.spots} spots remaining`
  } else if (props.spots === 1){
    spotsRemaining = `${props.spots} spot remaining`
  } else {
    spotsRemaining = `no spots remaining`
  }
  
// {props.spots === 0 ? 'no' : props.spots} spot{props.spots !== 1 && 's'} remaining

return ( 
    <li 
      className={dayClass} 
      onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <p>{spotsRemaining}</p>
    </li>
  );
}
