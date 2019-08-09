
const getAppointmentsForDay = function(state, day) {
  let aptArray = [];
  for (let date of state.days) {
    if (date.name === day) {
      aptArray.push(...date.appointments)
    }
  }

  let appointmentArray = [];

  for (let aptObj in state.appointments) {
    for (let aptId of aptArray) {
      if (aptId === parseInt(aptObj)){
        appointmentArray.push(state.appointments[aptObj]);

      }
    }
  }   
  return appointmentArray;
}

const getInterview = function(state, interviewerId) {

  let intObj = {};
  
  for (let int in state.interviewers) {
    if(interviewerId){
      if (state.interviewers[int].id == interviewerId.interviewer) {
        intObj.interviewer= state.interviewers[int];
        intObj.student = interviewerId.student;
        return intObj;
      }
    } 
  }
  return intObj;
}

const getInterviewersForDay = function(state, day) {
  let intArray = [];
  for (let date of state.days) {
    if (date.name === day) {
      intArray.push(...date.interviewers)
    }
  }

  let interviewersArray = [];

  for (let intObj in state.interviewers) {
    for (let intId of intArray) {
      if (intId === parseInt(intObj)){
        interviewersArray.push(state.interviewers[intObj]);

      }
    }
  }   
  return interviewersArray;
}


export  {getAppointmentsForDay, getInterview, getInterviewersForDay}