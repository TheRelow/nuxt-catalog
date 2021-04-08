<template>
  <div :class="$style['cart__item']">
    <div :class="$style['cart__item-img']">
      <img :data-src="imgDomain + productData.photo" alt="" v-if="productData" v-lazy-load>
    </div>
    <div :class="$style['cart__item-info']">
      <div :class="$style['cart__item-info-top']">
        <div :class="$style['cart__item-title']">
          {{ productData.name }}
        </div>
        <div :class="$style['cart__item-price']">
          {{ productData.price | currency }}
        </div>
      </div>
      <RatingComp :rating="productData.rating"></RatingComp>
      <button :class="$style['cart__item-trash']" @click="removeFromCart">

      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data: ()=>({
    imgDomain: 'https://frontend-test.idaproject.com'
  }),
  computed: {
    productData() {
      return this.$store.getters["products/getProductById"](this.value.id)
    }
  },
  methods: {
    removeFromCart() {
      this.$store.commit('products/removeFromCart', this.value.id)
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" module>
.cart__item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 120px;
  margin-bottom: 12px;
  padding: 15px 25px 12px;
  background: #FFFFFF;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  font-size: 0.875rem;
}
.cart__item-img {
  width: 75px;
  img {
    max-height: 100%;
  }
}
.cart__item-title {
  color: $grey;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.cart__item-price {
  margin-top: 6px;
  font-weight: 700;
}
.cart__item-info {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 105px);
  padding-right: 48px;
}
.cart__item-trash {
  position: absolute;
  top: calc(50% - 16px);
  right: 0;
  height: 32px;
  width: 32px;
  border: none;
  background-color: transparent;
  background-image: url('~assets/img/trash-cart.svg');
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}
</style>
