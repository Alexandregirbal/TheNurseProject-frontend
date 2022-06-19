<script lang="ts" setup></script>

<template>
  <q-btn-group id="select-settings-group" push spread>
    <q-btn
      to="/app/settings"
      :color="
        currentRouteIncludes(RoutesDetails.profileSettings) ? 'primary' : ''
      "
      :text-color="
        currentRouteIncludes(RoutesDetails.profileSettings)
          ? 'text-light'
          : 'text-dark'
      "
      stack
      push
      label="Profile"
      icon="account_box"
    />
    <q-btn
      to="/app/settings/company"
      :color="
        currentRouteIncludes(RoutesDetails.companySettings) ? 'primary' : ''
      "
      :text-color="
        currentRouteIncludes(RoutesDetails.companySettings)
          ? 'text-light'
          : 'text-dark'
      "
      stack
      push
      label="Company"
      icon="business"
    />
    <q-btn
      to="/app/settings/application"
      :color="
        currentRouteIncludes(RoutesDetails.applicationSettings) ? 'primary' : ''
      "
      :text-color="
        currentRouteIncludes(RoutesDetails.applicationSettings)
          ? 'text-light'
          : 'text-dark'
      "
      stack
      push
      label="Application"
      icon="app_settings_alt"
    />
  </q-btn-group>
  <router-view />
</template>
<script lang="ts" setup>
import { RoutesDetails } from 'src/router/objects';
import { currentRouteIncludes } from 'src/router/utils';
</script>
<style lang="scss" scoped>
#select-settings-group {
  margin: 0 1rem;
}
</style>
