<template>
  <div class="container-patient-information">
    <div class="container-patient-information-content">
      <div v-for="field of fieldsToDisplay" :key="field.label">
        <div v-if="field.visible ?? Utils.isDefined(field.value)">
          <div
            v-if="field.type === FieldType.TITLE"
            class="patient-information-field"
          >
            <div class="title-div">
              <span class="title-span">
                {{ field.label }}
              </span>
            </div>
          </div>
          <div v-else>
            <div class="patient-information-field">
              <q-field
                dense
                class="q-field"
                borderless
                :label="field.label"
                stack-label
              >
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    {{ field.value }}
                  </div>
                </template>
              </q-field>
              <div class="patient-information-field-actions">
                <q-btn
                  v-for="action of field.actions"
                  :key="action.icon"
                  dense
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
      </div>
    </div>
    <div class="container-patient-information-bottom">
      <div>
        <q-btn flat round color="disabled" icon="edit" @click="onEdit" />
        <q-btn id="close-information-button" color="primary" @click="onClose">{{
          $t('contacts.buttonClose')
        }}</q-btn>
      </div>
      <q-btn flat round color="disabled" icon="delete" @click="onDelete" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import * as moment from 'moment';
import { date, openURL } from 'quasar';
import { Patient } from 'src/interfaces/entities/patient';
import { Utils } from 'src/utils/utils';
import { toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
const i18n = useI18n({ useScope: 'global' });
const emit = defineEmits(['evClose', 'evEdit', 'evDelete']);

interface PatientInformationProps {
  patient: Patient;
}

enum FieldType {
  FIELD = 'FIELD',
  TITLE = 'TITLE',
}

interface Field {
  type?: FieldType;
  label: string;
  value?: any;
  actions?: Action[];
  visible?: boolean;
}

interface Action {
  onClick: () => void;
  icon: string;
  href: string;
}

const props = withDefaults(defineProps<PatientInformationProps>(), {
  patient: () => null,
});

const onActionCall = () => {
  openURL('tel:*');
  // cordova.InAppBrowser.open('tel:*', '_system');
};

const onActionSms = () => {
  openURL('sms:*');
  // cordova.InAppBrowser.open('sms:*', '_system');
};

const onActionMaps = () => {
  openURL('maps:*');
  // cordova.InAppBrowser.open('maps:*', '_system');
};

const dateOfBirthFormatted = date.formatDate(
  props.patient.dateOfBirth,
  'DD/MM/YYYY'
);
const age = moment().diff(props.patient.dateOfBirth, 'years');

let { patient } = toRefs(props);

const isContactEmergencyDefined =
  Utils.isStringDefined(props.patient?.contactsEmergency[0]?.phone) ||
  Utils.isStringDefined(props.patient?.contactsEmergency[1]?.phone);

const fieldsToDisplay: Field[] = [
  {
    label: i18n.t('patients.firstName'),
    value: patient.value.firstName,
  },
  {
    label: i18n.t('patients.lastName'),
    value: props.patient.lastName,
  },
  {
    label: i18n.t('patients.address'),
    value: props.patient.address,
    actions: [{ icon: 'map', onClick: onActionMaps, href: 'maps:*' }],
  },
  {
    label: i18n.t('patients.phone'),
    value: props.patient.phone,
    actions: [
      { icon: 'chat', onClick: onActionSms, href: 'sms:*' },
      { icon: 'call', onClick: onActionCall, href: 'tel:*' },
    ],
  },
  {
    label: i18n.t('patients.sex'),
    value: i18n.t(`patients.${props.patient.sex}`),
  },
  {
    label: i18n.t('patients.dateOfBirth'),
    value: `${dateOfBirthFormatted} (${age} ${i18n.t('patients.yearsOld')})`,
  },
  {
    type: FieldType.TITLE,
    label: i18n.t('patients.emergencyContactSectionLabel'),
    visible: isContactEmergencyDefined,
  },
  {
    visible: Utils.isStringDefined(props.patient?.contactsEmergency[0]?.phone),
    label: props.patient.contactsEmergency[0]?.name,
    value: props.patient.contactsEmergency[0]?.phone,
    actions: [{ icon: 'call', onClick: onActionCall, href: 'tel:*' }],
  },
  {
    visible: Utils.isStringDefined(props.patient?.contactsEmergency[1]?.phone),
    label: props.patient.contactsEmergency[1]?.name,
    value: props.patient.contactsEmergency[1]?.phone,
    actions: [{ icon: 'call', onClick: onActionCall, href: 'tel:*' }],
  },
];

const onClose = () => {
  emit('evClose');
};

const onDelete = () => {
  emit('evDelete', patient.value);
};

const onEdit = () => {
  emit('evEdit', patient);
};
</script>
<style lang="scss" scoped>
.container-patient-information {
  width: 85%;
  border-radius: 10px;
  padding: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: $background-2;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
}

.container-patient-information-content {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.container-patient-information-bottom {
  width: 100%;
  display: flex;
  padding-top: 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .q-btn {
    margin: 0.1rem;
  }
}

.patient-information-field {
  margin-top: 0.2rem;
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: space-between;
}

.patient-information-field-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.q-field {
  width: 100%;
}

.title-div {
  width: 100%;
  margin-top: 0.5rem;
  // margin-bottom: -1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.title-span {
  align-self: center;
  font-size: 1rem;
  font-style: bold;
}

.q-input {
  width: 100%;
}
</style>
