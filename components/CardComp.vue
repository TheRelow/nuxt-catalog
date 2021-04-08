<template>
  <div :class="$style.card">
    <div :class="$style['card__top']">
      <div :class="$style['card__img']">
        <img :data-src="imgDomain + productData.photo" alt="" v-if="productData" v-lazy-load>
      </div>
      <div :class="$style['card__title']">
        {{ productData.name }}
      </div>
    </div>
    <div :class="$style['card__price']">
      {{ productData.price | currency }}
    </div>
    <button :class="{[$style['card__add-to-cart']]: true, [$style.active]: isProductInCart}" @click="addToCart"></button>
    <RatingComp :class="$style['card__rating']" :rating="productData.rating"></RatingComp>
  </div>
</template>

<script>
import RatingComp from "@/components/RatingComp";
export default {
  props: ['value'],
  data: ()=>({
    imgDomain: 'https://frontend-test.idaproject.com'
  }),
  components: { RatingComp },
  computed: {
    productData() {
      return this.$store.getters["products/getProductById"](this.value.id)
    },
    isProductInCart() {
      return this.$store.getters["products/isProductInCart"](this.value.id)
    }
  },
  methods: {
    addToCart() {
      this.$store.commit('products/addToCart', this.value.id)
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" module>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @include col(4);
  margin: 8px;
  max-height: 282px;
  padding: 16px;
  border-radius: 8px;
  background-color: $white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  font-size: 0.875rem;
  color: $grey;
  @include _1024 {
    @include col(3)
  }
  @include _850 {
    @include col(2)
  }
  @include _440 {
    width: 100%;
  }
}
.card__rating {
  position: absolute;
  top: 16px;
  left: 16px;
}
.card__img {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  img {
    max-height: 100%;
    max-width: 100%;
    transition: transform 0.4s;
  }
}
.card {
  &:hover {
    .card__img {
      img {
        transform: scale(1.05);
      }
    }
  }
}
.card__title {
  max-height: 32px;
  margin-top: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.card__price {
  margin-top: 6px;
  color: $black;
  font-weight: 700;
}
.card__add-to-cart {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  background-image: url('~assets/img/cart-sm.svg');
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  outline: none;
  &:hover, &.active {
    background-image: url('~assets/img/cart-sm-hover.svg');
  }
}
</style>
