<template>
  <div :class="$style.rating">
    <div :class="$style.rating__star"></div>
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

<style lang="scss" module>

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
