import draggable from './draggable'

const install = function (Vue) {
  Vue.directive('draggable', draggable)
}

draggable.install = install

if (typeof window !== undefined && Window.vue) {
  install(window.Vue)
}

export default draggable
