<template>
  <div>
    <p>
      Пока что вы ничего не добавили в корзину.
    </p>
    <base-btn @click="toggleCart">Перейти к выбору</base-btn>
  </div>
</template>

<script>
export default {
  methods: {
    toggleCart() {
      this.$router.push({ path: '/catalog' })
      this.$store.commit('main/toggleCart')
    }
  }
}
</script>
