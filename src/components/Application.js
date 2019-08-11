import React, { useState, useEffect } from "react";

import useApplicationData from "../hooks/useApplicationData";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index.js";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "../helpers/selectors.js";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <section className="schedule">
          {getAppointmentsForDay(state, state.day).map(appointment => (
            <Appointment
              key={appointment.id}
              interviewer={
                getInterview(state, appointment.interview).interviewer
              }
              {...appointment}
              interviewers={getInterviewersForDay(state, state.day)}
              bookInterview={bookInterview}
              deleteInterview={deleteInterview}
            />
          ))}

          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
}
