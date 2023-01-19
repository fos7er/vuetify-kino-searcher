
const state = {
  drawer: {
    isClipped: true,
    isShow: false,
    //genres
    drawerItems: [],
    isMini: false
  },
  header: {
    height: 55
  },
  footer: {isFixed: false}
}
const getters = {
  isFixedFooter(state) {
    return state.footer.isFixed
  },
  isShowDrawer(state) {
    return state.drawer.isShow
  },
  isMiniDrawer(state) {
    return state.drawer.isMini
  },
  isClippedDrawer(state) {
    return state.drawer.isClipped
  },
  headerHeight(state) {
    return state.header.height
  }
}
const actions = {}
const mutations = {
  TOGGLE_FOOTER(state) {
    state.footer.isFixed = !state.footer.isFixed
  },
  SET_DRAWER(state, payload) {
    state.drawer.isShow = payload
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
