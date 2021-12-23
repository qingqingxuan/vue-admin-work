<template>
  <el-drawer
    :visible.sync="opened"
    :with-header="false"
    direction="rtl"
    :size="state.device === 'mobile' ? '75%' : '280px'"
  >
    <el-card
      class="wrapper"
      style="padding-top: 20px"
    >
      <div
        class="close-wrapper"
        @click="opened = false"
      >
        <i class="el-icon-close"></i>
      </div>
      <el-divider content-position="center">主题风格</el-divider>
      <el-row :gutter="5">
        <el-col
          v-for="(item, index) of styleExampleList"
          :key="index"
          :span="8"
          class="example-wrapper"
        >
          <StyleExample
            :checked="item.checked"
            :left-bg="item.leftBg"
            :right-top-bg="item.rightTopBg"
            :right-bottom-bg="item.rightBottomBg"
            @click.native="exampleClick(item)"
          />
        </el-col>
      </el-row>
      <el-divider content-position="center">布局模式</el-divider>
      <el-row :gutter="5">
        <el-col
          v-for="(item, index) of layoutExampleList"
          :key="index"
          :span="8"
          class="example-wrapper"
        >
          <StyleExample
            :checked="item.checked"
            :left-bg="item.leftBg"
            :right-top-bg="item.rightTopBg"
            :right-bottom-bg="item.rightBottomBg"
            :class="[item.class || '']"
            :tip-text="item.tipText"
            @click.native="layoutExampleClick(item)"
          />
        </el-col>
      </el-row>
      <el-divider content-position="center">主题颜色</el-divider>
      <div class="colors-wrapper">
        <div
          v-for="(item, index) of primartyColorList"
          :key="index"
          class="color-wrapper"
          :class="{'circle' : item.checked}"
          :style="{'background-color': item.value}"
          @click="colorClick(item)"
        ></div>
      </div>
      <div style="height: 20px"></div>
      <el-divider content-position="center">按钮显示</el-divider>
      <div class="setting-item-wrapper">
        <span>固定顶部导航</span>
        <el-switch
          v-model="state.isFixedNavBar"
          :disabled="state.layoutMode === 'ttb'"
        />
      </div>
      <div class="setting-item-wrapper">
        <span>搜索</span>
        <el-switch v-model="state.actionItem.showSearch" />
      </div>
      <div class="setting-item-wrapper">
        <span>消息</span>
        <el-switch v-model="state.actionItem.showMessage" />
      </div>
      <div class="setting-item-wrapper">
        <span>刷新</span>
        <el-switch v-model="state.actionItem.showRefresh" />
      </div>
      <div class="setting-item-wrapper">
        <span>全屏</span>
        <el-switch v-model="state.actionItem.showFullScreen" />
      </div>
      <el-divider />
      <Contact style="margin-bottom: 25%" />
    </el-card>
  </el-drawer>
</template>

<script>
import store from '../../store'
import { toggleThemeClass, toggleThemeColorClass } from '@/utils/utils'
export default {
  name: 'SettingInfo',
  data() {
    return {
      state: store.state,
      opened: false,
      styleExampleList: [
        {
          leftBg: '#001529',
          rightTopBg: '#ffffff',
          rightBottomBg: '#f5f5f5',
          checked: false,
          themeId: 'dark-side'
        },
        {
          leftBg: '#ffffff',
          rightTopBg: '#ffffff',
          rightBottomBg: '#d4d4d4',
          checked: false,
          themeId: 'light'
        },
        {
          leftBg: '#000000',
          rightTopBg: '#333333',
          rightBottomBg: '#555555',
          checked: false,
          themeId: 'dark'
        }
      ],
      layoutExampleList: [
        {
          leftBg: '#000000',
          rightTopBg: '#d4d4d4',
          rightBottomBg: '#d4d4d4',
          checked: true,
          layoutId: 'ltr',
          tipText: '左右'
        },
        {
          leftBg: '#d4d4d4',
          rightTopBg: '#ffffff',
          rightBottomBg: '#d4d4d4',
          checked: false,
          layoutId: 'ttb',
          class: 'extra-class',
          tipText: '上下'
        },
        {
          leftBg: '#000000',
          rightTopBg: '#d4d4d4',
          rightBottomBg: '#d4d4d4',
          checked: false,
          layoutId: 'lcr',
          class: 'extra-class-1',
          tipText: '分栏'
        }
      ],
      primartyColorList: [
        {
          name: 'blue',
          value: '#409eff',
          checked: true
        },
        {
          name: 'cyan',
          value: '#13C2C2',
          checked: false
        },
        {
          name: 'red',
          value: '#F5222D',
          checked: false
        },
        {
          name: 'purple',
          value: '#722ED1',
          checked: false
        }
      ]
    }
  },
  mounted() {
    this.styleExampleList.forEach((it) => {
      it.checked = this.state.theme === it.themeId
    })
  },
  methods: {
    show() {
      this.opened = true
    },
    close() {
      this.opened = false
    },

    exampleClick(item) {
      this.styleExampleList.forEach((it) => {
        it.checked = it === item
      })
      store.changeTheme(item.themeId)
      toggleThemeClass(document.body, this.state.theme)
    },
    layoutExampleClick(item) {
      this.layoutExampleList.forEach((it) => {
        it.checked = it === item
      })
      store.changeLayoutMode(item.layoutId)
    },
    colorClick(item) {
      this.primartyColorList.forEach((it) => {
        it.checked = it === item
      })
      toggleThemeColorClass(document.body, 'theme_color_' + item.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  .close-wrapper {
    position: absolute;
    right: 8%;
    top: 1%;
    font-size: 20px;
  }
  .colors-wrapper {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .color-wrapper {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      border: 1px solid #c1c1c1;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .circle::after {
      content: "";
      display: block;
      margin: 0 auto;
      margin-top: 25px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: rgb(3, 190, 50);
      text-align: center;
    }
  }
  .setting-item-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-size: 14px;
  }
}
.example-wrapper + .example-wrapper {
  margin-bottom: 30px;
}
</style>
