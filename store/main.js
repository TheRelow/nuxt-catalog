export const state = () => ({
  isCartOpened: false,
  sortBy: 'цене'
})

export const mutations = {
  toggleCart(state) {
    state.isCartOpened = !state.isCartOpened
  },
  setSortBy(state, payload) {
    state.sortBy = payload
  },
}

export const getters = {
  isCartOpened: s => {
    return s.isCartOpened
  },
  getSortBy: s => {
    return s.sortBy
  },
}
