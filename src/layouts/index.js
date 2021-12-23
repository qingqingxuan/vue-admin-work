import Vue from 'vue'
import store from './store/index'
import '../assets/styles/main.css'
import '../assets/iconfont/iconfont.css'
import {
  Scrollbar,
  Menu,
  MenuItem,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabPane,
  Link,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Badge,
  Card,
  Input,
  Popover,
  Tag,
  Drawer,
  Divider,
  Row,
  Col,
  Switch,
  Button,
  Tooltip,
  Backtop
} from 'element-ui'
Vue.use(Scrollbar)
  .use(Menu)
  .use(MenuItem)
  .use(Submenu)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Tabs)
  .use(TabPane)
  .use(Link)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Badge)
  .use(Card)
  .use(Input)
  .use(Popover)
  .use(Tag)
  .use(Drawer)
  .use(Divider)
  .use(Row)
  .use(Col)
  .use(Switch)
  .use(Button)
  .use(Tooltip)
  .use(Backtop)
const components = require.context('./', true, /\.vue$/)

components.keys().forEach(it => {
  const component = components(it)
  Vue.component(component.default.name, component.default)
})

function install(Vue, options) {
  store.start(options)
  Vue.prototype.$layoutStore = store
}

store.install = install

export { default as Layout } from './Layout.vue'

export default store
