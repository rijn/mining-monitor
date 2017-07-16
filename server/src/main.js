import Vue from 'vue'
import VueBus from 'vue-bus'
import VueSocketio from 'vue-socket.io'
import App from './App'
import router from './router'

import 'normalize.css'

Vue.use(VueSocketio, 'http://localhost:3000')
Vue.use(VueBus)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  sockets: {
    connect () {
      this.$bus.emit('connectivity', true)
      this.$socket.emit('register')
    },
    disconnect () {
      this.$bus.emit('connectivity', false)
    },
    downstream (data) {
      this.$bus.emit('connectivity', true)
      data.forEach(({ module, message }) => {
        this.$bus.emit(module, message)
      })
    }
  },
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
