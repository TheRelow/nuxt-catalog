<template>
  <div class="catalog">
    <div class="catalog__heading">
      <h1>Каталог</h1>
    </div>
    <div class="catalog__content">
      <div class="catalog__side">
        <div class="catalog__categories">
          <nuxt-link v-for="(item, index) of categories" :to="`/catalog/${index}`" class="catalog__category link">
            {{ item }}
          </nuxt-link>
        </div>
      </div>
      <div class="catalog__main">
        <Nuxt :key="$route.path" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  transition: 'slide-bottom',
  async fetch({store}) {
    if (!store.getters['main/isModifiedProductList']) {
      await store.dispatch('main/getProductList')
    }
    if (!store.getters['main/isModifiedCategories']) {
      await store.dispatch('main/getCategories')
    }
  },
  data: ()=>({
  }),
  computed: {
    categories() {
      return this.$store.getters["main/getCategories"]
    }
  },
  async mounted() {
    console.log(await this.$store.dispatch('main/getProductList'));
  }
}
</script>

<style lang="scss">

@import "~assets/styles/_mixins.scss";
@import "~assets/styles/_vars.scss";
.catalog__heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.catalog__content {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}
.catalog__side {
  position: relative;
  width: calc(100% / 16 * 2 - 16px);
}
.catalog__main {
  width: calc(100% / 16 * 14);
}
.catalog__categories {
  position: sticky;
  top: 86px;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.catalog__category {
  margin-bottom: 16px;
}
</style>
