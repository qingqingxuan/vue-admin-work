export default {
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      const width = document.body.clientWidth
      this.onResize && this.onResize(width)
    }
  }
}
