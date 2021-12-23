<template>
  <keep-alive :include="cachedViews">
    <router-view :key="key" />
  </keep-alive>
</template>
<script>
import store from './store/index'
export default {
  name: 'RouterViewLayout',
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
