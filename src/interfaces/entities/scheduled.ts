import { Appointment } from '../home';
import { Patient } from './patient';
import { Round } from './round';

export interface Scheduled {
  _id: string;
  patient: Patient;
  appointmentsHistory: Appointment[] | string[];
  lastAppointment: Appointment;
  round: Round;
  startDate: Date;
  endDate: Date | undefined;
  timeStart: string;
  timeEnd: string;
  weekDays: {
    day: number;
    schedules: {
      startTime: { hour: number; minute: number };
      endTime: { hour: number; minute: number };
    };
  }[];
  category: string;
}
