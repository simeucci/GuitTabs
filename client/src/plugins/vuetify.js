import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import it from 'vuetify/src/locale/it.ts'

Vue.use(Vuetify)

Vue.component('my-component', {
  methods: {
    changeLocale () {
      this.$vuetify.lang.current = 'it'
    }
  }
})

export default new Vuetify({
  lang: {
    locales: { it },
    current: 'it'
  },
  icons: {
    iconfont: 'mdiSvg' // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  }
})
