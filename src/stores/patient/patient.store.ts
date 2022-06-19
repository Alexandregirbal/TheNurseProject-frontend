import { defineStore } from 'pinia';
import { Patient } from 'src/interfaces/entities/patient';
import StoresIds from '../ids';
import { PatientStateInterface } from './patient.store.interfaces';
import state from './patient.store.state';

export const usePatientStore = defineStore({
  id: StoresIds.patient,
  state: (): PatientStateInterface => {
    return state;
  },
  getters: {
    getAll: (state: PatientStateInterface): Partial<Patient>[] => {
      return state.data;
    },
  },
  actions: {
    setAll(data: Partial<Patient>[]) {
      this.data = data;
    },
    add(...data: Partial<Patient>[]) {
      this.data.push(...data);
    },
    updateOne(original: Partial<Patient>, updates: Partial<Patient>) {
      const index = this.data.findIndex(
        (patient) => patient._id === original._id
      );

      this.data[index] = { ...this.data[index], ...updates };
    },

    deleteOne(patientToDelete: Partial<Patient>) {
      const index = this.data.findIndex(
        (patient) => patient._id === patientToDelete._id
      );

      this.data.splice(index, 1);
    },
  },
});
