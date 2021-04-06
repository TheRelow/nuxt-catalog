<template>
  <div>
    <base-subtitle>Оформить заказ</base-subtitle>
    <base-input placeholder="Ваше имя" :value="name" @input="name = $event" :class="{'input_invalid': $v.name.$dirty && !$v.name.required}"></base-input>
    <base-input phone placeholder="Телефон" :value="phone" @input="phone = $event" :class="{'input_invalid': $v.phone.$dirty && (!$v.phone.required || !$v.phone.minLength)}"></base-input>
    <base-input placeholder="Адрес" :value="address" @input="address = $event" :class="{'input_invalid': $v.address.$dirty && !$v.address.required}"></base-input>
    <base-btn @click="send">Отправить</base-btn>
  </div>
</template>

<script>
import {required, minLength} from "vuelidate/lib/validators";

export default {
  data: ()=>({
    name: '',
    phone: '',
    address: ''
  }),
  validations: {
    name: {
      required
    },
    phone: {
      required,
      minLength: minLength(11)
    },
    address: {
      required
    },
  },
  methods: {
    validate() {
      this.$v.$touch()
      if (this.$v.$anyError) {
        return false
      }
      return true
    },
    send() {
      if (this.validate()) {
        this.$store.commit("products/removeAllFromCart")
        this.$emit('success')
      }
    }
  }
}
</script>
