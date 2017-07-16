import Vue from 'vue'
import VueBus from 'vue-bus'
import VueSocketio from 'vue-socket.io'
import App from './App'
import router from './router'

Vue.use(VueSocketio, 'http://localhost:3000')
Vue.use(VueBus)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  sockets: {
    connect () {
      this.$socket.emit('register')
      this.$bus.emit('connectivity', true)
    },
    disconnect () {
      this.$bus.emit('connectivity', false)
    },
    downstream (data) {
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
