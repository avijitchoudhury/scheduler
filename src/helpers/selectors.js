import React from 'react';
import { userInfo } from 'os';

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