<template>
  <div id="top-bar">
    <router-link id="home" to="/">Nurse Power</router-link>
    <div class="right">
      <q-btn icon="login" flat to="/login" />
    </div>
  </div>
  <div class="wave">
    <svg
      data-name="Nave wave"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        class="shape-fill"
      ></path>
    </svg>
  </div>
  <div id="landing"><router-view /></div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
#top-bar {
  height: 4rem;
  background-color: $primary;
  padding: 1rem 1rem 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  #home {
    color: $text-light;
    font-size: 1.8rem;
    text-decoration: none;
    transition: all 0.2s ease-out 0s;
    &:hover {
      transform: scale(1.05);
    }
  }

  .q-btn {
    $size: 2rem;
    height: $size;
    width: $size;
    color: $text-light;
  }
}
#landing {
  height: calc(100vh - 7rem);
}

.wave {
  width: 100%;
  overflow: hidden;
  line-height: 0;

  svg {
    display: block;
    width: calc(135% + 1.3px);
    height: 3rem;
  }
  .shape-fill {
    fill: $primary;
  }
}
</style>
