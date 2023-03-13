export default {
  // 当用户登出成功调用的内部方法，如果要在外部监听登出事件，需要重写 onLogout 方法
  logout() {
    this.state.permissionRoutes = []
    this.state.visitedView = []
    this.state.cachedView = []
    localStorage.removeItem('userInfo')
    localStorage.removeItem('visited')
  }
}
