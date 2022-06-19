import { Company } from './company';

export interface Round {
  _id: string;
  name: string;
  company: Company | string;
}
