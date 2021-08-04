<template>
  <el-card>
    <template #header>
      <div>缓存信息</div>
    </template>
    <el-input
      v-model="content"
      placeholder="请输入信息"
    />
  </el-card>
</template>

<script>
export default {
  name: 'CacheNextChild',
  data() {
    return {
      content: ''
    }
  },
  activated() {
    console.log(this.$layoutStore)
    console.log('activated')
  },
  deactivated() {
    console.log('deactivated')
  }
}
</script>

<style>
</style>
