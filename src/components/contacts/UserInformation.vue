<template>
  <div class="container-user-information">
    <div class="container-user-information-content">
      <div v-for="field of fieldsToDisplay" :key="field.label">
        <div v-if="Utils.isDefined(field.value)" class="user-information-field">
          <q-field class="q-field" borderless :label="field.label" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ field.value }}
              </div>
            </template>
          </q-field>
          <div class="user-information-field-actions">
            <q-btn
              v-for="action of field.actions"
              :key="action.icon"
              flat
              round
              color="primary"
              :icon="action.icon"
              @click="action.onClick"
            />
          </div>
        </div>
        <q-separator />
      </div>
    </div>
    <div class="container-user-information-bottom">
      <q-btn
        id="close-information-button"
        color="primary"
        @click="onCloseButtonClicked"
        >{{ $t('contacts.buttonClose') }}</q-btn
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import * as moment from 'moment';
import { User } from 'src/interfaces/entities/user';
import { Utils } from 'src/utils/utils';
import { useI18n } from 'vue-i18n';
const i18n = useI18n({ useScope: 'global' });
const emit = defineEmits(['evClose']);

interface UserInformationProps {
  user: User;
}

interface Field {
  label: string;
  value: string;
  actions?: Action[];
}

interface Action {
  onClick: () => void;
  icon: string;
}

const props = withDefaults(defineProps<UserInformationProps>(), {
  user: () => null,
});

const onCallAction = () => {
  console.log('on call requested');
};

const fieldsToDisplay: Field[] = [
  {
    label: i18n.t('users.firstName'),
    value: props.user.firstName,
  },
  {
    label: i18n.t('users.lastName'),
    value: props.user.lastName,
  },
  {
    label: i18n.t('users.phone'),
    value: props.user.phone,
    actions: [
      { icon: 'chat', onClick: onCallAction },
      { icon: 'call', onClick: onCallAction },
    ],
  },
  {
    label: i18n.t('users.dateOfBirth'),
    value: Utils.isDefined(props.user.dateOfBirth)
      ? moment(props.user.dateOfBirth).format('l')
      : null,
  },
];

const onCloseButtonClicked = () => {
  emit('evClose');
};
</script>
<style lang="scss" scoped>
.container-user-information {
  width: 90%;
  border-radius: 10px;
  padding: 1.5rem;
  background-color: $background-2;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
}
.container-user-information-header {
  height: 15%;
  width: 100%;
}

.container-user-information-content {
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: censter;
}
.container-user-information-bottom {
  height: 15%;
  width: 100%;
  display: flex;
  padding-top: 1rem;
  flex-direction: column;
  align-items: center;
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
