<template>
  <div id="default-layout" class="page">
    <header-comp></header-comp>
    <main :class="{[$style.main]: true, 'wrapper': true}">
      <Nuxt />
    </main>
    <CartPopup></CartPopup>
  </div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp'
import CartPopup from '@/components/Cart/CartPopup'

export default {
  components: {
    HeaderComp, CartPopup
  },
  async mounted() {
    if (!this.$store.getters['main/isLsChecked']) {
      await this.$store.commit('main/checkLocalStorageCart')
    }
  }
}
</script>

<style lang="scss" module>
.main {
  margin-top: 98px;
}
</style>
