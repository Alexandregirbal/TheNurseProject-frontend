import { api } from 'src/boot/axios';
import { Company } from 'src/interfaces/entities/company';
import { User } from 'src/interfaces/entities/user';

export class UserService {
  static async findManyByCompany(
    company: Partial<Company>
  ): Promise<Partial<User>[]> {
    return api
      .get(`companies/${company._id}/users`)
      .then((response) => response.data as User[])
      .catch(() => []);
  }

  static async findManyCollegues(): Promise<Partial<User>[]> {
    return api
      .get('users/me/collegues')
      .then((response) => response.data as User[])
      .catch(() => []);
  }

  static findMe(): Promise<Partial<User>> {
    return api
      .get('users/me')
      .then((response) => response.data as User)
      .catch();
  }
}
