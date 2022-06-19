<script lang="ts" setup>
import { useQuasar } from 'quasar';
import register from 'src/api/authentication/register';
import { useUserStore } from 'src/stores/user/user.store';
import { computed, ComputedRef, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
// import { USER_GETTERS } from 'src/store/user/getters';
import { emailValidator, nameValidator, passwordValidator } from './validators';
import { User } from 'src/interfaces/entities/user';
import { UserService } from 'src/api/user.service';

// import { USER_ACTIONS } from 'src/store/user/actions';
// import register from 'src/api/authentication/register';
const $router = useRouter();
const $q = useQuasar();
const userStore = useUserStore();

const email: Ref<string> = ref('');
const firstName: Ref<string> = ref('');
const lastName: Ref<string> = ref('');
const password: Ref<string> = ref('');
const passwordVerification: Ref<string> = ref('');

const isFormValid: ComputedRef<boolean> = computed(() => {
  if (
    emailValidator(email.value) === true &&
    passwordValidator(password.value) === true &&
    passwordValidator(passwordVerification.value) === true &&
    password.value === passwordVerification.value
  ) {
    return true;
  }
  return false;
});

const onSubmit = async () => {
  $q.loading.show({
    delay: 500,
  });
  const data = await register({
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value,
    password: password.value,
  });
  $q.loading.hide();
  if (data) {
    if (data.accessToken) {
      userStore.setUserToken(data.accessToken);
      const me: Partial<User> = await UserService.findMe();
      userStore.setMe(me);
      await $router.push('/app?justRegister=true');
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
      autocomplete="on"
      lazy-rules
      :rules="[emailValidator]"
    />
    <q-input
      filled
      v-model="firstName"
      :label="$t('auth.firstName')"
      type="text"
      autocomplete="on"
      lazy-rules
      :rules="[nameValidator]"
    />
    <q-input
      filled
      v-model="lastName"
      :label="$t('auth.lastName')"
      type="text"
      autocomplete="on"
      lazy-rules
      :rules="[nameValidator]"
    />

    <q-input
      filled
      v-model="password"
      type="password"
      :label="$t('auth.password')"
      autocomplete="off"
      lazy-rules
      :rules="[passwordValidator]"
    />
    <q-input
      filled
      v-model="passwordVerification"
      type="password"
      :label="$t('auth.passwordVerification')"
      autocomplete="off"
      lazy-rules
      :rules="[
        passwordValidator,
        (val: string) => (val === password) || 'Passwords are not marching',
      ]"
    />
    <div class="submit-container">
      <q-btn
        :label="$t('general.cancel')"
        outline
        color="secondary"
        @click="$router.back()"
      ></q-btn>
      <q-btn
        :label="$t('auth.register')"
        type="submit"
        :color="'primary'"
        :disable="!isFormValid"
      />
    </div>
  </q-form>
</template>

<style lang="scss" scoped>
.q-form {
  padding: 0 1rem;
  .q-input {
    padding: 1rem 5%;
  }
  .submit-container {
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    column-gap: 4%;
  }
}
</style>
