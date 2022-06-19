<template>
  <div class="container-company-settings">
    <div class="container-lists" v-if="isAssociate">
      <collegues-list
        title="Associates"
        class="collegues-list"
        :collegues="colleguesAssociate"
        @ev-add-collegue="onAddCollegue(UserObject.Type.ASSOCIATE)"
        @ev-collegue-click="onCollegueClick"
      />
      <collegues-list
        title="Substitutes"
        class="collegues-list"
        :collegues="colleguesSubstitute"
        @ev-add-collegue="onAddCollegue(UserObject.Type.SUBSTITUTE)"
        @ev-collegue-click="onCollegueClick"
      />
    </div>
    <div class="container-subsitute" v-else>
      <h4>Sorry, this page is for Associates only</h4>
    </div>
    <q-dialog v-model="isAddUserModalOpen">
      <add-user @ev-cancel="onAddUserCancel" @ev-submit="onAddUserSubmit" />
    </q-dialog>
    <q-dialog v-model="isViewCollegueModalOpen">
      <UserInformation
        :user="(collegueToDisplay as User)"
        @evClose="onViewCollegueModalClose"
      />
    </q-dialog>
  </div>
</template>

<script lang="ts" setup>
import { UserService } from 'src/api/user.service';
import UserInformation from 'src/components/contacts/UserInformation.vue';
import AddUser from 'src/components/settings/AddUser.vue';
import ColleguesList from 'src/components/settings/ColleguesList.vue';
import { User, UserObject } from 'src/interfaces/entities/user';
import { useCompanyStore } from 'src/stores/company/company.store';
import { useUserStore } from 'src/stores/user/user.store';
import { computed, onMounted, ref } from 'vue';

const userStore = useUserStore();
const company = computed(() => useCompanyStore().get);
const collegues = computed(() => useUserStore().getCollegues);

onMounted(async () => {
  const colleguesFetched = await UserService.findManyByCompany(company.value);
  useUserStore().setCollegues(colleguesFetched);
});

const isAssociate = userStore.getMe?.type === UserObject.Type.ASSOCIATE;
const isAddUserModalOpen = ref(false);
const isViewCollegueModalOpen = ref(false);
const collegueToDisplay = ref(null);
const addUserType = ref(null);

const colleguesAssociate = computed(() => {
  return collegues?.value?.filter(
    (collegue) => collegue.type === UserObject.Type.ASSOCIATE
  );
});

const colleguesSubstitute = computed(() => {
  return collegues?.value?.filter(
    (collegue) => collegue.type === UserObject.Type.SUBSTITUTE
  );
});

const onAddCollegue = (type: UserObject.Type) => {
  isAddUserModalOpen.value = true;
  addUserType.value = type;
};

const onAddUserCancel = () => {
  isAddUserModalOpen.value = false;
};

const onAddUserSubmit = (user: User) => {
  const userWithType = { ...user, type: addUserType };

  userStore.addCollegue(userWithType);
  isAddUserModalOpen.value = false;
};

const onViewCollegueModalClose = () => {
  isViewCollegueModalOpen.value = false;
};

const onCollegueClick = (user) => {
  isViewCollegueModalOpen.value = true;
  collegueToDisplay.value = user;
};
</script>

<style lang="scss" scoped>
.container-company-settings {
  height: 100%;
  width: 100%;
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container-subsitute {
  text-align: center;
}

.container-lists {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.title-span {
  font-size: 1.2rem;
  font-weight: bold;
}

.collegues-list {
  margin-bottom: 10%;
}
</style>
