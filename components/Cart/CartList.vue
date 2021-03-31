<template>
  <div class="cart__list">
    <div class="cart__text">
      Товары в корзине
    </div>
    <CartItem v-for="(id, index) in cardProducts" :key="id.name" :value="{id, index}"></CartItem>
  </div>
</template>

<script>
import CartItem from "@/components/Cart/CartItem";

export default {
  components: {
    CartItem
  },
  computed: {
    cardProducts() {
      return this.$store.getters["main/getCartItems"]
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/_mixins.scss";
@import "~assets/styles/_vars.scss";
.cart__text {
  margin-bottom: 16px;
  color: $grey;
}
</style>
