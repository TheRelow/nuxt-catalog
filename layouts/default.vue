<template>
  <div id="default-layout">
    <header-comp></header-comp>
    <main class="main wrapper">
      <Nuxt />
    </main>
    <CartPopup v-if="isCartOpened"></CartPopup>
  </div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp'
import CartPopup from '@/components/Cart/CartPopup'

export default {
  components: {
    HeaderComp, CartPopup
  },
  computed: {
    isCartOpened() {
      return this.$store.getters["main/isCartOpened"]
    }
  }
}
</script>

<style lang="scss">
.main {
  margin-top: 98px;
}
</style>
