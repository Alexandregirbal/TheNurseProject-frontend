import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';
import LocalStorageKeys from 'src/localStorage/keys';

const selectAPIURL = (nodeEnv: string) => {
  console.log('setting up API URL with env:' + nodeEnv);
  switch (nodeEnv) {
    case 'development':
      return `http://localhost:${process.env.PORT_BACKEND || 5000}`;

    case 'production':
      return 'https://nurse-backend.herokuapp.com/';

    default:
      throw new Error(`NODE_ENV value is wrong: ${nodeEnv}`);
  }
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const api = axios.create({
  baseURL: selectAPIURL(process.env.NODE_ENV),
});
const token = window.localStorage.getItem(LocalStorageKeys.token);
if (token) {
  api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       console.log('A 401 appeared');
//       return Promise.reject(error);
//       // window.location.href = '/';
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
