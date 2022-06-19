<template>
  <div class="container-confirm-modal">
    <span class="title">{{ props.title }}</span>
    <div class="validation">
      <q-btn
        label="Annuler"
        type="reset"
        @click="onCancel"
        color="secondary"
        outline
        class="q-ml-sm"
      />
      <q-btn
        label="Confirmer"
        type="submit"
        color="primary"
        @click="onConfirm"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['evConfirm', 'evCancel']);

interface ConfirmModalProps {
  title: string;
}
const props = withDefaults(defineProps<ConfirmModalProps>(), {
  title: 'Are you sure ?',
});

const onCancel = () => {
  emit('evCancel');
};

const onConfirm = () => {
  emit('evConfirm');
};
</script>

<style lang="scss" scoped>
.container-confirm-modal {
  width: 90%;
  // height: 20%;
  border-radius: 10px;
  padding: 1.5rem;
  background-color: $background-2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
}

.title {
  font-size: 1rem;
  text-align: center;
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
