<template id="authenticated-layout">
  <TopBar />
  <div id="main-content"><router-view /></div>
  <BottomBar />
</template>

<script lang="ts" setup>
import BottomBar from './BottomBar.vue';
import TopBar from './TopBar.vue';
</script>

<style lang="scss" scoped>
#main-content {
  height: calc(100% - 8rem);
}
</style>
