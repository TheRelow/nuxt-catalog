<template>
  <div class="subtitle"><slot></slot></div>
</template>

<style lang="scss">
@import "~assets/styles/_mixins.scss";
@import "~assets/styles/_vars.scss";
.subtitle {
  margin-bottom: 16px;
  color: $grey;
}
</style>
