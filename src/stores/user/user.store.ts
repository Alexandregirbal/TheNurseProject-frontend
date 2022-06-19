import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { User } from 'src/interfaces/entities/user';
import LocalStorageKeys from 'src/localStorage/keys';
import StoresIds from '../ids';
import { UserStateInterface } from './user.store.interfaces';
import state from './user.store.state';

export const useUserStore = defineStore({
  id: StoresIds.user,
  state: (): UserStateInterface => {
    return state;
  },
  getters: {
    getUserToken: (state: UserStateInterface) => {
      const localStorageToken = localStorage.getItem(LocalStorageKeys.token);
      const token = state.token ?? localStorageToken ?? null;
      return token;
    },
    getMe: (state: UserStateInterface) => {
      return state.me;
    },
    getCollegues: (state: UserStateInterface) => {
      return state.collegues;
    },
  },
  actions: {
    setUserToken(token: string) {
      localStorage.setItem(LocalStorageKeys.token, token);
      this.token = token;
      api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    },
    resetUserToken() {
      window.localStorage.removeItem(LocalStorageKeys.token);
      this.token = undefined;
    },
    setMe(data: Partial<User>) {
      this.me = data;
    },
    resetMe() {
      this.me = undefined;
    },
    setCollegues(data: Partial<User>[]) {
      this.collegues = data;
    },
    addCollegue(data: Partial<User>) {
      this.collegues.push(data);
    },
  },
});
