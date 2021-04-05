<template>
  <div>index</div>
</template>

<script>
export default {
  async fetch({store}) {
    if (!store.getters['products/isModifiedCategories']) {
      await store.dispatch('products/getCategories')
    }
  },
  middleware({redirect}) {
    return redirect('/catalog/1')
  },
  computed: {
    categories() {
      return this.$store.getters["products/getCategories"]
    }
  }
}
</script>
