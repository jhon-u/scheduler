export function getAppointmentsForDay(state, day) {
  const result = [];
  for (const dayObj of state.days) {
    if (dayObj.name === day) {
      const appointments = dayObj.appointments;
      for (const appointment of appointments) {
        result.push(state.appointments[appointment]);
      }
    }
  }
  return result;
}

export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  const result = [];
  for (const dayObj of state.days) {
    if (dayObj.name === day) {
      const interviewers = dayObj.interviewers;
      for (const interviewer of interviewers) {
        result.push(state.interviewers[interviewer]);
      }
    }
  }
  return result;
}
