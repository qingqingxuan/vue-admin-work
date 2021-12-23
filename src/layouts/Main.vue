<template>
  <transition
    name="fade-transform"
    mode="out-in"
  >
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
  </transition>
</template>

<script>
import store from './store/index'
export default {
  name: 'Main',
  data() {
    return {
      state: store.state
    }
  },
  computed: {
    cachedViews() {
      return this.state.cachedView
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>
