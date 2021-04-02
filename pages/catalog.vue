<template>
  <div :class="$style.catalog">
    <div :class="$style['catalog__heading']">
      <h1>Каталог</h1>
    </div>
    <div :class="$style['catalog__content']">
      <div :class="$style['catalog__side']">
        <div :class="$style['catalog__categories']">
          <nuxt-link v-for="(item, index) of categories" :key="index" :to="`/catalog/${index}`" :active-class="$style['_active-link'] + ' _active-link'" :class="{[$style['catalog__category']]: true, 'link': true}">
            {{ item }}
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
  }
}
</script>

<style lang="scss" module>

@import "~assets/styles/_mixins.scss";
@import "~assets/styles/_vars.scss";
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
  display: inline-block;
  margin-bottom: 16px;
  &:after {
    @include pseudo();
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: currentColor;
    transition: transform .25s ease;
    transform-origin: right;
    transform: scaleX(0);
  }
  &._active-link {
    &:after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
  @include _1024 {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>
