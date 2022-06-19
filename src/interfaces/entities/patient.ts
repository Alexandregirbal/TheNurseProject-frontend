export interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  dateOfBirth: Date;
  sex: PatientObject.Sex;
  contactsEmergency: PatientObject.ContactEmergency[];
}

export namespace PatientObject {
  export enum Sex {
    MAN = 'MAN',
    WOMAN = 'WOMAN',
  }

  export class ContactEmergency {
    name: string;
    phone: string;
  }
}
