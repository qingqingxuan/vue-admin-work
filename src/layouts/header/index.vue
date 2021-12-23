<template>
  <div class="vaw-header-layout">
    <div class="logo-wrapper">
      <Logo :always-show="true" />
    </div>
    <div class="menu-wrapper">
    </div>
    <div class="right-wrapper">
      <ActionItems />
    </div>
    <div class="avatar-wrapper">
      <VAWAvatar />
    </div>
  </div>
</template>

<script>
import store from '../store/index'
export default {
  name: 'VAWHeader',
  data() {
    return {
      state: store.state
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables.scss";
.vaw-header-layout {
  height: $logoHeight;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  .logo-wrapper {
    width: $menuWidth;
  }
  .menu-wrapper {
    flex: 1;
    overflow: hidden;
  }
  .right-wrapper {
    min-width: $menuWidth / 3 * 2;
    height: 100%;
  }
  .avatar-wrapper {
    padding-right: 25px;
  }
}
::v-deep {
  .el-menu--horizontal > .el-menu-item {
    height: $logoHeight;
    line-height: $logoHeight;
  }
}
</style>
