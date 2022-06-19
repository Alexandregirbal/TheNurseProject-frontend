<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>
<script setup lang="ts">
window.addEventListener('beforeinstallprompt', (event: Event) => {
  // event.preventDefault();
  // const deferredPrompt = event;
  console.log('beforeinstallprompt event was fired', event);
  // cordova.InAppBrowser.open;
});
</script>
