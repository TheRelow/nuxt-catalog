<template>
  <div class="cart-overlay">
    <div class="cart-overlay__content">
      <CartComp></CartComp>
      <button class="cart-overlay__close" @click="toggleCart"></button>
    </div>
  </div>
</template>

<script>
import CartComp from "@/components/Cart/CartComp";

export default {
  components: {
    CartComp
  },
  methods: {
    toggleCart() {
      this.$store.commit('main/toggleCart')
    }
  },
}
</script>

<style lang="scss">
@import "~assets/styles/_mixins.scss";
@import "~assets/styles/_vars.scss";
.cart-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 150;
  background-color: rgba(255,255,255, 0.8);
}
.cart-overlay__content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 460px;
  padding: 52px 48px;
  background-color: $white;
  box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px 0 0 8px;
  overflow: auto;
}
.cart-overlay__close {
  position: absolute;
  top: 60px;
  right: 48px;
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  background-image: url('~assets/img/close-cart.svg');
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}
</style>
