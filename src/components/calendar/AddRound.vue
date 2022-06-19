<template>
  <div class="container-add-round">
    <q-btn
      class="back-button"
      flat
      round
      icon="arrow_back_ios"
      color="primary"
      @click="onBackButtonCLicked"
    />
    <div class="title-div">
      <span class="title-span">
        {{ $t('calendar.roundsListTitle') }}
      </span>
    </div>
    <div class="div-content">
      <q-input dense class="field" v-model="name" label="Name" />
      <div class="validation">
        <q-btn
          label="Valider"
          type="submit"
          color="primary"
          class="validation-button"
          @click="onSubmit"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const i18n = useI18n({ useScope: 'global' });

const emit = defineEmits(['evSubmit', 'evCancel']);

const onSubmit = () => {
  emit('evSubmit', { ...round.value });
};

const onBackButtonCLicked = () => {
  emit('evCancel');
};

const name = ref();

const round = ref({
  name,
});
</script>

<style lang="scss" scoped>
.container-add-round {
  width: 90%;
  height: 100%;

  background-color: $background-2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
}
.div-content {
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $background-2;
}
.field {
  width: 80%;
}

.validation {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 1rem;
}
.validation-button {
  font-size: 1rem;
  width: 40%;
}

.back-button {
  position: absolute;
  left: 12%;
  top: 15%;
}

.title-div {
  text-align: center;
}
.title-span {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
