<template>
  <div class="logo-wrapper">
    <img
      v-if="showLogo"
      class="logo-img"
      :src="require('../../assets/work_logo.png')"
    />
    <transition
      v-if="showTitle"
      name="el-fade-in-linear"
    >
      <span
        v-show="!state.isCollapse || alwaysShow"
        class="logo-title"
      >vue-admin-work</span>
    </transition>
  </div>
</template>

<script>
import store from '../store/index'
export default {
  name: 'Logo',
  props: {
    showTitle: {
      type: Boolean,
      default: true
    },
    showLogo: {
      type: Boolean,
      default: true
    },
    alwaysShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      state: store.state
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
.logo-wrapper {
  height: $logoHeight;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  .logo-img {
    width: 30px;
  }
  .logo-title {
    margin-left: 5px;
    font-weight: bold;
  }
}
</style>
