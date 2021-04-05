<template>
  <button class="btn" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<style lang="scss">
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: $black;
  border: none;
  color: $white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.25s;
  &:hover {
    background-color: $grey;
  }
}
</style>
