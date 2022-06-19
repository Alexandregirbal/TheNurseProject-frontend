<template>
  <li class="bullet-point">
    <slot></slot>
  </li>
</template>

<style lang="scss" scoped>
li {
  line-height: 1.3rem;
  &::marker {
    font-size: 1.3rem;
  }
}
</style>
