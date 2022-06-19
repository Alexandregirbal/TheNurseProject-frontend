<template>
  <div class="container">
    <div class="title">Relève</div>
    <q-btn
      icon="mic"
      flat
      round
      dense
      color="disabled"
      @click="toggleMicrophoneTooltip()"
    >
      <q-tooltip
        no-parent-event
        anchor="top middle"
        self="top middle"
        :offset="[10, 10]"
        v-model="showMicrophoneTooltip"
      >
        Coming soon
      </q-tooltip>
    </q-btn>
    <!-- <q-btn icon="mic" @click="addAudio" flat round dense color="disabled" />
    <div v-for="[index, audio] of audios.entries()" :key="index">
      {{ audio }}
    </div> -->
    <q-input
      class="input-releve"
      v-model="notes"
      outlined
      type="textarea"
      autofocus
      label="Ecrivez votre releve ici"
    />
    <div class="validation">
      <q-btn
        label="Supprimer"
        type="reset"
        @click="onCancel"
        color="secondary"
        outline
        class="q-ml-sm"
      />
      <q-btn label="Valider" type="submit" color="primary" @click="onSubmit" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { AudioSource } from 'src/interfaces/home';
import { useHomeStore } from 'src/stores/home/home.store';
import { onBeforeUnmount, ref, Ref } from 'vue';

const $q = useQuasar();
const homeStore = useHomeStore();

interface Props {
  appointmentId: string;
}
const props = defineProps<Props>();

interface Emits {
  (e: 'hideModal'): void;
  (e: 'submit'): void;
}
const emit = defineEmits<Emits>();

const getReportDraftById = homeStore.reportDraftById;
const originalDraft = getReportDraftById(props.appointmentId);

const audios: Ref<AudioSource[]> = ref(originalDraft?.content?.audios ?? []);
const notes: Ref<string> = ref(originalDraft?.content?.notes ?? null);
const isCancelled: Ref<boolean> = ref(false);
const isSubmitted: Ref<boolean> = ref(false);
const showMicrophoneTooltip: Ref<boolean> = ref(false);

// const addAudio = () => {
//   audios.value.push({
//     src: 'link-to-audio',
//     type: 'audio/mp3',
//   });
// };
const onSubmit = () => {
  //TODO API call
  isSubmitted.value = true;
  emit('hideModal');
  emit('submit');
};
const onCancel = () => {
  isCancelled.value = true;
  emit('hideModal');
};
const toggleMicrophoneTooltip = () => {
  showMicrophoneTooltip.value = !showMicrophoneTooltip.value;
};

onBeforeUnmount(() => {
  if (isCancelled.value) {
    $q.notify({
      type: 'negative',
      message: 'Draft has been discarded',
      timeout: 300,
    });
    homeStore.resetDraft();
    return;
  }
  homeStore.upsertDraft({
    appointmentId: props.appointmentId,
    content: { audios: audios.value, notes: notes.value },
  });
  if (!isSubmitted.value) {
    if (!notes.value) {
      //No notify if empty
      return;
    }
    $q.notify({
      type: 'positive',
      message: 'Report saved as draft',
      timeout: 300,
    });
  }
});
</script>

<style lang="scss" scoped>
.container {
  max-height: 75%;
  width: 90%;
  border-radius: 10px;
  padding: 1.5rem;
  background-color: $background-2;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 2rem;
  }
  .q-btn {
    font-size: 1.3rem;
  }
  .input-releve {
    margin-top: 0.5rem;
  }
  .q-field {
    width: 100%;
  }
  .validation {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
    column-gap: 1rem;

    .q-btn {
      font-size: 1rem;
      width: 40%;
    }
  }
}
</style>
