import Vue from 'vue'
import * as urlPath from '@/api/url'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './router'

import TableHeader from '@/components/table/TableHeader'
import TableFooter from '@/components/table/TableFooter'
import TableBody from '@/components/table/TableBody'
import Dialog from '@/components/common/Dialog'
import SubmitButton from '@/components/common/SubmitButton'

import * as eCharts from 'echarts'

import permission from '@/directive/permission'

Vue.use(Element)
Vue.use(permission)

// 注册成为全局的组件
Vue.component('TableHeader', TableHeader)
Vue.component('TableFooter', TableFooter)
Vue.component('TableBody', TableBody)

Vue.component('Dialog', Dialog)

Vue.component('SubmitButton', SubmitButton)

Vue.prototype.$echarts = eCharts
Vue.prototype.$urlPath = urlPath
Vue.prototype.$isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
Vue.prototype.$isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1

Vue.prototype.$successMsg = function (message = '') {
  this.$message({
    message,
    type: 'success',
    duration: 5000
  })
}
Vue.prototype.$errorMsg = function (message = '') {
  this.$message({
    message,
    type: 'error',
    duration: 5000
  })
}
Vue.prototype.$showConfirmDialog = function (message = '') {
  return this.$confirm(message, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
}

Vue.prototype.publishEvent = function (eventName, payload) {
  if (!eventName) return
  const fun = this[eventName]
  fun && fun(payload)
}

Vue.prototype.registeEvent = function (events) {
  for (const item in events) {
    const handle = events[item]
    if (handle instanceof Function) {
      this[item] = handle.bind(this)
    }
  }
}

Vue.prototype.isInited = function (prop) {
  return this[prop] && this[prop].init
}
