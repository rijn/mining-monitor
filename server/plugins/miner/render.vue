<template>
  <div>
    <ul>
      <li v-for="miner in miners" :key="miner.name" class="miner">
        <span>{{ miner.name }}</span>
        <span><small>PING</small>{{ miner.ping }}</span>
        <span><small>LAST</small>{{ (current - miner.time).toFixed(0) }}</span>
        <ul>
          <li v-for="gpu in miner.gpus" :key="gpu.name">
            <span>{{ gpu.name }}</span>
            <span><small>SOL/s</small>{{ gpu.speed }}</span>
            <span><small>C</small>{{ gpu.temperature }}</span>
            <span><small>W</small>{{ gpu.watt }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'miner',

  template: ``,

  data () {
    return {
      miners: {},
      timer: null,
      current: 0
    }
  },

  created () {
    this.$bus.on(this.$options.name, this.process)
    this.timer = setInterval(() => { this.current = Number(new Date()) / 1000 }, 500)
  },
  beforeDestroy () {
    this.$bus.off(this.$options.name, this.process)
    clearInterval(this.timer)
  },

  methods: {
    process (message) {
      message.time = Number(new Date(message.time)) / 1000;
      Vue.set(this.miners, message.name, message)
    }
  }
};
</script>

<style lang="less" scoped>
div {
  font-size: 0.8em;
}

small {
  font-size: 0.6em;
  padding: 0 0.3em;
}

ul, li {
  span {
    padding: 0 0.2em;
  }
}

.miner {
  padding: 0.5em 0;
}
</style>
