<template>
  <div>
    <div class="content" v-if="!isEditing">
      <my-information />
      <div class="row">
        <q-btn
          class="col-2 offset-2"
          flat
          round
          color="disabled"
          icon="edit"
          @click="onEdit"
        />
        <q-btn class="col-4" @click="logout()" color="secondary">Logout</q-btn>
      </div>
    </div>
    <div class="content" v-else>
      <edit-my-information
        @ev-cancel="onCancelEdit"
        @ev-submit="onSubmitEdit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import EditMyInformation from 'src/components/settings/EditMyInformation.vue';
import MyInformation from 'src/components/settings/MyInformation.vue';
import { User } from 'src/interfaces/entities/user';
import { useUserStore } from 'src/stores/user/user.store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const $router = useRouter();
const userStore = useUserStore();

const isEditing = ref(false);

const onEdit = () => {
  isEditing.value = true;
};

const logout = async () => {
  userStore.resetUserToken();
  userStore.resetMe();
  await $router.push('/');
};

const onCancelEdit = () => {
  isEditing.value = false;
};

const onSubmitEdit = (userUpdated: User) => {
  isEditing.value = false;
  userStore.setMe(userUpdated);
};
</script>

<style lang="scss" scoped>
.content {
  padding: 1rem;
  text-align: center;
}

.content-bottom {
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
</style>
