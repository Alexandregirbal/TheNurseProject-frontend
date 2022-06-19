<template>
  <div class="container-user-information">
    <div v-for="field of fieldsToDisplay" :key="field.label">
      <div class="user-information-field">
        <q-field class="q-field" borderless :label="field.label" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              {{ buildFieldDisplay(field.value) }}
            </div>
          </template>
        </q-field>
      </div>
      <q-separator />
    </div>
  </div>
</template>
<script lang="ts" setup>
import * as moment from 'moment';
import { UserObject } from 'src/interfaces/entities/user';
import { useUserStore } from 'src/stores/user/user.store';
import { Utils } from 'src/utils/utils';
import { useI18n } from 'vue-i18n';
const i18n = useI18n({ useScope: 'global' });
const emit = defineEmits(['evClose']);
const userStore = useUserStore();

interface Field {
  label: string;
  value: string;
}

const buildFieldDisplay = (field) => {
  return Utils.isDefined(field) ? field : i18n.t('settings.notProvided');
};

const getUserTypeLabel = () => {
  switch (userStore.getMe?.type) {
    case UserObject.Type.ASSOCIATE:
      return i18n.t('users.associate');
    case UserObject.Type.SUBSTITUTE:
      return i18n.t('users.substitute');
  }
};

const fieldsToDisplay: Field[] = [
  {
    label: i18n.t('users.email'),
    value: userStore.getMe?.email,
  },
  {
    label: i18n.t('users.typeOfAccount'),
    value: getUserTypeLabel(),
  },
  {
    label: i18n.t('users.firstName'),
    value: userStore.getMe?.firstName,
  },
  {
    label: i18n.t('users.lastName'),
    value: userStore.getMe?.lastName,
  },
  {
    label: i18n.t('users.phone'),
    value: userStore.getMe?.phone,
  },
  {
    label: i18n.t('users.dateOfBirth'),
    value: moment(userStore.getMe?.dateOfBirth).format('l'),
  },
];
</script>
<style lang="scss" scoped>
.container-user-information {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.container-user-information-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.user-information-field {
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: space-between;
}

.user-information-field-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.q-field {
  width: 100%;
}
</style>
