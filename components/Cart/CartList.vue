<template>
  <div :class="$style['cart__list']">
    <base-subtitle>Товары в корзине</base-subtitle>
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
      return this.$store.getters["products/getCartItems"]
    }
  }
}
</script>

<style lang="scss" module>
.cart__list {
  margin-bottom: 32px;
}
</style>
