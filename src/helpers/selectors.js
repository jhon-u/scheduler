// Returns the appointments for a specific day
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

// Returns the details for an existing interview
export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  return null;
}

// Returns the interviewers for a specific day
export function getInterviewersForDay(state, day) {
  const dayData = state.days.find((dayObj) => dayObj.name === day);

  if (!dayData) return [];

  const interviewerIds = dayData.interviewers;
  const result = [];

  for (const interviewerId of interviewerIds) {
    const interviewer = state.interviewers[interviewerId];
    result.push(interviewer);
  }

  return result;
}
