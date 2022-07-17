import { api } from 'src/boot/axios';
import { Scheduled } from 'src/interfaces/entities/scheduled';

export class ScheduledService {
  static createOne(body: any): Promise<Scheduled> {
    return api
      .post(`scheduled`, body)
      .then((response) => response.data)
      .catch(() => null);
  }
}
