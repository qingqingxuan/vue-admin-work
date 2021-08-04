import Vue from 'vue'
import request from './axios.config'

Vue.prototype.$http = function ({ url, data, method = 'GET', headers, beforeRequest, afterRequest }) {
  const successHandler = res => {
    if (res.code === 200) {
      return res
    }
    throw new Error(res.msg || '请求失败，未知异常')
  }
  const failHandler = error => {
    afterRequest && afterRequest()
    throw new Error(error.msg || '请求失败，未知异常')
  }
  beforeRequest && beforeRequest()
  return method === 'GET' ? request.get(url, { params: data }).then(successHandler, failHandler) : request.post(url, data, { headers }).then(successHandler, failHandler)
}

Vue.prototype.$get = function ({ url, data, beforeRequest = null, afterRequest = null }) {
  return this.$http({ url, method: 'GET', data, beforeRequest, afterRequest })
}

Vue.prototype.$post = function ({ url, data, headers, beforeRequest = null, afterRequest = null }) {
  return this.$http({ url, method: 'POST', data, headers, beforeRequest, afterRequest })
}
