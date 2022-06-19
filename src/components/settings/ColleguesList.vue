<template>
  <div class="container-collegues-list">
    <span class="title-span" color="blue"> {{ props.title }}: </span>
    <q-list>
      <q-item
        clickable
        v-for="collegue of props.collegues"
        :key="collegue._id"
        @click="onCollegueClick({ ...collegue })"
      >
        <q-item-section avatar>
          <q-avatar color="orange"
            >{{ collegue.firstName[0] }}{{ collegue.lastName[0] }}</q-avatar
          >
        </q-item-section>
        <q-item-section
          >{{ collegue.firstName }} {{ collegue.lastName }}</q-item-section
        >
      </q-item>
      <q-item clickable v-ripple @click="onAddCollegue">
        <q-item-section avatar top>
          <q-avatar icon="add" color="primary" text-color="white" />
        </q-item-section>
        <q-item-section>ADD</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script lang="ts" setup>
import { User } from 'src/interfaces/entities/user';

interface UserInformationProps {
  title: string;
  collegues: Partial<User>[];
}

const props = withDefaults(defineProps<UserInformationProps>(), {
  title: '',
  collegues: () => null,
});
const emit = defineEmits(['evCollegueClick', 'evAddCollegue']);

const onCollegueClick = (user: Partial<User>) => {
  emit('evCollegueClick', user);
};

const onAddCollegue = () => {
  emit('evAddCollegue');
};
</script>

<style lang="scss" scoped>
.container-collegues-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
