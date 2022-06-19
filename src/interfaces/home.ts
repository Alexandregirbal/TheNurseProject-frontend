import { Patient } from './entities/patient';

export interface AudioSource {
  src: string;
  type: string;
}
export interface Report {
  audios: AudioSource[];
  notes: string;
}
export interface Appointment {
  _id: string;
  patient: Patient;
  date: Date;
  lastReport: Report;
}
