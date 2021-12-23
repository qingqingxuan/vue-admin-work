import themeVariables from '@/assets/styles/themes/index.js'
import { toggleThemeColorClass, toggleThemeClass } from '@/utils/utils'
import cachedViewAction from './modules/cached-view'
import loginOut from './modules/login-out.js'
import visitedViewAction from './modules/visited-view'
const layoutModes = ['ltr', 'lcr', 'ttb']

export default {
  state: {
    isCollapse: false,
    isFixedNavBar: true,
    layoutMode: 'ltr',
    device: 'pc',
    theme: 'dark-side',
    themeColor: 'theme_color_blue',
    themeVariables,
    userInfo: {},
    permissionRoutes: [],
    visitedView: [],
    cachedView: [],
    actionItem: {
      showSearch: true,
      showMessage: true,
      showFullScreen: true,
      showRefresh: true
    }
  },
  start({ state, actions }) {
    state && (this.state = Object.assign(this.state, state))
    if (actions) {
      for (const key in actions) {
        this[key] = actions[key]
      }
    }
    toggleThemeColorClass(document.body, this.state.themeColor)
    toggleThemeClass(document.body, this.state.theme)
  },
  randomLayouMode() {
    return layoutModes[Math.floor(Math.random() * layoutModes.length)]
  },
  toggleCollapse(newStatus) {
    this.state.isCollapse = newStatus
  },
  toggleFixedNavBar(newStatus) {
    this.state.isFixedNavBar = newStatus
  },
  changeLayoutMode(mode = 'ltr') {
    this.state.layoutMode = mode
  },
  changeDevice(device = 'pc') {
    this.state.device = device
  },
  changeTheme(theme = 'light') {
    this.state.theme = theme
    toggleThemeClass(document.body, this.state.theme)
  },
  isShowHeader() {
    return this.state.device === 'pc' && this.state.layoutMode === 'ttb'
  },
  getSplitTabs() {
    return this.state.permissionRoutes.filter(it => {
      return !it.hidden && it.children && it.children.length > 0
    })
  },
  initPermissionRoute(routes) {
    this.state.permissionRoutes = routes
  },
  isEmptyPermissionRoute() {
    return !this.state.permissionRoutes || this.state.permissionRoutes.length === 0
  },
  ...cachedViewAction,
  ...visitedViewAction,
  ...loginOut
}
