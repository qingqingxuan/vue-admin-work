<template>
  <el-menu-item
    :index="generatorPath()"
    class="menu-item-wrapper"
    @click="handleClick"
  >
    <SvgIcon :icon-class="showRoute.meta ? showRoute.meta.icon || 'el-icon-menu' : 'el-icon-menu'" />
    <span
      slot="title"
      class="title"
    >{{ showRoute.meta ? showRoute.meta.title : showRoute.name }}</span>
    <MenuItemTip
      :value="showRoute.meta ? showRoute.meta.badge || '' : ''"
      :is-dot="showRoute.meta ? showRoute.meta.badge === 'dot' : false"
    />
  </el-menu-item>
</template>

<script>
import { isExternal } from '@/utils/utils'
import path from 'path'
export default {
  name: 'MenuItem',
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
    },
    showRoute: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    generatorPath() {
      return path.resolve(this.fullPath, this.showRoute.path)
    },
    handleClick() {
      if (isExternal(this.showRoute.path)) {
        window.open(this.showRoute.path)
      } else if (isExternal(this.fullPath)) {
        window.open(this.fullPath)
      } else if (
        this.$route.path !== path.resolve(this.fullPath, this.showRoute.path)
      ) {
        this.$router.push({
          path: path.resolve(this.fullPath, this.showRoute.path)
        })
      }
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
.el-menu-item [class^="el-icon-"] {
  margin-right: 0;
  width: 1em;
  height: 1em;
  font-size: 14px;
}
</style>
