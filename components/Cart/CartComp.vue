<template>
  <div class="cart">
    <div class="h1 cart__title">Корзина</div>
    <CartEmpty v-if="isEmpty"></CartEmpty>
    <CartList v-if="!isEmpty"></CartList>
    <CartForm v-if="!isEmpty"></CartForm>
  </div>
</template>

<script>
import CartEmpty from "@/components/Cart/CartEmpty";
import CartList from "@/components/Cart/CartList";
import CartForm from "@/components/Cart/CartForm";
import CartComp from "@/components/Cart/CartComp";

export default {
  computed: {
    isEmpty() {
      if (this.$store.getters["main/getCartCount"] > 0) {
        return false
      }
      return true
    }
  },
  components: {
    CartEmpty, CartList, CartForm, CartComp
  }
}
</script>

<style lang="scss">
@import "~assets/styles/_mixins.scss";
@import "~assets/styles/_vars.scss";
.cart__title {
  margin-bottom: 24px;
}
</style>
