import { defineStore } from 'pinia';
import StoresIds from '../ids';
import { HomeStateInterface, ReportDraft } from './home.store.interfaces';
import state from './home.store.state';

export const useHomeStore = defineStore({
  id: StoresIds.home,
  state: (): HomeStateInterface => {
    return state;
  },
  getters: {
    reportDraftById(state: HomeStateInterface): (id: string) => ReportDraft {
      const embed = (id: string): ReportDraft => {
        const drafts = state.reportDrafts.filter((draft) => {
          return draft.appointmentId === id;
        });
        if (drafts.length > 0) {
          return drafts[0];
        }
        return null;
      };

      return embed;
    },
  },
  actions: {
    upsertDraft(draft: ReportDraft) {
      const allAppointmentsIds = this.reportDrafts.map(
        (draft: ReportDraft) => draft.appointmentId
      );
      if (allAppointmentsIds.includes(draft.appointmentId)) {
        const idIndex = allAppointmentsIds.indexOf(draft.appointmentId);
        this.reportDrafts.splice(idIndex, 1, draft);
      } else {
        this.reportDrafts.push(draft);
      }
    },
    resetDraft() {
      this.reportDrafts = [];
    },
  },
});
