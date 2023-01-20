const state = {
  isClipped: true,
  drawer: {
    isShow: false,
    //genres
    drawerItems: [],
    isMini: false
  },
  header: {
    height: 55
  },
  footer: { isFixed: false }
}
const getters = {
  isFixedFooter (state) {
    return state.footer.isFixed
  },
  isShowDrawer (state) {
    return state.drawer.isShow
  },
  isMiniDrawer (state) {
    return state.drawer.isMini
  },
  isClipped (state) {
    return state.isClipped
  },
  headerHeight (state) {
    return state.header.height
  }
}
const actions = {}
const mutations = {
  SET_HEADER_HEIGHT (state, payload) {
    state.header.height = payload
  },
  SET_DRAWER (state, payload) {
    state.drawer.isShow = payload
  },
  TOGGLE_DRAWER (state) {
    state.drawer.isShow = !state.drawer.isShow
  },
  TOGGLE_FOOTER (state) {
    state.footer.isFixed = !state.footer.isFixed
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
