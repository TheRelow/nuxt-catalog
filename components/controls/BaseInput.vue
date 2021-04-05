<template>
  <input class="input" type="text" v-model="input" ref="input">
</template>

<script>
import IMask from 'imask'

export default {
  props: ['value','phone'],
  data: ()=>({
    input: '',
    isPhone: false,
    IMask: false,
    mask: false,
  }),
  methods: {
    updatePhoneNumber() {
      setTimeout(()=>{
        this.$emit('input', this.mask.unmaskedValue)
      }, 0)
    },
    updateInput() {
      this.$emit('input', this.input)
    }
  },
  watch: {
    input() {
      if (this.isPhone) {
        this.updatePhoneNumber()
      } else {
        this.updateInput()
      }
    }
  },
  created() {
    if (typeof this.phone !== "undefined") {
      this.isPhone = true
    }
  },
  mounted() {
    if (this.isPhone) {
      this.mask = IMask(this.$refs.input, {
        mask: '+{7} 000 000-00-00',
        lazy: false
      });
    }
  },
}
</script>

<style lang="scss">
.input {
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  margin: 1em 0;
  padding: 0 14px;
  background-color: $grey-extra-light;
  border-radius: 8px;
  border: 1px solid $grey-extra-light;
  outline: none;
  font-size: 1rem;
  @include input-placeholder {
    color: $grey-light;
  }
}
.input_invalid {
  border-color: $err;
}
</style>
