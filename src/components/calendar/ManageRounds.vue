<template>
  <div class="container-manage-rounds">
    <round-calendar
      v-if="displayRoundCalendar"
      :round="currentRound"
      :users="props.users"
      :userRounds="props.userRounds"
      @ev-change-round-selected="onChangeRoundSelected"
      @ev-back="onBackToListClicked"
      @ev-withdraw="onWithdrawAssignment"
    />
    <add-round
      v-else-if="displayNewRound"
      @evCancel="onAddRoundCancel"
      @evSubmit="onAddRoundSubmitted"
    />
    <rounds-list
      v-else
      :rounds="props.rounds"
      @ev-selected="onRoundSelected"
      @ev-back="onBackToPageClicked"
      @evAddRoundClick="onAddRoundClick"
    />
  </div>
</template>
<script lang="ts" setup>
import { Round } from 'src/interfaces/entities/round';
import { User } from 'src/interfaces/entities/user';
import { ref } from 'vue';
import AddRound from './AddRound.vue';
import RoundCalendar from './RoundCalendar.vue';
import RoundsList from './RoundsList.vue';
interface ManageRoundsProps {
  rounds: Partial<Round>[];
  users: Partial<User>[];
  userRounds: any[];
}

const emit = defineEmits([
  'evSubmit',
  'evClose',
  'evChangeRoundSelected',
  'evWithdrawAssignment',
  'evRoundCreated',
]);
const props = withDefaults(defineProps<ManageRoundsProps>(), {
  rounds: () => [],
  users: () => [],
  userRounds: () => [],
});

const displayRoundCalendarDefault = props.rounds.length === 1;
const displayRoundCalendar = ref(displayRoundCalendarDefault);
const displayNewRound = ref(false);
const currentRoundDefault = props.rounds.length === 1 ? props.rounds[0] : null;
const currentRound = ref(currentRoundDefault);

const onRoundSelected = (round: Partial<Round>) => {
  currentRound.value = round;
  displayRoundCalendar.value = true;
};

const onBackToListClicked = () => {
  currentRound.value = null;
  displayRoundCalendar.value = false;
};

const onBackToPageClicked = () => {
  emit('evClose');
};

const onChangeRoundSelected = (event) => {
  emit('evChangeRoundSelected', event);
};

const onWithdrawAssignment = (event) => {
  emit('evWithdrawAssignment', event);
};

const onAddRoundClick = () => {
  displayNewRound.value = true;
};

const onAddRoundSubmitted = (round: Round) => {
  emit('evRoundCreated', round);
  displayNewRound.value = false;
};

const onAddRoundCancel = () => {
  displayNewRound.value = false;
};
</script>

<style lang="scss" scoped>
.container-manage-rounds {
  width: 100%;
  height: 80%;
  border-radius: 10px;
  padding: 1rem;
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;

  background-color: $background-2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
}
</style>
