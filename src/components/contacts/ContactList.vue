<template>
  <div class="container-list q-px-md">
    <q-card
      v-ripple
      v-for="[index, contact] of props.contacts.entries()"
      :key="index + contact.firstName + contact.lastName"
      class="card q-my-sm all-pointers-event"
      @click="onClickContact(contact)"
    >
      Hello handsome
      <div class="section">
        <div>
          <q-btn
            outline
            round
            color="primary"
            :icon="contactIcon"
            class="q-mr-lg"
          />
          <span> {{ contact.firstName }} {{ contact.lastName }} </span>
        </div>
      </div>
    </q-card>
    <q-separator vertical inset />
  </div>
</template>

<script lang="ts" setup>
import { ContactType } from 'src/interfaces/contacts';
import { Patient } from 'src/interfaces/entities/patient';
import { computed, ComputedRef } from 'vue';

const emit = defineEmits(['evContactOpened']);

interface ContactListProps {
  contacts: Partial<Patient>[];
  contactsType: ContactType;
}
const props = withDefaults(defineProps<ContactListProps>(), {
  contacts: () => [],
  contactsType: ContactType.PATIENT,
});

const onClickContact = (contact: Partial<Patient>) => {
  emit('evContactOpened', contact);
};

const contactIcon: ComputedRef<string> = computed(() => {
  if (props.contactsType === ContactType.PATIENT) {
    return 'healing';
  } else {
    return 'engineering';
  }
});
</script>

<style lang="scss" scoped>
.container-list {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.card {
  width: 100%;
  border-radius: 80px 35px 35px 80px;
}
.section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: stretch;
  padding: 1%;
  padding-left: 0.5%;
}
</style>
