<template>
  <div>
    <nuxt-link to="/catalog/1">catalog</nuxt-link>
  </div>
</template>

<script>
export default {
  transition: 'slide-bottom',
  // middleware({redirect }) {
  //   return redirect('/catalog/1')
  // }
}
</script>
