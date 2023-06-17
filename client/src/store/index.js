import Vue from 'vue'
import Vuex from 'vuex'
import CreatePersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    CreatePersistedState()
  ],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  getters: {
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = Boolean(token)
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    }
  },
  modules: {
  }
})
