import { AxiosError, AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';
export interface LoginBody {
  email: string;
  password: string;
}
export interface LoginResponse {
  accessToken?: string;
  error?: string;
  message?: string;
  statusCode?: number;
}

export default async (body: LoginBody): Promise<LoginResponse | null> => {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post(
      'auth/login',
      body
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.isAxiosError) {
      return axiosError.response?.data as unknown as LoginResponse;
    }
    return null;
  }
};
