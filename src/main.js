import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './icons'
import './utils'
import '@/styles/index.scss'
import './api/http'

import '../mock'

import '@/components/common'

import LayoutStore from '@/layouts/index'
import { resetRouter } from './router/index'
import Cookies from 'js-cookie'

Vue.use(LayoutStore, {
  state: {
    isFixedNavBar: true,
    layoutMode: 'ltr',
    themeColor: 'theme_color_blue',
    theme: 'dark-side'
  },
  actions: {
    onLogout() {
      resetRouter()
      Cookies.remove('admin-token')
      router.replace({ name: 'login' })
    },
    toPersonalCenter() {
      router.push('/personal/center')
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
