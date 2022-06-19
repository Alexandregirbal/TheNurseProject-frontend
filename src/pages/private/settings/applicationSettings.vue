<script lang="ts" setup>
import { languageOptions } from 'src/i18n';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n({ useScope: 'global' });
</script>

<template>
  <div class="content">
    <q-select
      label="Language"
      v-model="locale"
      :options="languageOptions"
      color="primary"
      dense
      emit-value
      map-options
      options-dense
      hide-dropdown-icon
      item-aligned
      class="language-select"
    />
  </div>
</template>
<style lang="scss" scoped></style>
