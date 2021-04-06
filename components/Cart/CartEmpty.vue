<template>
  <div>
    <p :class="$style.empty">
      Пока что вы ничего не добавили в корзину.
    </p>
    <base-btn @click="toggleCart">Перейти к выбору</base-btn>
  </div>
</template>

<script>
export default {
  methods: {
    toggleCart() {
      console.log()
      if (this.$route.name !== 'catalog-id') {
        this.$router.push({ path: '/catalog' })
      }
      this.$store.commit('main/toggleCart')
    }
  }
}
</script>

<style lang="scss" module>
.empty {
  margin: 0 0 1.1em;
  font-size: 1.375rem;
}
</style>
