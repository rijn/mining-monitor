export default {
  name: 'pool',

  template: `<div>
    <p>EARNED : {{ earned }} ZEC</p>
    <p>UNPAID : {{ unpaid }} ZEC</p>
  </div>`,

  data () {
    return {
      earned: 'pending',
      unpaid: 'pending'
    }
  },

  created () {
    this.$bus.on(this.$options.name, this.process)
  },
  beforeDestroy () {
    this.$bus.off(this.$options.name, this.process)
  },

  methods: {
    process ({ earned, unpaid }) {
      this.earned = earned;
      this.unpaid = unpaid;
    }
  }
}
