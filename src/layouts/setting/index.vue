<template>
  <el-card
    class="set-container"
    :body-style="{padding: 0}"
  >
    <div
      class="tip-wrapper bg2 flex flex-direction justify-center align-center"
      @click="openDrawer"
    >
      <i class="el-icon-s-tools"></i>
      <div>
        应用配置
      </div>
    </div>
  </el-card>
</template>

<script>

import store from '../store/index'
export default {
  name: 'Setting',
  data() {
    return {
      state: store.state
    }
  },
  methods: {
    openDrawer() {
      this.$emit('open-drawer')
    },
    openSource() {
      // this.$emit('open-source')
      alert('添加QQ获取源码：353087890')
    }
  }
}
</script>

<style lang="scss">
.dark {
  .el-drawer {
    background-color: #272727 !important;
  }
}
.light,
.dark-side,
.blue-side {
  .el-drawer {
    background-color: #ffff !important;
  }
}
</style>
<style lang="scss" scoped>
$width: 60px;
.set-container {
  position: fixed;
  right: 0;
  top: 0;
  margin-top: calc(50vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 5px;
  .tip-wrapper {
    width: $width;
    height: $width;
    border-radius: 4px;
    font-size: 10px;
    transition: color 0.15s ease, background-color 0.15s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > i {
      font-size: 20px;
      margin-bottom: 8px;
    }
  }
  .tip-wrapper + .tip-wrapper {
    margin-top: 10px;
  }
  .bg1 {
    color: #1bc3bb;
  }
  .bg1:hover {
    background-color: #1bc3bb;
    color: #ffffff;
  }
  .bg2 {
    color: #3698fd;
  }
  .bg2:hover {
    background-color: #3698fd;
    color: #ffffff;
  }
}
</style>
