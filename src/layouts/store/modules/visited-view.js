export default {
  addVisitedView(route) {
    return new Promise(resolve => {
      if (!this.state.visitedView.find(it => it.fullPath === route.fullPath)) {
        this.state.visitedView.push(route)
      }
      this.addCachedView && this.addCachedView(route)
      resolve(route)
    })
  },
  removeVisitedView(route) {
    return new Promise(resolve => {
      this.state.visitedView.splice(this.state.visitedView.indexOf(route), 1)
      this.removeCachedView && this.removeCachedView(route)
      resolve(route)
    })
  },
  closeLeftVisitedView(selectRoute) {
    return new Promise(resolve => {
      const selectIndex = this.state.visitedView.indexOf(selectRoute)
      if (selectIndex !== -1) {
        this.state.visitedView = this.state.visitedView.filter((it, index) => {
          return (it.meta && it.meta.affix) || index >= selectIndex
        })
      }
      this.resetCachedView && this.resetCachedView()
      resolve()
    })
  },
  closeRightVisitedView(selectRoute) {
    return new Promise(resolve => {
      const selectIndex = this.state.visitedView.indexOf(selectRoute)
      if (selectIndex !== -1) {
        this.state.visitedView = this.state.visitedView.filter((it, index) => {
          return (it.meta && it.meta.affix) || index <= selectIndex
        })
      }
      this.resetCachedView && this.resetCachedView()
      resolve()
    })
  },
  closeAllVisitedView() {
    return new Promise(resolve => {
      this.state.visitedView = this.state.visitedView.filter((it, index) => {
        return (it.meta && it.meta.affix)
      })
      this.resetCachedView && this.resetCachedView()
      resolve()
    })
  },
  persistentVisitedView() {
    const tempPersistendRoutes = this.state.visitedView.map(it => {
      return {
        fullPath: it.fullPath,
        meta: it.meta,
        name: it.name,
        params: it.params,
        path: it.path,
        query: it.query
      }
    })
    localStorage.setItem('visited', JSON.stringify(tempPersistendRoutes))
  },
  restoreVisitedView() {
    this.state.visitedView = [...this.state.visitedView]
    const originRouteString = localStorage.getItem('visited')
    const persistentVisitedRoutes = JSON.parse(originRouteString || '[]')
    persistentVisitedRoutes.forEach(originRoute => {
      if (!this.state.visitedView.find(it => it.fullPath === originRoute.fullPath && it.name === originRoute.name)) {
        this.state.visitedView.push(originRoute)
      }
    })
  }
}
