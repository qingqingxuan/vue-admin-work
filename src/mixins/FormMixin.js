export default {
  data() {
    return {
      innerFormItems: []
    }
  },
  methods: {
    refreshItems() {
      this.innerFormItems = []
      this.innerFormItems.push(...this.formItems.filter(it => !it.hidden))
    },
    checkParams() {
      return this.innerFormItems.every(it => {
        return it.validator ? (it.validator.call(this, it, this.innerFormItems.find(item => it.associatedOption === item.name))) : true
      })
    },
    generatorParams() {
      if (this.innerFormItems && this.innerFormItems.length !== 0) {
        return this.innerFormItems.reduce((pre, cur) => {
          pre[cur.name] = cur.value
          return pre
        }, {})
      }
      return {}
    },
    resetParams() {
      this.innerFormItems && (this.innerFormItems.forEach(it => it.value === ''))
    }
  }
}
