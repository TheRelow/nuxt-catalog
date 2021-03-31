<template>
  <div>
    <p>
      Пока что вы ничего не добавили в корзину.
    </p>
    <button class="btn" @click="toggleCart">Перейти к выбору</button>
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
