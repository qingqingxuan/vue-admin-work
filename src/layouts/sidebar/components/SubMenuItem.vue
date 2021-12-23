<template>
  <el-submenu
    :index="generatorPath(item.path)"
    :popper-append-to-body="false"
  >
    <template slot="title">
      <SvgIcon :icon-class="item.meta ? item.meta.icon || 'el-icon-menu' : 'el-icon-menu'" />
      <span class="title">{{ item.meta ? item.meta.title : item.name }}</span>
      <MenuItemTip
        :value="item.meta ? item.meta.badge || '' : ''"
        :is-dot="item.meta ? item.meta.badge === 'dot' : false"
      />
    </template>
    <slot></slot>
  </el-submenu>
</template>

<script>
import { isExternal } from '@/utils/utils'
import path from 'path'
export default {
  name: 'SubMenuItem',
  props: {
    fullPath: {
      type: String,
      default: ''
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    generatorPath(childPath) {
      if (isExternal(this.fullPath)) {
        return this.fullPath
      }
      if (isExternal(childPath)) {
        return childPath
      }
      return path.resolve(this.fullPath, this.item.path)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin-left: 10px;
  color: currentColor;
  font-size: 14px;
}
.el-submenu [class^="el-icon-"] {
  margin-right: 0;
  width: 1em;
  height: 1em;
  font-size: 14px;
}
</style>
