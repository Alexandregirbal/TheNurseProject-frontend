<template>
  <div class="container-create-patient">
    <div class="input">
      <q-input
        dense
        class="field"
        outlined
        v-model="firstName"
        :label="i18n.t('patients.firstName')"
      />
    </div>
    <div class="input">
      <q-input
        dense
        outlined
        v-model="lastName"
        :label="i18n.t('patients.lastName')"
      />
    </div>
    <div class="input">
      <q-input
        dense
        outlined
        v-model="address"
        :label="i18n.t('patients.address')"
      />
    </div>
    <div class="input">
      <q-input
        dense
        outlined
        v-model="phone"
        :label="i18n.t('patients.phone')"
      />
    </div>

    <div class="div-half">
      <q-input
        dense
        class="field-half"
        outlined
        v-model="dateOfBirth"
        mask="##/##/####"
        :label="i18n.t('patients.dateOfBirth')"
      />
      <q-select
        dense
        class="field-half"
        outlined
        v-model="sex"
        :options="sexOptions"
        :label="i18n.t('patients.sex')"
        :behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'"
      />
    </div>
    <span class="emergency-contact-title">{{
      i18n.t('patients.emergencyContactSectionLabel')
    }}</span>
    <div class="div-half">
      <q-input
        dense
        class="field-half"
        outlined
        v-model="contactEmergency1.name"
        :label="i18n.t('patients.firstName')"
      />
      <q-input
        dense
        class="field-half"
        outlined
        v-model="contactEmergency1.phone"
        :label="i18n.t('patients.phone')"
      />
    </div>
    <div class="div-half">
      <q-input
        dense
        class="field-half"
        outlined
        v-model="contactEmergency2.name"
        :label="i18n.t('patients.firstName')"
      />
      <q-input
        dense
        class="field-half"
        outlined
        v-model="contactEmergency2.phone"
        :label="i18n.t('patients.phone')"
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
import { PatientObject } from 'src/interfaces/entities/patient';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const i18n = useI18n({ useScope: 'global' });

const emit = defineEmits(['evSubmit', 'evCancel']);

const onSubmit = () => {
  const dateOfBirthFormatted = date.extractDate(
    dateOfBirth.value,
    'DD/MM/YYYY'
  );

  const patientFormatted = {
    ...patient.value,
    dateOfBirth: dateOfBirthFormatted,
  };
  emit('evSubmit', patientFormatted);
};
const onCancel = () => {
  emit('evCancel');
};

const sexOptions = [
  { label: i18n.t('patients.MAN'), value: PatientObject.Sex.MAN },
  { label: i18n.t('patients.WOMAN'), value: PatientObject.Sex.WOMAN },
];

const contactEmergencyEmpty: PatientObject.ContactEmergency = {
  name: undefined,
  phone: undefined,
};

const firstName = ref('Jeremie');
const lastName = ref('Dumont');
const address = ref('London');
const phone = ref('0635548571');
const sex = ref(sexOptions[0]);
const dateOfBirth = ref('25/07/1998');
const contactEmergency1 = ref({ ...contactEmergencyEmpty });
const contactEmergency2 = ref({ ...contactEmergencyEmpty });

const patient = ref({
  firstName,
  lastName,
  address,
  phone,
  sex: sex.value.value,
  dateOfBirth,
  contactsEmergency: [contactEmergency1.value, contactEmergency2.value],
});
</script>

<style lang="scss" scoped>
.container-create-patient {
  width: 90%;
  height: 80%;
  border-radius: 10px;
  padding: 1rem;
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;

  background-color: $background-2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
}

.title {
  font-size: 2rem;
}
.q-btn {
  font-size: 1.3rem;
}
.input {
  margin-top: 0.5rem;
  width: 100%;
}
.div-half {
  width: 100%;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.emergency-contact-title {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
.field {
  width: 100%;
}

.field-half {
  width: 48%;
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
