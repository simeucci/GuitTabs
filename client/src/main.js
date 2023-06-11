import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'
import Panel from '@/components/global/Panel'

Vue.config.productionTip = false
Vue.component('panel', Panel)
sync(store, router)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
