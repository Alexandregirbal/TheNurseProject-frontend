import { defineStore } from 'pinia';
import { Company } from 'src/interfaces/entities/company';
import StoresIds from '../ids';
import { CompanyStateInterface } from './company.store.interfaces';
import state from './company.store.state';

export const useCompanyStore = defineStore({
  id: StoresIds.company,
  state: (): CompanyStateInterface => {
    return state;
  },
  getters: {
    get: (state: CompanyStateInterface) => {
      return state.data;
    },
  },
  actions: {
    set(data: Company) {
      this.data = data;
    },
  },
});
