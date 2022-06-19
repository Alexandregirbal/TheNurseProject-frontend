<template>
  <q-tabs
    class="tabs"
    v-model="currentTab"
    @update:model-value="$emit('evChange', $event)"
  >
    <q-tab :name="ContactType.PATIENT" label="Patients" />
    <q-tab :name="ContactType.COLLEGUE" label="Collegues" />
  </q-tabs>
</template>

<script lang="ts" setup>
import { ContactType } from 'src/interfaces/contacts';
import { ref, Ref } from 'vue';

const currentTab: Ref<ContactType> = ref(ContactType.PATIENT);
</script>

<style lang="scss" scoped>
.container-type-picker {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>
