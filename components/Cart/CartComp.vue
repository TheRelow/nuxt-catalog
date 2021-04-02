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
    if (!store.getters['main/isModifiedProductList']) {
      await store.dispatch('main/getProductList')
    }
    if (!store.getters['main/isModifiedCategories']) {
      await store.dispatch('main/getCategories')
    }
  },
  data: ()=>({
    isSuccess: false
  }),
  computed: {
    isEmpty() {
      if (this.$store.getters["main/getCartCount"] > 0) {
        return false
      }
      return true
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
@import "~assets/styles/_mixins.scss";
@import "~assets/styles/_vars.scss";
.cart {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.cart__title {
  margin-bottom: 24px;
}
</style>
