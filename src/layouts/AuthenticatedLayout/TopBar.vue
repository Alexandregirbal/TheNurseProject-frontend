<script lang="ts" setup>
import { RoutesDetails } from 'src/router/objects';
import {
  currentRouteIncludes,
  getTranslationFromRouteName,
} from 'src/router/utils';
</script>

<template>
  <div id="top-bar">
    <!-- <div class="logo">Logo</div> -->
    <div class="logo">
      <q-icon name="img:icons/favicon-128x128.png" size="2.5rem" />
    </div>
    <div class="title">
      {{ $t(getTranslationFromRouteName($route.name!.toString(), 'title')) }}
    </div>
    <div>
      <q-btn
        to="/app/settings"
        flat
        :icon="
          currentRouteIncludes(RoutesDetails.settings)
            ? 'settings'
            : 'o_settings'
        "
        :color="
          currentRouteIncludes(RoutesDetails.settings) ? 'primary' : 'disabled'
        "
      />
    </div>
  </div>
</template>

<style lang="scss">
#top-bar {
  height: 4rem;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;

  * {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    img {
      height: 2.5rem;
      width: auto;
    }
  }

  .title {
    font-size: 2rem;
  }

  .q-btn {
    font-size: 1.5rem;
    color: $primary;
    border-radius: 50%;
  }
}
</style>
