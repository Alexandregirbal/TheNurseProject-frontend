<template>
  <div id="bottom-bar">
    <q-btn
      to="/app/contacts"
      flat
      :icon="
        currentRouteIncludes(RoutesDetails.contacts)
          ? 'perm_contact_calendar'
          : 'o_perm_contact_calendar'
      "
      :color="
        currentRouteIncludes(RoutesDetails.contacts) ? 'primary' : 'disabled'
      "
    />
    <q-btn
      to="/app"
      flat
      :icon="currentRouteIncludes(RoutesDetails.home) ? 'home' : 'o_home'"
      :color="currentRouteIncludes(RoutesDetails.home) ? 'primary' : 'disabled'"
    />
    <q-btn
      to="/app/calendar"
      :icon="
        currentRouteIncludes(RoutesDetails.calendar)
          ? 'date_range'
          : 'o_date_range'
      "
      flat
      :color="
        currentRouteIncludes(RoutesDetails.calendar) ? 'primary' : 'disabled'
      "
    />
  </div>
</template>

<script lang="ts" setup>
import { RoutesDetails } from 'src/router/objects';
import { currentRouteIncludes } from 'src/router/utils';
</script>

<style lang="scss" scoped>
#bottom-bar {
  height: 4rem;
  border-top: 1px solid $disabled;
  padding: 0 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.q-btn {
  font-size: 1.5rem;
  color: $primary;
  border-radius: 50%;
}
</style>
