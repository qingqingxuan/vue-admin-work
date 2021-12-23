export const baseModel = {
  actionModel: 'add' // 用于表格操作对话框的模式 eidt: 编辑模式  add: 添加模式，默认是添加模式
}

export function mergeObject(model) {
  if (model) {
    return { ...baseModel, ...model }
  }
  return {}
}

export function uuid() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  var uuid = s.join('')
  return uuid
}

export function randomString(length) {
  var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var result = ''
  for (var i = length; i > 0; --i) { result += str[Math.floor(Math.random() * str.length)] }
  return result
}

export function currentDate() {
  const d = new Date()
  let str = ''
  str += d.getFullYear() + '-' // 获取当前年份
  const month = d.getMonth() + 1
  str += month < 10 ? '0' + month + '-' : month + '-' // 获取当前月份（0——11）
  str += d.getDate() + ' '
  const hours = d.getHours()
  str += hours < 10 ? '0' + hours : hours + ':'
  str += d.getMinutes() + ':'
  str += d.getSeconds()
  return str
}

export function isOjbect(param) {
  return Object.prototype.toString.call(param) === '[object Object]'
}

export function isFunction(param) {
  return Object.prototype.toString.call(param) === '[object Function]'
}

export function isArray(param) {
  return Object.prototype.toString.call(param) === '[object Array]'
}

export function isNumber(param) {
  return Object.prototype.toString.call(param) === '[object Number]'
}

export function isBoolean(param) {
  return Object.prototype.toString.call(param) === '[object Boolean]'
}

/**
 * @param {*} element
 * @param {*} className
 * @returns
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const clazz = classString.split(' ').filter(it => it.indexOf('theme_color_') === -1)
  clazz.push(className)
  classString = clazz.join(' ')
  element.className = classString
}

/**
 * 中划线字符驼峰
 * @param {*} str 要转换的字符串
 * @returns 返回值
 */
export function toHump(str) {
  if (!str) return str
  return str.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  }).replace(/(\s|^)[a-z]/g, function (char) {
    return char.toUpperCase()
  })
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function toggleThemeColorClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const clazz = classString.split(' ').filter(it => it.indexOf('theme_') === -1)
  clazz.push(className)
  classString = clazz.join(' ')
  element.className = classString
}

export function toggleThemeClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const clazz = classString.split(' ').filter(it => it.indexOf('theme_') !== -1)
  clazz.push(className)
  classString = clazz.join(' ')
  element.className = classString
}

