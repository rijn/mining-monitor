<template>
  <div class="hello">
    <ul>
      <li class="connectivity" :class="{ connected: connectivity }"><span></span></li>
      <li class="card"><ZcashUsd></ZcashUsd></li>
    </ul>
  </div>
</template>

<script>
import ZcashUsd from '../../plugins/zcash-usd/render'

export default {
  name: 'hello',

  components: { ZcashUsd },

  data () {
    return {
      connected: false
    }
  },

  created () {
    this.$bus.on('connectivity', this.changeConnectivity)
  },
  beforeDestroy () {
    this.$bus.off('connectivity', this.changeConnectivity)
  },

  methods: {
    changeConnectivity (value) {
      this.connected = value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
}

li {
  display: block;
}

.connectivity {
  span {
    display: block;
    height: 1rem;
    width: 1rem;
  }
}
</style>
