import { Appointment, Report } from 'src/interfaces/home';

export interface ReportDraft {
  appointmentId: string;
  content: Report;
}
export interface HomeStateInterface {
  appointments: Appointment[];
  reportDrafts: ReportDraft[];
}
