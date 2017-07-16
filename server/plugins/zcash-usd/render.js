export default {
  name: 'zcash-usd',

  template: `<div>1 ZEC : {{ ZECUSD }} USD</div>`,

  data () {
    return {
      line: [],
      ZECUSD: 'pending'
    }
  },

  created () {
    this.$bus.on(this.$options.name, this.process)
  },
  beforeDestroy () {
    this.$bus.off(this.$options.name, this.process)
  },

  methods: {
    process ({ time, ZECUSD }) {
      this.ZECUSD = ZECUSD;
      // this.line.push({ time, ZECUSD });
    }
  }
}
