import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index.js"

import { useState } from "react";

// DATA
const days = [
  { 
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];


const appointments = [
  {
    id: 1,
    time: "12pm", 
    interview: {
      student: "Sarah",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 2,
    time: "2pm",
    interview: {
      student: "Jessie",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Bob",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 'last',
    time: "4pm",
  }
];


export default function Application(props) {
  
  const [day, setDate] = useState("Monday");
  // const [interviewer, setInterviewer] = useState(1);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
          
        <hr className="sidebar__separator sidebar--centered" />
        <DayList
          days={days}
          day={day}
          setDay={setDate}
        />
        <nav className="sidebar__menu" />
      
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {appointments.map((appointment) => 
      <Appointment 
        key={appointment.id}
        time={appointment.time}
        interview={appointment.interview} />)}
      </section>

    </main>
  );
}
