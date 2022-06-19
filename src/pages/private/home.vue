<template>
  <div id="home-container">
    <div class="left">
      <q-btn
        icon="arrow_left"
        :onClick="previous"
        :disable="!hasPreviousAppointment"
        dense
        flat
        color="primary"
      />
    </div>
    <div class="center">
      <AppointmentCard :appointment="selectedAppointment" />
    </div>
    <div class="right">
      <q-btn
        icon="arrow_right"
        :onClick="next"
        :disable="!hasNextAppointment"
        dense
        flat
        color="primary"
      />
    </div>
    <div class="bottom">
      <div class="empty"></div>
      <q-btn class="new-releve" color="primary" @click="handleReportClick"
        >Faire la relève</q-btn
      >
    </div>
  </div>
  <q-dialog v-model="displayEditReportModal">
    <EditReport
      @hide-modal="hideEditReportModal"
      @submit="next"
      :appointmentId="selectedAppointment._id"
    />
  </q-dialog>
</template>

<script lang="ts" setup>
import AppointmentCard from 'src/components/home/AppointmentCard.vue';
import EditReport from 'src/components/home/EditReport.vue';
import { PatientObject } from 'src/interfaces/entities/patient';
import { Appointment } from 'src/interfaces/home';
import { computed, ComputedRef, ref, Ref } from 'vue';

const mockAppointments: Appointment[] = [
  {
    _id: '123456789',
    patient: {
      _id: 'patientId1',
      firstName: 'John',
      lastName: 'Dupont',
      address: '3 avenue des Moulins, Montpellier',
      dateOfBirth: new Date(1950, 1, 30),
      contactsEmergency: [],
      phone: '0623898027',
      sex: PatientObject.Sex.WOMAN,
    },
    date: new Date(2022, 1, 30, 8, 30, 0),
    lastReport: {
      audios: [
        {
          src: 'http://id123456789',
          type: 'mp3',
        },
        {
          src: 'http://idosef',
          type: 'mp3',
        },
      ],
      notes:
        'En forme,\nLa plaie cicatrise bien,\nUn autre truc,\nUne autre information de qualité,\nEn forme,\nLa plaie cicatrise bien,\nUn autre truc,\nUne autre information de qualité,\nEn forme,\nLa plaie cicatrise bien,\nEn forme,\nLa plaie cicatrise bien,\nUn autre truc,\nUne autre information de qualité,\nEn forme,\nLa plaie cicatrise bien',
    },
  },
  {
    _id: '987654321',
    patient: {
      _id: '123',
      firstName: 'Marie',
      lastName: 'Labellegosse',
      address: '6 rue du chien, Montpellier',
      dateOfBirth: new Date(1970, 1, 30),
      contactsEmergency: [],
      phone: '0623898027',
      sex: PatientObject.Sex.WOMAN,
    },
    date: new Date(2022, 1, 30, 8, 30, 0),
    lastReport: {
      audios: [
        {
          src: 'http://id123456789',
          type: 'mp3',
        },
        {
          src: 'http://idosef',
          type: 'mp3',
        },
      ],
      notes: 'Allez lààà',
    },
  },
];
const appointmentsOfTheDay: Ref<Appointment[]> = ref(mockAppointments);
const selectedAppointmentIndex: Ref<number> = ref(0);
const displayEditReportModal: Ref<boolean> = ref(false);

const selectedAppointment: ComputedRef<Appointment> = computed(() => {
  return appointmentsOfTheDay.value[selectedAppointmentIndex.value];
});
const hasPreviousAppointment: ComputedRef<boolean> = computed(() => {
  if (selectedAppointmentIndex.value <= 0) {
    return false;
  }
  return true;
});
const hasNextAppointment: ComputedRef<boolean> = computed(() => {
  if (selectedAppointmentIndex.value >= appointmentsOfTheDay.value.length - 1) {
    return false;
  }
  return true;
});

const previous = () => {
  if (hasPreviousAppointment.value) {
    selectedAppointmentIndex.value -= 1;
  }
};
const next = () => {
  if (hasNextAppointment.value) {
    selectedAppointmentIndex.value += 1;
  }
};
const handleReportClick = () => {
  displayEditReportModal.value = true;
};
const hideEditReportModal = () => {
  displayEditReportModal.value = false;
};
</script>

<style lang="scss" scoped>
#home-container {
  overflow: hidden;
  display: grid;
  grid-template-areas: 'left center right' 'bottom bottom bottom';
  $side-size: 1.5rem;
  grid-template-columns: $side-size 1fr $side-size;
  grid-template-rows: 90% 10%;
  height: 100%;

  .left,
  .center,
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .left,
  .right {
    .q-btn {
      font-size: 1.8rem;
      &:disabled {
        background-color: rgba(0, 0, 0, 0) !important;
      }
    }
  }
  .left {
    grid-area: left;
  }
  .center {
    grid-area: center;
    z-index: 1;
  }
  .right {
    grid-area: right;
  }
  .bottom {
    grid-area: bottom;
    display: grid;
    $side-size: 20%;
    grid-template-columns: $side-size 1fr $side-size;
    grid-template-areas: 'empty add micro';
    .empty {
      grid-area: 'empty';
    }
    .new-releve {
      grid-area: 'add';
      height: 1.5rem;
      margin: auto 0;
    }
    #start-microphone {
      grid-area: 'micro';
      font-size: 1.5rem;
      &:disabled {
        background-color: rgba(0, 0, 0, 0) !important;
      }
    }
  }
}
</style>
