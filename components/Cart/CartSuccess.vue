<template>
  <div :class="$style['cart-success']">
    <img :src="require('~/assets/img/ok.jpg')" alt="">
    <div :class="$style['cart-success__title']">Заявка успешно отправлена</div>
    Вскоре наш менеджер свяжется с Вами
  </div>
</template>

<style lang="scss" module>
.cart-success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: 1rem;
  color: $grey;
  text-align: center;
}
.cart-success__title {
  font-size: 1.5rem;
  margin: 1em 0 2px;
  color: $black;
}
</style>
