<template>
  <q-input
    dense
    outlined
    v-model="model"
    @update:model-value="onChange"
    mask="date"
    :label="props.label"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            today-btn
            v-model="model"
            @update:model-value="$refs.qDateProxy.hide()"
          >
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface InputTimeProps {
  default: string;
  label: string;
}

const emit = defineEmits(['evChange']);
const props = withDefaults(defineProps<InputTimeProps>(), {
  default: null,
  label: '',
});

const model = ref(props.default);

const onChange = () => {
  emit('evChange', model.value);
};
</script>
