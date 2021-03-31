<template>
  <div class="rating">
    <div class="rating__star"></div>
    {{ rating }}
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      default: '4.5'
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/_mixins.scss";
@import "~assets/styles/_vars.scss";

.rating {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: $yellow;
  font-size: 0.625rem;
}
.rating__star {
  height: 20px;
  width: 20px;
  background-image: url('~assets/img/star.svg');
}
</style>
