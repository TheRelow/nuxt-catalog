export const state = () => ({
  productList: {},
  categories: {},
  productsByCategories: {},
  cart: [],
  isModifiedProductList: false,
  isModifiedCategories: false,
  isLsChecked: false
})

export const mutations = {
  modifyProductList(state) {
    state.isModifiedProductList = true
  },
  modifyCategories(state) {
    state.isModifiedCategories = true
  },
  setProductList(state, payload) {
    for (let i in payload) {
      let prod = payload[i]
      let category = prod.category.toString()
      state.productList[prod.id] = prod
      if (!state.productsByCategories[category]) {
        state.productsByCategories[category] = []
      }
      state.productsByCategories[category].push(prod.id)
    }
  },
  setCategories(state, payload) {
    for (let i in payload) {
      state.categories[payload[i].id] = payload[i].name
    }
  },
  addToCart(state, payload) {
    if (state.cart.indexOf(payload) === -1) {
      state.cart.push(payload)
    }
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  removeFromCart(state, payload) {
    const index = state.cart.indexOf(payload)
    if (index > -1) {
      state.cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  removeAllFromCart(state) {
    state.cart = []
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  checkLocalStorageCart(state) {
    let lsCart = localStorage.getItem('cart')
    if (lsCart) {
      state.cart = JSON.parse(lsCart)
    }
    state.isLsChecked = true
  }
}

export const actions = {
  async getProductList({commit}) {
    await this.$axios.$get('https://frontend-test.idaproject.com/api/product')
      .then((res)=>{
        commit('setProductList', res)
        commit('modifyProductList')
        return res
      })
  },
  async getCategories({commit}) {
    await this.$axios.$get('https://frontend-test.idaproject.com/api/product-category')
      .then((res)=>{
        commit('setCategories', res)
        commit('modifyCategories')
        return res
      })
  },
}

export const getters = {
  getProductsByCategoryId: s => id => {
    if (s.productsByCategories[id]) {
      return s.productsByCategories[id]
    }
    return false
  },
  getProductById: s=> id => {
    if (s.productList[id]) {
      return s.productList[id]
    }
    return false
  },
  getCartCount: s => {
    return s.cart.length
  },
  getCartItems: s => {
    return s.cart
  },
  getCategories: s => {
    return s.categories
  },
  isModifiedProductList: s => {
    return s.isModifiedProductList
  },
  isLsChecked: s => {
    return s.isLsChecked
  },
  isModifiedCategories: s => {
    return s.isModifiedCategories
  },
  isProductInCart: s => id => {
    let idx = s.cart.indexOf(id)
    console.log(idx)
    if (idx > - 1) {
      return true
    }
    return false
  }
}
