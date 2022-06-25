<template>
  <div class="container-rounds-list">
    <q-btn
      class="back-button"
      flat
      round
      icon="arrow_back_ios"
      color="primary"
      @click="onBackButtonCLicked"
    />
    <div class="title-div">
      <span class="title-span">
        {{ $t('calendar.roundsListTitle') }}
      </span>
    </div>

    <div class="rounds-div">
      <div
        v-for="round of props.rounds"
        class="round-div"
        v-bind:key="round.name"
      >
        <q-btn flat class="round-button" @click="onRoundClicked(round)">
          {{ round.name }}
        </q-btn>
      </div>
      <div class="round-div">
        <q-btn
          round
          class="round-button"
          @click="addNewRoundClick"
          icon="add"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Round } from 'src/interfaces/entities/round';
interface ManageRoundsProps {
  rounds: Partial<Round>[];
}

const emit = defineEmits(['evSelected', 'evBack', 'evAddRoundClick']);
const props = withDefaults(defineProps<ManageRoundsProps>(), {
  rounds: () => [],
});

const onRoundClicked = (round: Partial<Round>) => {
  emit('evSelected', round);
};

const onBackButtonCLicked = () => {
  emit('evBack');
};

const addNewRoundClick = () => {
  emit('evAddRoundClick');
};
</script>

<style lang="scss" scoped>
.container-rounds-list {
  width: 90%;
  height: 100%;

  background-color: $background-2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
}

.title-div {
  text-align: center;
}
.title-span {
  font-size: 1.2rem;
  font-weight: bold;
}

.rounds-div {
  width: 100%;
  height: 100%;
  margin-top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.round-div {
  margin-bottom: 10%;
}
.round-button {
  color: $primary;
}

.back-button {
  position: absolute;
  left: 12%;
  top: 15%;
}

.field {
  width: 100%;
}
</style>
