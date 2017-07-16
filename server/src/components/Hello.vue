<template>
  <div class="hello">
    <ul>
      <li class="connectivity"><span :class="{ connected: connected }"></span></li>
      <li class="card"><ZcashUsd></ZcashUsd></li>
      <li class="card"><Pool></Pool></li>
      <li class="card"><Miner></Miner></li>
    </ul>
  </div>
</template>

<script>
import ZcashUsd from '../../plugins/zcash-usd/render'
import Pool from '../../plugins/pool/render'
import Miner from '../../plugins/miner/render.vue'

export default {
  name: 'hello',

  components: { ZcashUsd, Pool, Miner },

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
  text-align: center;

  li {
    display: block;

    padding: 0.5rem;
    margin: 0.5rem;
  }
}

.connectivity {
  span {
    display: block;
    height: 1rem;
    width: 1rem;

    margin: 0 auto;

    background: #cb4b16;

    &.connected {
      background: #859900;
    }
  }
}
</style>
