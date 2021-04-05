export const state = () => ({
  isCartOpened: false,
})

export const mutations = {
  toggleCart(state) {
    state.isCartOpened = !state.isCartOpened
  },
}

export const getters = {
  isCartOpened: s => {
    return s.isCartOpened
  },
}
