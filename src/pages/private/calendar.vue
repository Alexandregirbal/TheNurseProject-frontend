<template>
  <div class="calendar-container">
    <div id="calendar">
      <q-date
        color="primary"
        v-model="selectedDate"
        minimal
        :events="allEventsDates"
        :event-color="getColorFromDate"
        @update:model-value="handleUpdateValue"
      >
        Legend will go there
      </q-date>
    </div>
    <div class="manage-rounds-button">
      <q-btn color="primary" @click="onManageRoundsButtonClicked">{{
        $t('calendar.manageRoundsButton')
      }}</q-btn>
    </div>
    <div class="create-appointment-button">
      <q-btn color="primary" @click="onCreateAppointmentButtonClicked">{{
        $t('calendar.createAppointmentButton')
      }}</q-btn>
    </div>

    <q-dialog v-model="displayManageRoundsModal">
      <manage-rounds
        :rounds="mockRounds"
        :users="mockUsers"
        :userRounds="mockUserRounds"
        @ev-change-round-selected="onChangeRoundSelected"
        @ev-close="onCloseManageRoundsClicked"
        @ev-withdraw-assignment="onWithdrawAssignment"
        @ev-round-created="onRoundCreated"
      />
    </q-dialog>

    <q-dialog v-model="displayCreateAppointmentModal">
      <create-appointment
        :rounds="mockRounds"
        :patients="patients"
        @ev-submit="onNewAppointment"
        @ev-cancel="onCloseCreateAppointmentClicked"
        @ev-withdraw-assignment="onWithdrawAssignment"
      />
    </q-dialog>
  </div>
</template>

<script lang="ts" setup>
import { AppointmentService } from 'src/api/appointment.service';
import { PatientService } from 'src/api/patient.service';
import { RoundService } from 'src/api/round.service';
import CreateAppointment from 'src/components/calendar/CreateAppointment.vue';
import { Patient } from 'src/interfaces/entities/patient';
import { Round } from 'src/interfaces/entities/round';
import { User } from 'src/interfaces/entities/user';
import { useCompanyStore } from 'src/stores/company/company.store';
import { usePatientStore } from 'src/stores/patient/patient.store';
import { useUserStore } from 'src/stores/user/user.store';
import { formatDate } from 'src/utils/dates';
import { computed, ComputedRef, ref, Ref } from 'vue';
import ManageRounds from '../../components/calendar/ManageRounds.vue';
interface Event {
  type: string;
  date: string;
}

const getDateType = (date: string): string => {
  let type = '';
  allEvents.value.forEach((property) => {
    if (property.date === date) {
      type = property.type;
    }
  });
  return type;
};
const getColorFromDate = (date: string): string => {
  const type = getDateType(date);
  // Take a look here for all colors https://quasar.dev/style/color-palette#color-list
  switch (type) {
    case 'Blocked':
      return 'secondar';
    default:
      return 'green-6';
  }
};
const toggleBlockedDate = (value: string) => {
  let elementHasBeenDeleted = false;
  for (let index = 0; index < allEvents.value.length; index++) {
    const element = allEvents.value[index];
    if (element.date === value) {
      elementHasBeenDeleted = true;
      if (element.type === 'Blocked') {
        allEvents.value.splice(index, 1);
      }
    }
  }
  if (!elementHasBeenDeleted) {
    allEvents.value.push({
      type: 'Blocked',
      date: value,
    });
  }
};
const handleUpdateValue = (value: unknown) => {
  if (typeof value == 'string') {
    selectedDate.value = today;
    toggleBlockedDate(value);
  }
};
const today = formatDate(new Date());
const selectedDate: Ref<string> = ref(today);
const allEvents: Ref<Event[]> = ref([
  {
    type: 'Blocked',
    date: formatDate(new Date(2022, 0, 14)),
  },
  {
    type: 'A',
    date: formatDate(new Date(2022, 0, 13)),
  },
]);
const allEventsDates: ComputedRef<string[]> = computed(() => {
  return allEvents.value.map((property) => property.date);
});

/* -------------------------------------------------------------------------- */
/*                                MANAGE ROUNDS                               */
/* -------------------------------------------------------------------------- */

const displayManageRoundsModal = ref(false);

const onManageRoundsButtonClicked = () => {
  displayManageRoundsModal.value = true;
};

const onCloseManageRoundsClicked = () => {
  displayManageRoundsModal.value = false;
};

const onChangeRoundSelected = (event: {
  user: Partial<User>;
  round: Partial<Round>;
  daysSelected: string[];
}) => {
  const { round, user, daysSelected } = event;

  removeExistingAssignments(daysSelected, round);

  addNewAssignments(user, round, daysSelected);
};

const onWithdrawAssignment = (event: {
  daysSelected: string[];
  round: Partial<Round>;
}) => {
  const { round, daysSelected } = event;

  removeExistingAssignments(daysSelected, round);
};

const onRoundCreated = async (round: Round) => {
  const company = useCompanyStore().get;
  await RoundService.createOne(company, round).then((roundCreated) => {
    mockRounds.value.push(roundCreated);
  });
};

const removeExistingAssignments = (dates: string[], round: Partial<Round>) => {
  for (const date of dates) {
    const userRoundExistingIndex = mockUserRounds?.value?.findIndex(
      (userRound) =>
        userRound?.dates.includes(date) && userRound.roundId === round._id
    );

    if (userRoundExistingIndex === -1) {
      continue;
    }

    const dateIndex = mockUserRounds?.value[
      userRoundExistingIndex
    ].dates.findIndex((dateInList) => dateInList === date);

    mockUserRounds.value[userRoundExistingIndex].dates.splice(dateIndex, 1);
  }
};

const addNewAssignments = (
  user: Partial<User>,
  round: Partial<Round>,
  dates: string[]
) => {
  const userRoundNewIndex = mockUserRounds.value.findIndex(
    (userRound) =>
      userRound.userId === user._id && userRound.roundId === round._id
  );

  if (userRoundNewIndex === -1) {
    mockUserRounds.value.push({
      userId: user._id,
      dates,
      roundId: round._id,
    });
  } else {
    mockUserRounds.value[userRoundNewIndex].dates.push(...dates);
  }
};

/* -------------------------------------------------------------------------- */
/*                             CREATE APPOINTMENT                             */
/* -------------------------------------------------------------------------- */

const displayCreateAppointmentModal = ref(false);
const patients = ref([]);

const onCreateAppointmentButtonClicked = async () => {
  const patientsFetched = await PatientService.findManyOwn();

  usePatientStore().setAll(patientsFetched);

  patients.value = patientsFetched;
  displayCreateAppointmentModal.value = true;
};

const onCloseCreateAppointmentClicked = () => {
  displayCreateAppointmentModal.value = false;
};

const onNewAppointment = async (event: {
  patientSelected: Partial<Patient>;
  details: string;
  typeSelected: string;
  timeStart: string;
  timeEnd: string;
  date: string;
  roundSelected: Partial<Round>;
  frequence: string;
  days: string;
}) => {
  enum AppointmentType {
    SINGLE = 'SINGLE',
    RECURRENT = 'RECURRENT',
  }

  const {
    patientSelected,
    details,
    typeSelected,
    timeStart,
    timeEnd,
    date,
    // roundSelected,
    // frequence,
    // days,
  } = event;

  if (typeSelected === AppointmentType.SINGLE) {
    console.log(patientSelected);

    await AppointmentService.createOne(useUserStore().getMe, {
      patientId: patientSelected,
      date,
      details,
      timeStart,
      timeEnd,
    });
  }
  displayCreateAppointmentModal.value = false;
};

/* -------------------------------------------------------------------------- */
/*                                  MOCK DATA                                 */
/* -------------------------------------------------------------------------- */

const mockRounds = ref([
  { _id: '1', name: 'Montpellier Sud Le soleil les nanas' },
  { _id: '2', name: 'Montpellier Nord' },
]);

const mockUsers: Partial<User>[] = [
  { _id: '1', firstName: 'Alexandre', lastName: 'Girbal' },
  { _id: '2', firstName: 'David', lastName: 'Meier' },
  { _id: '3', firstName: 'Jeremie', lastName: 'Dumont' },
  { _id: '4', firstName: 'Alexis', lastName: 'Andre' },
  { _id: '5', firstName: 'Camille', lastName: 'Thomas' },
  { _id: '6', firstName: 'Justine', lastName: 'Foulquier' },
];

const mockUserRounds = ref([
  {
    userId: mockUsers[0]._id,
    roundId: mockRounds.value[0]._id,
    dates: ['2022/03/07', '2022/03/08', '2022/03/09'],
  },
  {
    userId: mockUsers[1]._id,
    roundId: mockRounds.value[0]._id,
    dates: ['2022/03/12', '2022/03/13', '2022/03/14'],
  },
]);
</script>

<style lang="scss">
//This style is NOT SCOPED because we need to override d-date__event for styling purposes
.calendar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  #calendar {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    width: 100%;
    & > div {
      width: 100%;
      height: 100%;
    }
  }
  .manage-rounds-button {
    margin-top: 1rem;
  }
  .create-appointment-button {
    margin-top: 1rem;
  }
  .q-date__event {
    position: absolute;
    left: 0;
    transform: translate3d(0, 0, 0);
    bottom: 0;
    border-radius: 5px;
    opacity: 40%;
    width: 100%;
    height: 100%;
  }
  .bg-secondar {
    opacity: 80%;
  }
}
</style>
