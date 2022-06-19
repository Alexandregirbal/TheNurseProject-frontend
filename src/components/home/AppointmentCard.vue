<template>
  <div class="appointment-card-container">
    <div class="card-title">{{ fullName }}</div>
    <div class="card-content">
      <div class="information">
        <div class="time">{{ formatTime(props.appointment.date) }}</div>
        <a
          :href="
            'https://maps.google.com/?q=' + props.appointment.patient.address
          "
          target="_blank"
          class="address"
          >{{ props.appointment.patient.address }}</a
        >
        <div class="age">
          <span>Age: </span>{{ getAge(props.appointment.patient.dateOfBirth) }}
          {{ $t('dates.yearsOld') }}
        </div>
        <!-- <div class="details">
          <span>Détails: </span>{{ props.appointment.patient.details }}
        </div> -->
      </div>

      <div class="todo-list">
        <div class="title">Soins à effectuer</div>
        <!-- <ul class="tasks">
          <BulletPoint
            v-for="[
              index,
              task,
            ] of props.appointment.patient.todoList.entries()"
            :key="index"
          >
            {{ task }}
          </BulletPoint>
        </ul> -->
        <div class="edit">
          <q-btn icon="create" flat round color="primary" />
        </div>
      </div>
      <div class="last-releve">
        <div class="title">Relève précédente</div>
        <div class="content">
          <!-- <ul class="audios">
            <li
              v-for="[
                index,
                audio,
              ] of props.appointment.lastReport.audios.entries()"
              :key="index"
            >
              <q-btn icon="volume_up" flat round color="disabled" />
              <span>{{ audio.src }}</span>
            </li>
          </ul> -->
          <div class="notes">
            {{ props.appointment.lastReport.notes }}
          </div>
        </div>
        <div class="history">
          <q-btn icon="access_time" flat round color="primary" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import BulletPoint from 'src/components/ui/BulletPoint.vue';
import { Appointment } from 'src/interfaces/home';
import { formatTime, getAge } from 'src/utils/dates';
import { computed, ComputedRef } from 'vue';

const props = defineProps<{
  appointment: Appointment;
}>();
const fullName: ComputedRef<string> = computed(() => {
  return `${props.appointment.patient.firstName} ${props.appointment.patient.lastName}`;
});
</script>

<style lang="scss" scoped>
.appointment-card-container {
  height: 100%;
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: $background-2;

  .card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    height: 2rem;
  }
  .card-content {
    height: calc(100% - 2rem);
    .title {
      text-align: center;
      font-size: 1.3rem;
    }
    .information {
      height: 22%;
      .time {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
      }
      .address {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $primary;
        text-decoration: none;
      }
      .age,
      .details {
        margin-top: 0.2rem;
        span {
          font-weight: bold;
        }
      }
    }
    .todo-list {
      height: 28%;
      padding-bottom: 0.5rem;
      .tasks {
        height: calc(100% - 2rem);
        overflow-y: auto;
        margin: 0;
      }
      .edit {
        display: flex;
        justify-content: right;
        position: relative;
        height: 1.5rem;
        top: -2rem;
        // button {
        // }
      }
    }
    .last-releve {
      height: 50%;
      .content {
        height: calc(100% - 2rem);
        overflow-y: auto;
      }
      .audios {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .notes {
        margin: 0;
      }
      .history {
        display: flex;
        justify-content: right;
        position: relative;
        height: 1.5rem;
        top: -2rem;
        // button {
        // }
      }
    }
  }
}
</style>
