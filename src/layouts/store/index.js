import themeVariables from '@/assets/styles/themes/index.js'
import { toggleThemeColorClass, toggleThemeClass } from '@/utils/utils'
import cachedViewAction from './modules/cached-view'
import loginOut from './modules/login-out.js'
import visitedViewAction from './modules/visited-view'
const layoutModes = ['ltr', 'lcr', 'ttb']

function findItemByKey(key, menuList) {
  for (let index = 0; index < menuList.length; index++) {
    const temp = menuList[index]
    if (temp.path === key) {
      return temp
    } else {
      if (temp.children && temp.children.length > 0) {
        const result = findItemByKey(key, temp.children)
        if (result) {
          return result
        }
        continue
      }
      continue
    }
  }
}

export default {
  state: {
    isCollapse: false,
    isFixedNavBar: true,
    layoutMode: 'ltr',
    device: 'pc',
    theme: 'dark-side',
    themeColor: 'theme_color_blue',
    themeVariables,
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
    return (
      !this.state.permissionRoutes || this.state.permissionRoutes.length === 0
    )
  },
  changeSideBarIcon(key = null, icon = null) {
    if (!key || !icon) {
      return
    }
    const menuList = this.state.permissionRoutes.filter(
      it => it.hidden === false
    )
    const item = findItemByKey(key, menuList)
    if (item && item.meta) {
      item.meta.icon = icon
    }
  },
  ...cachedViewAction,
  ...visitedViewAction,
  ...loginOut
}
