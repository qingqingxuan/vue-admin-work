function Form(config) {
  this.config = config
  this.container = []
  this.formItem = function (item) {
    this.container.push(item)
    return this
  }
  this.build = function () {
    return {
      config: this.config || {},
      formItems: [...this.container]
    }
  }
}
export function formBuilder(config) {
  return new Form(config)
}
