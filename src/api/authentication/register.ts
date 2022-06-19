import { AxiosError, AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';
import { LoginBody, LoginResponse } from './login';
interface RegisterBody extends LoginBody {
  firstName: string;
  lastName: string;
}
type RegisterResponse = LoginResponse;

export default async (body: RegisterBody): Promise<RegisterResponse | null> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await api.post(
      'auth/register',
      body
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.isAxiosError) {
      return axiosError.response?.data as unknown as RegisterResponse;
    }
    return null;
  }
};
