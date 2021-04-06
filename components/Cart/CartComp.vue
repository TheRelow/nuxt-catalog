<template>
  <div :class="$style.cart">
    <div :class="{h1: true, [$style['cart__title']]: true}">Корзина</div>
    <CartEmpty v-if="isEmpty && !isSuccess"></CartEmpty>
    <CartList v-if="!isEmpty && !isSuccess"></CartList>
    <CartForm v-if="!isEmpty && !isSuccess" @success="success"></CartForm>
    <CartSuccess v-if="isSuccess"></CartSuccess>
  </div>
</template>

<script>
import CartEmpty from "@/components/Cart/CartEmpty";
import CartList from "@/components/Cart/CartList";
import CartForm from "@/components/Cart/CartForm";
import CartComp from "@/components/Cart/CartComp";
import CartSuccess from "@/components/Cart/CartSuccess";

export default {
  async fetch({store}) {
    if (!store.getters['products/isModifiedProductList']) {
      await store.dispatch('products/getProductList')
    }
    if (!store.getters['products/isModifiedCategories']) {
      await store.dispatch('products/getCategories')
    }
  },
  data: ()=>({
    isSuccess: false
  }),
  computed: {
    isEmpty() {
      if (this.$store.getters["products/getCartCount"] > 0) {
        return false
      }
      return true
    },
    isCartOpened() {
      return this.$store.getters["main/isCartOpened"]
    }
  },
  watch: {
    isCartOpened() {
      this.isSuccess = false
    }
  },
  components: {
    CartEmpty, CartList, CartForm, CartComp, CartSuccess
  },
  methods: {
    success() {
      this.isSuccess = true
    }
  }
}
</script>

<style lang="scss" module>
.cart {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.cart__title {
  margin-bottom: 24px;
}
</style>
