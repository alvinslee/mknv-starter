import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import WelcomePage from '@/components/WelcomePage'
import DashboardPage from '@/components/DashboardPage'
import SignUpPage from '@/components/SignUpPage'
import LoginPage from '@/components/LoginPage'

Vue.use(Router)

const routes = [
  { path: '/', name: 'Welcome Page', component: WelcomePage },
  { path: '/signup', name: 'Sign Up', component: SignUpPage },
  { path: '/authenticate', name: 'Login', component: LoginPage },
  { path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    beforeEnter (to, from, next) {
      if (store.getters.isAuthenticated) {
        next()
      } else {
        next('/authenticate')
      }
    }
  }
]

export default new Router({ mode: 'history', routes })
