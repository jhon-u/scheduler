import { useState, useEffect } from "react";
import axios from "axios";

// State management
export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      const newState = { ...state, appointments };
      const days = updateSpots(newState, appointments);
      setState({ ...newState, days });
    });
  };

  // Cancels an appointment and makes an axios delete request
  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      const newState = { ...state, appointments };
      const days = updateSpots(newState, appointments);
      setState({ ...newState, days });
    });
  };

  // Updates the spots available after booking or cancelling an appointment
  const updateSpots = (state, appointments) => {
    const dayObj = state.days.find((day) => day.name === state.day);
    let spots = 0;

    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    const day = { ...dayObj, spots };

    return state.days.map((d) => (d.name === state.day ? day : d));
  };

  // Calls the database and gets all the data for the initial state
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
