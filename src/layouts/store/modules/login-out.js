export default {
  // 当用户登录成功调用的方法
  onLogin(userInfo = {}) {
    this.state.userInfo = userInfo
    localStorage.setItem('userInfo', userInfo)
  },
  // 当用户登出成功调用的内部方法，如果要在外部监听登出事件，需要重写 onLogout 方法
  logout() {
    this.state.userInfo = {}
    this.state.permissionRoutes = []
    this.state.visitedView = []
    this.state.cachedView = []
    localStorage.removeItem('userInfo')
    localStorage.removeItem('visited')
  }
}
