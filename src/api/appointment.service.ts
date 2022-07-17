import { api } from 'src/boot/axios';
import { User } from 'src/interfaces/entities/user';
import { Appointment } from 'src/interfaces/home';

export class AppointmentService {
  static createOne(user: Partial<User>, body: any): Promise<Appointment> {
    return api
      .post(`users/${user._id}/appointments`, body)
      .then((response) => response.data)
      .catch(() => null);
  }
}
