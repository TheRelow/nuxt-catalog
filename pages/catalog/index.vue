<template>
  <div>Нет ни одной категории</div>
</template>

<script>
export default {
  async fetch({store, redirect}) {
    if (!store.getters['products/isModifiedCategories']) {
      await store.dispatch('products/getCategories')
    }
    this.categories = store.getters["products/getCategories"]
    console.log(this.categories)
    if (this.categories) {
      for (let i in this.categories) {
        redirect(`/catalog/${i}`)
        return false
      }
    }
  },
}
</script>
