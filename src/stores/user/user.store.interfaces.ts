import { User } from 'src/interfaces/entities/user';

export interface UserStateInterface {
  token?: string;
  me?: Partial<User>;
  collegues?: Partial<User>[];
}
