<template>
  <q-dialog v-model="show" class="spinner">
    <q-spinner-facebook color="primary" size="4rem" />
  </q-dialog>
</template>
<script lang="ts" setup>
const show = true;
</script>
<style lang="scss" scoped>
.spinner {
  position: fixed;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 4rem;
  height: 4rem;
  z-index: 999;
}
</style>
