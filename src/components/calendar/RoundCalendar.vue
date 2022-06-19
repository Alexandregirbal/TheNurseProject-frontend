<template>
  <div class="container-round-calendar">
    <q-btn
      class="back-button"
      flat
      round
      icon="arrow_back_ios"
      color="primary"
      @click="onBackButtonCLicked"
    />
    <div class="title-div">
      <span class="title-span" color="blue">
        {{ `${props.round.name}` }}
      </span>
    </div>

    <div class="calendar-div">
      <q-date
        class="calendar-component"
        minimal
        flat
        multiple
        v-model="daysSelected"
        first-day-of-week="1"
        :events="eventsDate"
        :event-color="eventsColor"
      />
    </div>
    <div class="users-div" :style="{ opacity: usersOpacity }">
      <div v-if="displayAssignButton" class="user-div">
        <q-btn flat dense no-caps class="user-button" @click="onAssign">
          {{ $t('calendar.assign') }}
        </q-btn>
      </div>
      <div v-if="isOneDateAssigned" class="user-div">
        <q-btn flat dense no-caps class="user-button" @click="onWithdraw">
          {{ $t('calendar.withdraw') }}
        </q-btn>
      </div>

      <div v-if="!isSingleUser">
        <div
          v-for="(user, index) of props.users"
          class="user-div"
          v-bind:key="`${user.firstName}-${user.lastName}`"
        >
          <q-btn
            flat
            dense
            no-caps
            class="user-button"
            @click="onUserSelected(user)"
            :style="{ color: colors[index] }"
          >
            {{ `${user.firstName} ${user.lastName}` }}
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Round } from 'src/interfaces/entities/round';
import { User } from 'src/interfaces/entities/user';
import { Utils } from 'src/utils/utils';
import { computed, ref } from 'vue';
interface RoundCalendarProps {
  round: Partial<Round>;
  users: Partial<User>[];
  userRounds: any[];
}
const props = withDefaults(defineProps<RoundCalendarProps>(), {
  round: () => null,
  users: () => [],
  userRounds: () => [],
});
const emit = defineEmits(['evBack', 'evChangeRoundSelected', 'evWithdraw']);

const colors = ['red', 'blue', 'green', 'black', 'orange', 'brown'];

const onBackButtonCLicked = () => {
  emit('evBack');
};

const daysSelected = ref([]);

const optionsEnabled = computed(() => Utils.isArrayFilled(daysSelected.value));

const userRounds = computed(() =>
  props.userRounds.filter((userRound) => userRound.roundId === props.round._id)
);

const eventsDate = computed(() =>
  userRounds.value.flatMap((userRound) => userRound.dates)
);

const eventsColor = (date: string) => {
  const userRound = userRounds.value?.find((userRound) =>
    userRound?.dates?.includes(date)
  );
  const userIndex = props.users.findIndex(
    (user) => user?._id === userRound?.userId
  );
  return colors[userIndex];
};

const usersOpacity = computed(() => (optionsEnabled.value ? 1 : 0.5));

const onUserSelected = (user: Partial<User>) => {
  emit('evChangeRoundSelected', {
    user: { ...user },
    round: { ...props.round },
    daysSelected: daysSelected.value,
  });

  daysSelected.value = [];
};

const onWithdraw = () => {
  emit('evWithdraw', {
    round: { ...props.round },
    daysSelected: daysSelected.value,
  });
  daysSelected.value = [];
};

const onAssign = () => {
  emit('evChangeRoundSelected', {
    user: { ...props.users[0] },
    round: { ...props.round },
    daysSelected: daysSelected.value,
  });
  daysSelected.value = [];
};

const isOneDateAssigned = computed(() => {
  const dateInCommon = eventsDate.value.filter((eventDate) =>
    daysSelected.value?.includes(eventDate)
  );

  return Utils.isArrayFilled(dateInCommon);
});

const isOneDateNotAssigned = computed(() => {
  const dateInCommon = eventsDate.value.filter((eventDate) =>
    daysSelected.value?.includes(eventDate)
  );

  return dateInCommon?.length !== daysSelected.value?.length;
});

const isSingleUser = computed(() => props.users?.length === 1);

const displayAssignButton = computed(
  () =>
    isSingleUser.value &&
    isOneDateNotAssigned.value &&
    Utils.isArrayFilled(daysSelected.value)
);
</script>

<style lang="scss" scoped>
.container-round-calendar {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;

  overflow-y: hidden;
  overflow-x: hidden;
}

.title-div {
  text-align: center;
  width: 80%;
  height: 15%;
}
.title-span {
  font-size: 1.2rem;
  font-weight: bold;
}

.users-div {
  width: 100%;
  margin-top: 5%;
  height: 25%;

  // margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  text-align: left;
  overflow-y: auto;
}

.user-div {
  // text-align: center;
  width: 100%;
}
.user-button {
  // font-size: 1.2rem;
  font-weight: bold;
}

.back-button {
  position: absolute;
  left: 12%;
  top: 15%;
}

.calendar-div {
  width: 100%;
  height: 60%;
  // margin-left: -2rem;
}

.calendar-component {
  width: 100%;
  height: 100%;
  // background-color: $background-2;
}
</style>
