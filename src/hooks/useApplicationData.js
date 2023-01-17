import { useState, useEffect } from "react";
import axios from "axios";

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
      const days = updateSpots({ id, interview });
      setState({ ...state, appointments, days });
    });
  };

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
      const days = updateSpots({ id, interview: null });
      setState({ ...state, appointments, days });
    });
  };

  const updateSpots = ({ id, interview }) => {
    const days = state.days.map((day) => {
      let spots = 0;
      if (day.name === state.day) {
        if (interview && state.appointments[id].interview) {
          spots = 0;
        } else if (interview) {
          spots = -1;
        } else spots = 1;
      }
      return {
        ...day,
        spots: day.spots + spots,
      };
    });

    return days;
  };

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
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
