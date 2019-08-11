import React, { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
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
          appointments: action.appointments
        };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  useEffect(() => {
    let newSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    newSocket.addEventListener("open", () => {
      newSocket.send("Here's some text that the server is urgently awaiting!");
      console.log("connected!");
    });

    newSocket.addEventListener("message", event => {
      console.log("message received!", event.data);
      let data = JSON.parse(event.data);
      let id = data.id;
      let type = data.type;
      let interview = data.interview;

      const appointments = { ...state.appointments };

      appointments[id] = { ...appointments[id], interview };

      dispatch({ type: type, appointments: appointments });
    });
    return () => {
      newSocket.close();
    };
  }, [state.appointments]);

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3001/api/days`),
      axios.get(`http://localhost:3001/api/appointments`),
      axios.get(`http://localhost:3001/api/interviewers`)
    ]).then(resp => {
      setApplicationData(resp[0].data, resp[1].data, resp[2].data);
    });
  }, []);

  function bookInterview(id, interview) {
    // make a copy of the state of appointments
    const appointments = { ...state.appointments };
    // on save, add interview object copy of appointments @ that object id
    appointments[id] = { ...appointments[id], interview };
    // put request to "database" so that data persists
    return axios
      .put(`http://localhost:3001/api/appointments/${id}`, { interview })
      .then(
        // set state
        dispatch({ type: "SET_INTERVIEW", appointments: appointments })
      );
  }

  function deleteInterview(id) {
    // make a copy of the state of appointments
    const appointments = { ...state.appointments };
    // set interview equal to null
    appointments[id].interview = null;
    // put request to "database" so that data persists
    return axios
      .delete(`http://localhost:3001/api/appointments/${id}`)
      .then(() =>
        // set state
        dispatch({ type: "SET_INTERVIEW", appointments: appointments })
      );
  }

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  };
}
