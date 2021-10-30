<template>
  <div class="main-container">
    <el-card
      :body-style="{padding: '10px'}"
      style="height: 100%"
    >
      <template #header>
        <div class="text-bold padding-tb-xs text-sm">跳转到下一页</div>
      </template>
      <div>
        <el-button
          type="primary"
          size="small"
          @click="nextPageQuery"
        >传递 query 参数</el-button>
        <el-button
          type="warning"
          size="small"
          @click="nextPageParams"
        >传递 params 参数</el-button>
        <el-button
          type="danger"
          size="small"
          @click="nextPage"
        >混合传递参数</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ToNextPage',
  methods: {
    nextPage() {
      this.$router.push(
        {
          name: 'nextPageInfo',
          query: { id: 10, name: '张三', age: 20 },
          params: { param1: 'this is param1', param2: 'this is param2', param3: 'this is param3' }
        }
      )
    },
    nextPageQuery() {
      this.$router.push(
        {
          name: 'nextPageInfo',
          query: { id: 10, name: '张三', age: 20 }
        }
      )
    },
    nextPageParams() {
      this.$router.push(
        {
          name: 'nextPageInfo',
          params: { param1: 'this is param1', param2: 'this is param2', param3: 'this is param3' }
        }
      )
    }
  }
}
</script>

<style lang="scsss" scoped>
</style>
