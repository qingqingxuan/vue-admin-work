import { toHump } from '@/utils/utils'
export default {
  addCachedView(route) {
    if (route.name && route.meta && route.meta.cacheable) {
      const humName = toHump(route.name)
      if (!this.state.cachedView.includes(humName)) {
        this.state.cachedView.push(humName)
      }
      this.addEmptyRouteName()
    }
  },
  removeCachedView(route) {
    const humName = toHump(route.name)
    const index = this.state.cachedView.indexOf(humName)
    if (index !== -1) {
      this.state.cachedView.splice(index, 1)
    }
    this.addEmptyRouteName()
  },
  resetCachedView() {
    // 从已经访问过的页面的数组中过滤可缓存的页面
    this.state.cachedView = this.state.visitedView.filter((it, index) => {
      return it.name && it.meta && it.meta.cacheable
    }).map(it => toHump(it.name))
    this.addEmptyRouteName()
  },
  addEmptyRouteName() {
    if (!this.state.cachedView.includes('RouterViewLayout')) {
      this.state.cachedView.push('RouterViewLayout')
    }
  }
}
