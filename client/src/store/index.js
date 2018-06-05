import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
// import globalAxios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: null,
    userId: null
  },
  mutations: {
    storeAuthorization (state, authData) {
      state.authToken = authData.authToken
      state.userId = authData.userId
    },
    clearAuthData (state) {
      state.authToken = null
      state.userId = null
    }
  },
  actions: {
    setLogoutTimer ({ commit }, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    async signin ({commit, dispatch}, authData) {
      try {
        let response = await axios.post('/authenticate', {
          email: authData.email,
          password: authData.password
        })
        if (response.data.success) {
          console.log(response.data)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('userId', response.data.userId)
          const now = new Date()
          const expiresAt = new Date(now.getTime() + response.data.expiresIn * 1000)
          localStorage.setItem('expiresAt', expiresAt)
          commit('storeAuthorization', {
            authToken: response.data.token,
            userId: response.data.userId
          })
          dispatch('setLogoutTimer', response.data.expiresIn)
          router.replace('/dashboard')
        } else {
          console.log('FAIL')
        }
      } catch (error) {
        console.log(error)
      }
    },
    signout ({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('expiresAt')
      router.replace('/')
    }
  },
  getters: {
    user (state) {
      return state.userId
    },
    isAuthenticated (state) {
      return state.authToken !== null
    }
  }
})
