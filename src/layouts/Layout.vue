<template>
  <div
    class="vaw-layout-container"
    :class="[state.device === 'mobile' && 'is-mobile']"
  >
    <transition name="header">
      <VAWHeader v-if="isShowHeader" />
    </transition>
    <template v-if="isShowHeader">
      <SideBar
        ref="sideBar"
        :show-logo="!isShowHeader"
        class="layout-mode-ttb"
      />
      <MainLayout :show-nav-bar="!isShowHeader" />
    </template>
    <template v-else-if="state.layoutMode === 'lcr'">
      <TabSplitSideBar />
      <MainLayout />
    </template>
    <template v-else>
      <SideBar ref="sideBar" />
      <MainLayout />
    </template>
    <div
      v-if="state.device === 'mobile'"
      class="mobile-shadow"
      :class="[state.isCollapse ? 'close-shadow' : 'show-shadow']"
      @click="closeMenu"
    ></div>
    <SettingInfo ref="settingInfo" />
    <Setting
      @open-drawer="openSettingDrawer"
      @open-source="openSource"
    />
  </div>
</template>

<script>
import store from './store/index'
export default {
  name: 'Layout',
  data() {
    return {
      state: store.state
    }
  },
  computed: {
    isShowHeader() {
      return store.isShowHeader()
    }
  },
  watch: {
    'state.visitedView'(newVal) {
      if (newVal && newVal.length !== 0) {
        store.persistentVisitedView()
      }
    },
    $route() {
      if (!this.state.isCollapse && this.state.device === 'mobile') {
        store.toggleCollapse(true)
      }
    }
  },
  mounted() {
    this.handleScreenResize()
    window.addEventListener('resize', this.handleScreenResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleScreenResize)
  },
  methods: {
    openSettingDrawer() {
      this.$refs.settingInfo.show()
    },
    openSource() {
      this.$refs.myNotice.show()
    },
    handleScreenResize() {
      const width = document.body.clientWidth
      if (width <= 768) {
        store.changeDevice('mobile')
        store.toggleCollapse(true)
      } else if (width < 992 && width > 768) {
        store.changeDevice('pad')
        store.toggleCollapse(true)
      } else if (width < 1200 && width >= 992) {
        store.changeDevice('pc')
        store.toggleCollapse(false)
      } else {
        store.changeDevice('pc')
        store.toggleCollapse(false)
      }
    },
    closeMenu() {
      store.toggleCollapse(true)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/styles/variables.scss";
.vaw-layout-container {
  height: 100%;
  max-width: 100%;
  overflow-x: hidden;
  .mobile-shadow {
    display: none;
  }
  .layout-mode-ttb {
    margin-top: $logoHeight;
    transition: all $transitionTime;
  }
}
.is-mobile {
  .mobile-shadow {
    background-color: #000000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 997;
  }
  .close-shadow {
    display: none;
  }
  .show-shadow {
    display: block;
    opacity: 0.5;
    transition: all $transitionTime;
  }
}
</style>
