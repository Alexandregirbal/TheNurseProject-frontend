<template>
  <div class="container-add-user">
    <div class="input">
      <q-input
        dense
        class="field"
        v-model="email"
        :label="i18n.t('users.email')"
      />
    </div>
    <div class="div-half">
      <q-input
        dense
        class="field-half"
        v-model="firstName"
        :label="i18n.t('users.firstName')"
      />
      <q-input
        dense
        class="field-half"
        v-model="lastName"
        :label="i18n.t('users.lastName')"
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
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const i18n = useI18n({ useScope: 'global' });

const emit = defineEmits(['evSubmit', 'evCancel']);

const onSubmit = () => {
  emit('evSubmit', { ...user.value });
};

const onCancel = () => {
  emit('evCancel');
};

const email = ref();
const firstName = ref();
const lastName = ref();

const user = ref({
  email,
  firstName,
  lastName,
});
</script>

<style lang="scss" scoped>
.container-add-user {
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $background-2;
}
.input {
  margin-top: 0.5rem;
  width: 100%;
}
.field {
  width: 100%;
}
.div-half {
  width: 100%;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.field-half {
  width: 50%;
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
