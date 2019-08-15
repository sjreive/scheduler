import React, { useReducer, useEffect } from "react";
import axios from "axios";

import { declareTypeAlias } from "@babel/types";
import { deflateSync } from "zlib";

// Define base URL for react app
// if (process.env.REACT_APP_API_BASE_URL) {
//   axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
// }

export default function useApplicationData(initial) {
  // reducer function
  function reducer(state, action) {
    switch (action.type) {
      case "SET_DAY":
        return { ...state, day: action.day };
      case "SET_APPLICATION_DATA":
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        };
      case "SET_INTERVIEW": {
        return {
          ...state,
          appointments: action.appointments,
          days: action.days
        };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  // helper function to get ID of Day from appointment ID received from server
  const getDayIdbyApts = function(aptid, days) {
    for (let day in days) {
      if (days[day].appointments.includes(aptid)) {
        return day;
      }
    }
  };

  // useReducer takes reducer function and intial state
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: "SET_DAY", day });
  const setApplicationData = (days, appointments, interviewers) => {
    dispatch({
      type: "SET_APPLICATION_DATA",
      days,
      appointments,
      interviewers
    });
  };

  useEffect(() => {
    // What do I put here?
    let newSocket = new WebSocket("ws://interviewscheduler.herokuapp.com");
    newSocket.addEventListener("open", () => {
      console.log("connected!");
    });

    // Handles the incoming data fom the server
    newSocket.addEventListener("message", event => {
      console.log("message received!");
      let data = JSON.parse(event.data);
      let { id, type, interview } = data;

      // makes copy of state
      const appointments = { ...state.appointments };
      const days = [...state.days];

      // gets day ID from appointment data recieved by server
      const day = getDayIdbyApts(id, days);

      // updates appointment (adds or deletes interview)
      appointments[id] = { ...appointments[id], interview };

      // Update # of spots depending on whether interview is added or deleted
      if (appointments[id].interview) {
        days[day].spots--;
      } else if (appointments[id].interview === null) {
        days[day].spots++;
      }

      dispatch({ type: type, appointments: appointments, days: days });
    });
    return () => {
      newSocket.close();
    };
  }, [state.appointments, state.days]);

  useEffect(() => {
    Promise.all([
      axios.get(`https://interviewscheduler.herokuapp.com/api/days`),
      axios.get(`https://interviewscheduler.herokuapp.com/api/appointments`),
      axios.get(`https://interviewscheduler.herokuapp.com/api/interviewers`)
    ]).then(resp => {
      setApplicationData(resp[0].data, resp[1].data, resp[2].data);
    });
  }, []);

  function bookInterview(id, interview) {
    // make a copy of the state of appointments
    const appointments = { ...state.appointments };
    const days = [...state.days];

    // on save, add interview object copy of appointments @ that object id
    appointments[id] = { ...appointments[id], interview };

    // put request to "database" so that data persists
    return axios
      .put(`https://interviewscheduler.herokuapp.com/api/appointments/${id}`, {
        interview
      })
      .then(
        // set state
        dispatch({
          type: "SET_INTERVIEW",
          appointments: appointments,
          days: days
        })
      );
  }

  function deleteInterview(id) {
    // make a copy of the state of appointments
    const appointments = { ...state.appointments };
    const days = [...state.days];
    // set interview equal to null
    appointments[id].interview = null;
    // put request to "database" so that data persists
    return axios
      .delete(`https://interviewscheduler.herokuapp.com/api/appointments/${id}`)
      .then(() =>
        // set state
        dispatch({
          type: "SET_INTERVIEW",
          appointments: appointments,
          days: days
        })
      );
  }

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  };
}
