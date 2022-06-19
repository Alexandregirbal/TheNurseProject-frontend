<template>
  <div id="landing-content">
    <h1>NURSE POWER</h1>
    <h2>Alpha</h2>
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
    <div class="content"></div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
#landing-content {
  height: 100%;
  overflow-y: hidden;
}

h1 {
  font-size: 3rem;
  line-height: 4rem;
  font-weight: 400;
  margin: 0;
  display: flex;
  justify-content: center;
}

h2 {
  font-size: 2.6rem;
  line-height: 3rem;
  margin: 0;
  display: flex;
  justify-content: center;
}
.wave {
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotateX(180deg);
  svg {
    display: block;
    width: calc(135% - 1.3px);
    height: 3rem;
  }
  .shape-fill {
    fill: $primary;
  }
}
.content {
  height: 100%;
  background-color: $primary;
}
</style>
