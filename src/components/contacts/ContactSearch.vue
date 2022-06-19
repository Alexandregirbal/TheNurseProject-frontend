<template>
  <q-input
    outlined
    v-model="searchText"
    dense
    debounce="300"
    @update:model-value="handleSearchTextChange"
  >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const searchText = ref('');
const emit = defineEmits(['evChange']);
const handleSearchTextChange = () => {
  emit('evChange', searchText.value);
};
</script>

<style lang="scss" scoped>
.container-type-picker {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>
