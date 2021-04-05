<template>
  <div>index</div>
</template>

<script>
export default {
  async fetch({store}) {
    if (!store.getters['products/isModifiedCategories']) {
      this.categories = await store.dispatch('products/getCategories')
    }
  },
  async middleware({redirect, store}) {
    console.log(this.categories)
    // return redirect('/catalog/1')
  },
}
</script>
