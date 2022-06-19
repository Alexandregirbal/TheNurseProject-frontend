import { defineStore } from 'pinia';
import { Round } from 'src/interfaces/entities/round';
import StoresIds from '../ids';
import { RoundStateInterface } from './round.store.interfaces';
import state from './round.store.state';

export const useRoundStore = defineStore({
  id: StoresIds.round,
  state: (): RoundStateInterface => {
    return state;
  },
  getters: {
    get: (state: RoundStateInterface) => {
      return state.rounds;
    },
  },
  actions: {
    set(rounds: Round[]) {
      this.rounds = rounds;
    },
  },
});
