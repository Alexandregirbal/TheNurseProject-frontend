import { api } from 'src/boot/axios';
import { Round } from 'src/interfaces/entities/round';
import { User } from 'src/interfaces/entities/user';
import { Appointment } from 'src/interfaces/home';

export class AppointmentService {
  static createOne(user: Partial<User>, body: any): Promise<Round> {
    return api
      .post(`users/${user._id}/appointments`, body)
      .then((response) => response.data as Appointment)
      .catch(() => null);
  }
}
