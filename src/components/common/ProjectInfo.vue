<template>
  <div class="project-container">
    <el-row class="row-wrapper">
      <el-col :span="6">
        当前版本
      </el-col>
      <el-col :span="18">
        {{ currentVersion }}
      </el-col>
    </el-row>
    <el-row class="row-wrapper">
      <el-col :span="6">
        vue
      </el-col>
      <el-col :span="6">
        {{ vueVersion }}
      </el-col>
      <el-col :span="6">
        vuex
      </el-col>
      <el-col :span="6">
        {{ vuexVersion }}
      </el-col>
    </el-row>
    <el-row class="row-wrapper">
      <el-col :span="6">
        vue-router
      </el-col>
      <el-col :span="6">
        {{ vueRouterVersion }}
      </el-col>
      <el-col :span="6">
        echarts
      </el-col>
      <el-col :span="6">
        {{ echartsVersion }}
      </el-col>
    </el-row>
    <el-row class="row-wrapper">
      <el-col :span="6">
        element-ui
      </el-col>
      <el-col :span="6">
        {{ elementVersion }}
      </el-col>
      <el-col :span="6">
        axios
      </el-col>
      <el-col :span="6">
        {{ axiosVersion }}
      </el-col>
    </el-row>
  </div>
</template>

<script>
import config from '../../../package.json'
export default {
  name: 'ProjectInfo',
  data() {
    return {
      currentVersion: config.version,
      vueVersion: config.dependencies.vue,
      vuexVersion: config.dependencies.vuex,
      vueRouterVersion: config.dependencies['vue-router'],
      elementVersion: config.dependencies['element-ui'],
      echartsVersion: config.dependencies['echarts'],
      axiosVersion: config.dependencies.axios
    }
  }
}
</script>

<style lang="scss" scoped>
.project-container {
  border: 1px solid #ececec;
  .row-wrapper {
    border-bottom: 1px solid #ececec;
    & > div {
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & > div:nth-child(odd) {
      font-size: 14px;
    }
    .theme-dark & > div:nth-child(odd) {
      color: #ffffff;
      background-color: rgb(51, 51, 51);
    }
    & > div:nth-child(even) {
      font-size: 14px;
    }
  }
  & > div.row-wrapper:last-child {
    border: none;
  }
}
.theme-dark {
  .project-container {
    border: 1px solid #858585;
    .row-wrapper {
      border-bottom: 1px solid #858585;
      & > div:nth-child(odd) {
        background-color: #333333;
        color: #ffffff;
      }
      & > div:nth-child(even) {
        color: #ffffff;
      }
    }
  }
}
</style>
