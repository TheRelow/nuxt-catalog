<template>
  <div :class="$style.catalog">
    <div :class="$style['catalog__heading']">
      <h1>Каталог</h1>
    </div>
    <div :class="$style['catalog__content']">
      <div :class="$style['catalog__side']">
        <div :class="$style['catalog__categories']">
          <nuxt-link v-for="(item, index) of categories" :key="index" :to="`/catalog/${index}`" :active-class="$style['_active-link'] + ' _active-link'" :class="{[$style['catalog__category']]: true, 'link': true}">
            <span>{{ item }}</span>
          </nuxt-link>
        </div>
      </div>
      <div :class="$style['catalog__main']">
        <transition name="slide-bottom" mode="out-in">
          <Nuxt :key="$route.path" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  transition: 'slide-bottom',
  async fetch({store}) {
    if (!store.getters['products/isModifiedProductList']) {
      await store.dispatch('products/getProductList')
    }
    if (!store.getters['products/isModifiedCategories']) {
      await store.dispatch('products/getCategories')
    }
  },
  data: ()=>({
  }),
  computed: {
    categories() {
      return this.$store.getters["products/getCategories"]
    }
  }
}
</script>

<style lang="scss" module>
.catalog {

}
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
  flex-wrap: wrap;
}
.catalog__side {
  position: relative;
  width: calc(100% / 16 * 2 - 16px);
  @include _1024 {
    width: 100%;
  }
}
.catalog__main {
  width: calc(100% / 16 * 14);
  @include _1024 {
    width: 100%;
  }
}
.catalog__categories {
  position: sticky;
  top: 86px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
  @include _1024 {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
}
.catalog__category {
  position: relative;
  margin-bottom: 14px;
  span {
    padding-bottom: 4px;
    background-image: linear-gradient(120deg, currentColor 0%, currentColor 100%);
    background-size: 0 1px;
    background-position: 100% 88%;
    background-repeat: no-repeat;
    transition: background-size 0.25s ease;
  }
  &._active-link {
    span {
      background-size: 100% 1px;
      background-position: 0 88%;
    }
  }
  @include _1024 {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>
