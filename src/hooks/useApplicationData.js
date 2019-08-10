import { useReducer, useEffect } from "react";

import axios from 'axios';

export default function useApplicationData(initial) {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

function reducer(state, action) {
  switch (action.type) {
    case "SET_DAY":
      return {...state, day:action.day}
    case "SET_APPLICATION_DATA":
      return {...state, days: action.days, appointments:action.appointments, interviewers:action.interviewers}
    case "SET_INTERVIEW": {
      return {...state, appointments:action.appointments, spots:action.spots}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

  const setDay = day => dispatch({type: "SET_DAY", day});
  const setApplicationData = (days, appointments, interviewers) => dispatch({ type: "SET_APPLICATION_DATA", days, appointments, interviewers });


  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3001/api/days`),
      axios.get(`http://localhost:3001/api/appointments`),
      axios.get(`http://localhost:3001/api/interviewers`)
    ]).then((resp) => {
    setApplicationData(resp[0].data, resp[1].data, resp[2].data)
  })
  }, [state]);


  function bookInterview(id, interview) {
    console.log("STATE ====>",state);
    // make a copy of the state of appointments
    const appointments = {...state.appointments};
    // on save, add interview object copy of appointments @ that object id 
    appointments[id] = {...appointments[id], interview}
    // put request to "database" so that data persists
    return axios.put(`http://localhost:3001/api/appointments/${id}`, { interview }).then(
     // set state
     dispatch({type: "SET_INTERVIEW", appointments: appointments})
    ); 
  }

  function deleteInterview(id) {
    console.log("STATE ====>",state);
    // make a copy of the state of appointments
    const temp= {...state.appointments}; 
    // set interview equal to null
    temp[id].interview = null;
    // put request to "database" so that data persists
    return axios.delete(`http://localhost:3001/api/appointments/${id}`).then(() =>
     // set state
     dispatch({type: "SET_INTERVIEW", appointments: temp})
    ); 
  }

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }

}
  



// export default function useVisualMode(initial) {
    
//   const [mode, setMode] = useState(initial)
//   const [history, setHistory] = useState([initial])

//   const transition =  function(mode, replace = false) {

//     if (!replace) {
//       setHistory(prev => ([...prev, mode]));
//     }
//       console.log(history)
//       return setMode(mode); 
//     }





// export default function Application(props) {
//   const {
//     state,
//     setDay,
//     bookInterview,
//     cancelInterview
//   } = useApplicationData();

//   const interviewers = getInterviewersForDay(state, state.day);

//   const appointments = getAppointmentsForDay(state, state.day).map(
//     appointment => {
//       return (
//         <Appointment
//           key={appointment.id}
//           {...appointment}
//           interview={getInterview(state, appointment.interview)}
//           interviewers={interviewers}
//           bookInterview={bookInterview}
//           cancelInterview={cancelInterview}
//         />
//       );
//     }
//   );

//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList days={state.days} day={state.day} setDay={setDay} />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//       </section>
//       <section className="schedule">
//         <section className="schedule">
//           {appointments}
//           <Appointment key="last" time="5pm" />
//         </section>
//       </section>
//     </main>
//   );
// }