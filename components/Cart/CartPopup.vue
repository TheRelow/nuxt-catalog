<template>
  <div :class="{[$style['cart-overlay']]: true, [$style['cart-overlay_active']]: isCartOpened}">
    <div :class="$style['cart-overlay__bg']" @click="toggleCart">
    </div>
    <div :class="$style['cart-overlay__content']">
      <CartComp></CartComp>
      <button :class="$style['cart-overlay__close']" @click="toggleCart"></button>
    </div>
  </div>
</template>

<script>
import CartComp from "@/components/Cart/CartComp";

export default {
  components: {
    CartComp
  },
  computed: {
    isCartOpened() {
      return this.$store.getters["main/isCartOpened"]
    }
  },
  watch: {
    isCartOpened(val) {
      if (val == true) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'visible'
      }
    }
  },
  methods: {
    toggleCart() {
      this.$store.commit('main/toggleCart')
    }
  },
}
</script>

<style lang="scss" module>
.cart-overlay__bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255,255,255, 0);
  transition: background-color 0.4s;
  content: '';
}
.cart-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 150;
  pointer-events: none;
  &_active {
    pointer-events: all;
    .cart-overlay__bg {
      background-color: rgba(255,255,255, 0.8);
    }
  }
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
  transform: translateX(100%);
  transition: transform 0.4s;
  @include _600 {
    width: 100%;
    border-radius: 0;
  }
  @include _440 {
    padding: 20px;
  }
}
.cart-overlay_active {
  .cart-overlay__content {
    transform: translateX(0);
  }
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
  @include _600 {
    top: 20px;
    right: 20px;
  }
}
</style>
