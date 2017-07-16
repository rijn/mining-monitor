export default {
  name: 'pool',

  template: `<div>
    <p>EARNED : {{ earned }} ZEC</p>
    <p>UNPAID : {{ unpaid }} ZEC</p>
    <p>$ {{ usd }}</p>
  </div>`,

  data () {
    return {
      earned: 'pending',
      unpaid: 'pending',
      ZECUSD: 'pending'
    }
  },

  computed: {
    usd: function () {
      return ((Number(this.earned) + Number(this.unpaid)) * Number(this.ZECUSD)).toFixed(2);
    }
  },

  created () {
    this.$bus.on(this.$options.name, this.process)
    this.$bus.on('zcash-usd', this.exchange)
  },
  beforeDestroy () {
    this.$bus.off(this.$options.name, this.process)
    this.$bus.off('zcash-usd', this.exchange)
  },

  methods: {
    process ({ earned, unpaid }) {
      this.earned = earned;
      this.unpaid = unpaid;
    },
    exchange ({ ZECUSD }) {
      this.ZECUSD = ZECUSD;
    }
  }
}
