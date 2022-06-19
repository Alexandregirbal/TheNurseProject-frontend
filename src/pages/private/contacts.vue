<template>
  <div class="container q-pt-lg">
    <ContactSearch @ev-change="onChangeSearch" />
    <ContactTypePicker @evChange="onChangeType" />
    <ContactList
      :contacts="contactsFiltered"
      :contacts-type="contactsType"
      class="q-pt-sm q-mt-sm"
      @evContactOpened="onContactOpened"
    />
    <div class="container-bottom">
      <q-btn
        v-if="isTypePatient"
        class="button-add"
        color="primary"
        @click="onNewContactClicked"
        >{{ $t('contacts.buttonAdd') }}</q-btn
      >
    </div>
    <q-dialog v-model="contactOpened">
      <PatientInformation
        v-if="isTypePatient"
        :patient="(contactToDisplay as
      Patient)"
        @evClose="onModalClose"
        @evEdit="onEditPatient"
        @evDelete="onDeletePatient"
      />
      <UserInformation
        v-if="isTypeCollegue"
        :user="(contactToDisplay as User)"
        @evClose="onModalClose"
      />
    </q-dialog>
    <q-dialog v-model="displayCreatePatient">
      <CreatePatient @ev-close="onCreateClose" @ev-submit="onCreateSubmit" />
    </q-dialog>
    <q-dialog v-model="displayEditPatient">
      <EditPatient
        :patient="(contactToDisplay as
      Patient)"
        @ev-close="onEditClose"
        @ev-submit="onEditSubmit"
      />
    </q-dialog>
    <q-dialog v-model="displayConfirmDeletePatient">
      <ConfirmModal
        title="Are you sure you want to remove the patient?"
        @ev-cancel="onConfirmDeleteCancel"
        @ev-confirm="onConfirmDeleteConfirm"
      />
    </q-dialog>
    <SpinnerDialog v-if="displaySpinner" />
  </div>
</template>

<script lang="ts" setup>
import { PatientService } from 'src/api/patient.service';
import { UserService } from 'src/api/user.service';
import ContactList from 'src/components/contacts/ContactList.vue';
import ContactSearch from 'src/components/contacts/ContactSearch.vue';
import ContactTypePicker from 'src/components/contacts/ContactTypePicker.vue';
import CreatePatient from 'src/components/contacts/CreatePatient.vue';
import EditPatient from 'src/components/contacts/EditPatient.vue';
import PatientInformation from 'src/components/contacts/PatientInformation.vue';
import UserInformation from 'src/components/contacts/UserInformation.vue';
import ConfirmModal from 'src/components/ui/ConfirmModal.vue';
import SpinnerDialog from 'src/components/ui/SpinnerDialog.vue';
import { Contact, ContactType } from 'src/interfaces/contacts';
import { Patient } from 'src/interfaces/entities/patient';
import { User } from 'src/interfaces/entities/user';
import { useCompanyStore } from 'src/stores/company/company.store';
import { usePatientStore } from 'src/stores/patient/patient.store';
import { useUserStore } from 'src/stores/user/user.store';
import { computed, ComputedRef, onMounted, ref, Ref } from 'vue';

const company = computed(() => useCompanyStore().get);
const patients = computed(() => usePatientStore().getAll);
const collegues = computed(() => useUserStore().getCollegues);
const contactsFiltered: Ref<Partial<Contact>[]> = ref([]);

onMounted(async () => {
  const patientsFetched = await PatientService.findManyOwn();
  const colleguesFetched = await UserService.findManyByCompany(company.value);

  usePatientStore().setAll(patientsFetched);
  useUserStore().setCollegues(colleguesFetched);

  contactsFiltered.value = patients.value;
});

const contactsType = ref(ContactType.PATIENT);

const onChangeType = (type: ContactType) => {
  contactsType.value = type;
  onChangeSearch(currentSearch.value);
};

const onContactOpened = (contact: Contact) => {
  contactToDisplay.value = contact;
  contactOpened.value = true;
};

const onModalClose = () => {
  contactOpened.value = false;
};

const onEditPatient = () => {
  contactOpened.value = false;
  displayEditPatient.value = true;
};

const onDeletePatient = () => {
  contactOpened.value = false;
  displayConfirmDeletePatient.value = true;
};

const onCreateClose = () => {
  displayCreatePatient.value = false;
};

const onEditClose = () => {
  displayEditPatient.value = false;
};

const onConfirmDeleteCancel = () => {
  displayConfirmDeletePatient.value = false;
};

const onConfirmDeleteConfirm = async () => {
  const patient: Patient = { ...(contactToDisplay.value as Patient) };
  displaySpinner.value = true;

  await PatientService.deleteOne(patient).then((patient) => {
    usePatientStore().deleteOne(patient);
  });

  displaySpinner.value = false;
  displayConfirmDeletePatient.value = false;
};

const onCreateSubmit = async (patient: Patient) => {
  await PatientService.createOne(company.value, patient).then((patient) => {
    usePatientStore().add(patient);
  });

  displayCreatePatient.value = false;
};

const onEditSubmit = async (updates: Patient) => {
  const patient: Patient = { ...(contactToDisplay.value as Patient) };
  displaySpinner.value = true;

  await PatientService.updateOne(patient, updates).then((patientUpdated) => {
    usePatientStore().updateOne(patient, patientUpdated);
  });

  displaySpinner.value = false;
  displayEditPatient.value = false;
};

const currentSearch = ref('');

const onNewContactClicked = () => {
  displayCreatePatient.value = true;
};

const onChangeSearch = (search: string) => {
  currentSearch.value = search;

  const contacts: { firstName: string; lastName: string }[] =
    contactsType.value === ContactType.PATIENT
      ? (patients.value as Patient[])
      : (collegues.value as User[]);

  contactsFiltered.value = contacts.filter((contact) => {
    const fullName = contact.firstName + ' ' + contact.lastName;
    return fullName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });
};

const contactOpened: Ref<boolean> = ref(false);
const displayEditPatient: Ref<boolean> = ref(false);
const displayConfirmDeletePatient: Ref<boolean> = ref(false);
const displaySpinner: Ref<boolean> = ref(false);
const contactToDisplay: Ref<Contact> = ref(null);

const isTypePatient: ComputedRef<boolean> = computed(() => {
  return contactsType.value === ContactType.PATIENT;
});

const isTypeCollegue: ComputedRef<boolean> = computed(() => {
  return contactsType.value === ContactType.COLLEGUE;
});

const displayCreatePatient = ref(false);
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}
.container-bottom {
  height: 15%;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-add {
  width: 50%;
}
</style>
