<template>
  <div class="card-list">
    <CardComp v-for="(id, index) in categoryProducts" :key="id.name" :value="{id, index}"></CardComp>
    <CardComp :empty="true"></CardComp>
    <CardComp :empty="true"></CardComp>
    <CardComp :empty="true"></CardComp>
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
      return this.$store.getters["main/getProductsByCategoryId"](this.$route.params.id)
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/_mixins.scss";
@import "~assets/styles/_vars.scss";
.card-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
