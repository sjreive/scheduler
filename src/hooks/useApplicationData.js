import { useState, useEffect } from "react";

import axios from 'axios';

export default function useVisualMode(initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments}));
  const setInterviewers = interviewers => setState(prev => ({...prev, interviewers}))


  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3001/api/days`),
      axios.get(`http://localhost:3001/api/appointments`),
      axios.get(`http://localhost:3001/api/interviewers`)
    ]).then((resp) => {
    setDays(resp[0].data)
    setAppointments(resp[1].data)
    setInterviewers(resp[2].data)
  })
  }, []);


  function bookInterview(id, interview) {
    console.log("STATE ====>",state);
    // make a copy of the state of appointments
    const appointments = {...state.appointments};
    // on save, add interview object copy of appointments @ that object id 
    appointments[id] = {...appointments[id], interview}
    // put request to "database" so that data persists
    return axios.put(`http://localhost:3001/api/appointments/${id}`, { interview }).then(
     // set state
      setState({...state, appointments: appointments})
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
      setState(prev => ({...prev, appointments: temp}))
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