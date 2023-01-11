export function getAppointmentsForDay(state, day) {
  const result = []

  for (const dayObj of state.days) {
    if (dayObj.name === day) {
      const appointments = dayObj.appointments
      for (const appointment of appointments) {
        result.push(state.appointments[appointment])
      }
    }
  }

  return result
}