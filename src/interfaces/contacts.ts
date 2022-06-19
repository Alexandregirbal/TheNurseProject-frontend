import { Patient } from './entities/patient';
import { User } from './entities/user';

export type Contact = Patient | User;

export enum ContactType {
  PATIENT = 'PATIENT',
  COLLEGUE = 'COLLEGUE',
}
