<template>
  <header :class="$style.header">
    <div :class="{[$style['header__inner']]: true, 'wrapper': true}">
      <nuxt-link to="/" :class="$style['header__logo']">TestList</nuxt-link>
      <button :class="$style['header__cart']" @click="toggleCart">
        <span :class="$style['header__cart-pin']" v-if="cartCount">{{cartCount}}</span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    cartCount() {
      return this.$store.getters["products/getCartCount"]
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
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  height: 66px;
  background-color: $white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
}
.header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header__logo {
  font-weight: 700;
  font-size: 1.375rem;
  color: $grey;
}
.header__cart {
  position: relative;
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  background-image: url('~assets/img/cart.svg');
  cursor: pointer;
}
.header__cart-pin {
  position: absolute;
  top: -1px;
  right: -2px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  font-size: 0.5rem;
  line-height: 1.29375em;
  background-color: $grey-light;
  color: $white;
}
</style>
