export default {
  data() {
    return {
      cardStyle: {
        top: '0px'
      }
    }
  },
  mounted() {
    this.$parent.$on('tableHeightChanged', (height) => {
      this.cardStyle.top = height + 10 + 'px'
    })
  }
}
