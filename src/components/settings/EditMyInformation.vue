<template>
  <div class="container-edit-user">
    <div class="input">
      <q-input
        dense
        class="field"
        disable
        v-model="email"
        :label="i18n.t('users.email')"
      />
    </div>
    <div class="input">
      <q-input
        dense
        class="field"
        v-model="firstName"
        :label="i18n.t('users.firstName')"
      />
    </div>
    <div class="input">
      <q-input
        dense
        class="field"
        v-model="lastName"
        :label="i18n.t('users.lastName')"
      />
    </div>
    <div class="input">
      <q-input dense v-model="phone" :label="i18n.t('users.phone')" />
    </div>
    <div class="input">
      <q-input
        dense
        class="field"
        v-model="dateOfBirth"
        mask="##/##/####"
        :label="i18n.t('users.dateOfBirth')"
      />
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
import { date } from 'quasar';
import { useUserStore } from 'src/stores/user/user.store';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const i18n = useI18n({ useScope: 'global' });
const userStore = useUserStore();

const emit = defineEmits(['evSubmit', 'evCancel']);

const onSubmit = () => {
  const dateOfBirthFormatted = date.extractDate(
    dateOfBirth.value,
    'DD/MM/YYYY'
  );

  const userFormatted = {
    ...user.value,
    dateOfBirth: dateOfBirthFormatted,
  };

  emit('evSubmit', userFormatted);
};

const onCancel = () => {
  emit('evCancel');
};

const email = ref(userStore.getMe?.email);
const firstName = ref(userStore.getMe?.firstName);
const lastName = ref(userStore.getMe?.lastName);
const phone = ref(userStore.getMe?.phone);
const dateOfBirth = ref(
  date.formatDate(userStore.getMe?.dateOfBirth, 'DD/MM/YYYY')
);

const user = ref({
  email,
  firstName,
  lastName,
  phone,
  dateOfBirth,
});
</script>

<style lang="scss" scoped>
.container-edit-user {
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.input {
  margin-top: 0.5rem;
  width: 100%;
}
.field {
  width: 100%;
}

.validation {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 1rem;
}
.q-btn {
  font-size: 1rem;
  width: 40%;
}
</style>
