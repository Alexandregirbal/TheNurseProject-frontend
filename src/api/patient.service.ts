import { api } from 'src/boot/axios';
import { Company } from 'src/interfaces/entities/company';
import { Patient } from 'src/interfaces/entities/patient';

export class PatientService {
  static findManyByCompany(company: Partial<Company>): Promise<Patient[]> {
    return api
      .get(`companies/${company._id}/patients`)
      .then((response) => response.data as Patient[])
      .catch(() => []);
  }

  static createOne(
    company: Partial<Company>,
    patient: Patient
  ): Promise<Patient> {
    return api
      .post(`companies/${company._id}/patients`, patient)
      .then((response) => response.data as Patient[])
      .catch(() => null);
  }

  static updateOne(
    patient: Patient,
    updates: Partial<Patient>
  ): Promise<Patient> {
    return api
      .patch(`patients/${patient._id}`, updates)
      .then((response) => response.data as Patient[])
      .catch(() => null);
  }

  static deleteOne(patient: Patient): Promise<Patient> {
    return api
      .delete(`patients/${patient._id}`)
      .then((response) => response.data as Patient[])
      .catch(() => null);
  }

  static findManyOwn(): Promise<Partial<Patient>[]> {
    return api
      .get('users/me/patients')
      .then((response) => response.data as Patient[])
      .catch(() => []);
  }
}
