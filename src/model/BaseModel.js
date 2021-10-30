/**
 * 检测参数的合法性，如果校验成功则方法返回true
 * @param {*} param0
 * @returns true
 */
function checkParams({ url = '', method = 'GET' }) {
  if (!url) {
    throw new Error('url must be not null')
  }
  if (method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'POST') {
    throw new Error('Illegal request method, Methods can only be "GET" or "POST"')
  }
  return true
}

/**
 * 普通的加载数据方法，如加载列表、初始化数据
 * @param {*} param0
 */
export function loadData({ url = '', method = 'GET', data, beforeRequest, afterRequest }) {
  if (checkParams({ url, method })) {
    return this[`$${method.toLowerCase()}`]({ url, data, beforeRequest, afterRequest })
  }
  throw new Error('params check failed')
}

/**
 * 模糊搜索方法
 * @param {*} param0
 */
export function likeSearch({ url = '', method = 'GET', data, beforeRequest, afterRequest }) {
  if (checkParams({ url, method })) {
    return this[`$${method.toLowerCase()}`]({ url, data, beforeRequest, afterRequest })
  }
  throw new Error('params check failed')
}

/**
 * 添加一条数据
 * @param {*} param0
 */
export function addItem({ url = '', method = 'GET', data, beforeRequest, afterRequest }) {
  if (checkParams({ url, method })) {
    return this[`$${method.toLowerCase()}`]({ url, data, beforeRequest, afterRequest })
  }
  throw new Error('params check failed')
}

/**
 * 删除n条数据
 * @param {*} items
 * @param {*} param1
 */
export function deleteItems({ url = '', method = 'GET', data, beforeRequest, afterRequest }) {
  if (checkParams({ url, method })) {
    return this[`$${method.toLowerCase()}`]({ url, data, beforeRequest, afterRequest })
  }
  throw new Error('params check failed')
}

/**
 * 更新一条数据
 * @param {*} item
 * @param {*} param1
 */
export function updateItem({ url = '', method = 'GET', data, beforeRequest, afterRequest }) {
  if (checkParams({ url, method })) {
    return this[`$${method.toLowerCase()}`]({ url, data, beforeRequest, afterRequest })
  }
  throw new Error('params check failed')
}

export default {
  loadData,
  addItem,
  deleteItems,
  updateItem
}
