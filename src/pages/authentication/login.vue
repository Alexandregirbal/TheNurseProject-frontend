<script lang="ts" setup>
import { useQuasar } from 'quasar';
import login from 'src/api/authentication/login';
import { useUserStore } from 'src/stores/user/user.store';
import { computed, ComputedRef, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { emailValidator, passwordValidator } from './validators';
import { User } from 'src/interfaces/entities/user';
import { UserService } from 'src/api/user.service';

const userStore = useUserStore();
const $router = useRouter();
const $q = useQuasar();

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');

const isFormValid: ComputedRef<boolean> = computed(() => {
  if (
    emailValidator(email.value) === true &&
    passwordValidator(password.value) === true
  ) {
    return true;
  }
  return false;
});

const onSubmit = async () => {
  $q.loading.show({
    delay: 500,
  });
  const data = await login({
    password: password.value,
    email: email.value,
  });
  $q.loading.hide();
  if (data) {
    if (data.accessToken) {
      userStore.setUserToken(data.accessToken);
      const me: Partial<User> = await UserService.findMe();
      userStore.setMe(me);
      await $router.push('/app');
    } else {
      $q.notify({
        type: 'negative',
        message: `${data.statusCode || ''} ${data.message || 'Unknown error'}`,
      });
    }
  }
};
</script>

<template>
  <q-form @submit="onSubmit">
    <q-input
      filled
      v-model="email"
      :label="$t('auth.email')"
      type="email"
      lazy-rules
      :rules="[emailValidator]"
    ></q-input>

    <q-input
      filled
      v-model="password"
      type="password"
      :label="$t('auth.password')"
      autocomplete="on"
      lazy-rules
      :rules="[passwordValidator]"
    ></q-input>
    <div class="submit-container">
      <q-btn
        :label="$t('auth.register')"
        color="primary"
        outline
        @click="$router.push('/register')"
      />

      <q-btn
        :label="$t('auth.login')"
        type="submit"
        :color="isFormValid ? 'primary' : 'disabled'"
        :disable="!isFormValid"
      />
    </div>
  </q-form>
</template>

<style lang="scss" scoped>
.q-form {
  padding: 1rem;
  .q-input {
    padding: 2rem 5%;
  }
  .submit-container {
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    column-gap: 4%;
  }
}
</style>
