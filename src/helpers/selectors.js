export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(aday => aday.name === day);
  const result =[];
    if(filteredAppointments[0]) {
      filteredAppointments[0].appointments.forEach(appointment => {
        if(state.appointments[appointment]) {
          result.push(state.appointments[appointment])
        }
      })
    }
    return result;
  }

  export function getInterview(state, interview) {
    const obj = {};

    if(!interview) {
      return null
    }
    for (let interviewer in state.interviewers) {
      obj.student = interview.student;
      if(interview.interviewer === state.interviewers[interviewer].id) {
        obj.interviewer = {
          id: state.interviewers[interviewer].id,
          name: state.interviewers[interviewer].name,
          avatar: state.interviewers[interviewer].avatar
        }
      }
    }
    return obj;
  }
