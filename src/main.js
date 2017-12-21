import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import 'common/stylus/index.styl'
// import { JsBridge } from 'common/js/jsBridge'
import { Alert, Confirm, Toast } from 'wc-messagebox'
import 'wc-messagebox/style.css'

Vue.use(Alert)
Vue.use(Confirm)
Vue.use(Toast)
// Vue.use(JsBridge)
// import JsBridge from 'jsBridge'

// let vueBridge = require('vue-jsbridge')
// Vue.use(vueBridge)
// Vue.use(JsBridge)
fastclick.attach(document.body)
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
