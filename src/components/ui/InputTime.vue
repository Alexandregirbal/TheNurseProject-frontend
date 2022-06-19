<template>
  <q-input
    dense
    outlined
    v-model="model"
    @update:model-value="onChange"
    mask="time"
    :label="props.label"
  >
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time v-model="model">
            <div class="row items-center justify-end">
              <q-btn
                v-close-popup
                label="Close"
                color="primary"
                flat
                @click="onChange"
              />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';

interface InputTimeProps {
  value: string;
  label: string;
}

const emit = defineEmits(['evChange']);
const props = withDefaults(defineProps<InputTimeProps>(), {
  value: null,
  label: '',
});

const model = ref(props.value);

const onChange = () => {
  emit('evChange', model.value);
};

// watchEffect(() => {
//   model.value = props.value;
// });

watch(props, (newProps) => {
  model.value = newProps.value;
});
</script>
