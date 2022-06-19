<template>
  <div class="container-create-appointment">
    <div class="form">
      <div class="input">
        <q-select
          rounded
          dense
          outlined
          v-model="patientSelected"
          :options="patientsOption"
          label="Patient"
        />
      </div>
      <div class="input">
        <q-input
          dense
          outlined
          v-model="details"
          label="Details"
          type="textarea"
          rows="4"
        />
      </div>
      <div class="input">
        <q-tabs
          class="tabs"
          dense
          v-model="typeSelected"
          @update:model-value="onChangeType"
        >
          <q-tab :name="AppointmentType.SINGLE" label="Ponctuel" />
          <q-tab :name="AppointmentType.RECURRENT" label="Recurrent" />
        </q-tabs>
      </div>
      <div class="input" v-if="isTypeSingle">
        <input-date :default="date" label="Date" @ev-change="onChangeDate" />
      </div>
      <div class="input" v-if="isTypeRecurrent">
        <q-select
          dense
          outlined
          v-model="roundSelected"
          :options="roundsOption"
          label="Tournée"
        />
      </div>
      <div class="div-time">
        <input-time
          class="input-time"
          :value="timeStart"
          label="From"
          @ev-change="onChangeTimeStart"
        />
        <input-time
          class="input-time"
          :value="timeEnd"
          label="To"
          @ev-change="onChangeTimeEnd"
        />
      </div>
      <div class="input" v-if="isTypeRecurrent">
        <q-select
          dense
          outlined
          multiple
          v-model="days"
          :options="roundsOption"
          label="Jours"
        />
      </div>
      <div class="input" v-if="isTypeRecurrent">
        <q-select
          dense
          outlined
          v-model="frequence"
          :options="roundsOption"
          label="Fréquence"
        />
      </div>
    </div>

    <div class="validation">
      <q-btn
        label="Annuler"
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
import { Patient } from 'src/interfaces/entities/patient';
import { Round } from 'src/interfaces/entities/round';
import { Utils } from 'src/utils/utils';
import { computed, ref } from 'vue';
import InputDate from '../ui/InputDate.vue';
import InputTime from '../ui/InputTime.vue';
interface CreateAppointmentProps {
  rounds: Partial<Round>[];
  patients: Partial<Patient>[];
}

const emit = defineEmits(['evSubmit', 'evCancel']);
const props = withDefaults(defineProps<CreateAppointmentProps>(), {
  rounds: () => [],
  patients: () => [],
});

const patientsOption = computed(() =>
  props.patients.map((patient) => ({
    label: `${patient.firstName} ${patient.lastName}`,
    value: patient._id,
  }))
);

const roundsOption = computed(() =>
  props.rounds.map((round) => `${round.name}`)
);

enum AppointmentType {
  SINGLE = 'SINGLE',
  RECURRENT = 'RECURRENT',
}
const patientSelected = ref(null);
const details = ref('');
const typeSelected = ref(AppointmentType.SINGLE);
const timeStart = ref(null);
const timeEnd = ref(null);
const date = ref(null);
const roundSelected = ref(null);
const frequence = ref(null);
const days = ref(null);

// const onBackButtonCLicked = () => {
//   emit('evClose');
// };

const onChangeType = (type: AppointmentType) => {
  typeSelected.value = type;
};

const onChangeTimeStart = (timeNew: string) => {
  timeStart.value = timeNew;

  if (Utils.isNull(timeEnd.value)) {
    const hourFrom = parseInt(timeNew.split(':')[0]);
    const hourTo = hourFrom < 23 ? hourFrom + 1 : 0;
    const hourToString = hourTo < 10 ? `0${hourTo}` : `${hourTo}`;
    const timeNewTo = `${hourToString}:${timeNew.split(':')[1]}`;

    timeEnd.value = timeNewTo;
  }
};

const onChangeTimeEnd = (timeNew: string) => {
  timeEnd.value = timeNew;
};

const onChangeDate = (dateNew: string) => {
  date.value = dateNew;
};

const onSubmit = () => {
  emit('evSubmit', {
    patientSelected: patientSelected?.value.value,
    details: details?.value,
    typeSelected: typeSelected?.value,
    timeStart: timeStart?.value,
    timeEnd: timeEnd?.value,
    date: date?.value,
    roundSelected: roundSelected?.value,
    frequence: frequence?.value,
    days: days?.value,
  });
};
const onCancel = () => {
  emit('evCancel');
};

const isTypeSingle = computed(
  () => typeSelected.value === AppointmentType.SINGLE
);

const isTypeRecurrent = computed(
  () => typeSelected.value === AppointmentType.RECURRENT
);
</script>

<style lang="scss" scoped>
.container-create-appointment {
  width: 90%;
  height: 80%;
  border-radius: 10px;

  background-color: $background-2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
}

.back-button {
  position: absolute;
  left: 12%;
  top: 15%;
}

.input {
  margin-top: 0.5rem;
  width: 100%;
}

.div-time {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: space-between;
}

.input-time {
  width: 45%;
}

.validation {
  position: absolute;
  bottom: 15%;
  height: 5%;
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 1rem;
}

.form {
  padding: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  height: 85%;
  overflow-y: auto;
}
</style>
