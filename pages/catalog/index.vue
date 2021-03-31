<template>
  <div>index</div>
</template>

<script>
export default {
  middleware({redirect }) {
    return redirect('/catalog/1')
  },
}
</script>
