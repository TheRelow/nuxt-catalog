<template>
  <div :class="$style['card-list']">
    <CardComp v-for="(product, index) in sortedCategoryProducts" :key="`${index}_${product.id}_${product.name}`" :value="{product, index}"></CardComp>
  </div>
</template>

<script>
import CardComp from '~/components/CardComp'
export default {
  components: {CardComp},
  data: ()=>({
  }),
  computed: {
    categoryProducts() {
      return this.$store.getters["products/getProductsByCategoryId"](this.$route.params.id)
    },
    sortedCategoryProducts() {
      if (this.categoryProducts && this.sortBy == 'цене') {
        return this.sortByPrice()
      } else if (this.categoryProducts && this.sortBy == 'популярности') {
        return this.sortByRating()
      } else {
        return this.categoryProducts
      }
    },
    sortBy() {
      return this.$store.getters["main/getSortBy"]
    }
  },
  methods: {
    sortByPrice() {
      let result = this.categoryProducts.slice(0)
      result.sort((a, b) => a.price > b.price ? 1 : -1);
      return result
    },
    sortByRating() {
      let result = this.categoryProducts.slice(0)
      result.sort((a, b) => b.rating > a.rating ? 1 : -1);
      return result
    },
  }
}
</script>

<style lang="scss" module>
.card-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: -8px -8px 24px;
}
</style>
