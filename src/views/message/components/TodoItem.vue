<template>
  <div class="notify-container">
    <div class="title text-cut">请下午三点半到大会议室开项目需求分析会，要求与会人员必须按时到场</div>
    <div class="flex justify-end margin-top-xs">
      <el-tag
        type="primary"
        size="mini"
      >进行中</el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem'
}
</script>

<style lang="scss" scoped>
.notify-container {
  padding: 10px;
  .title {
    font-size: 14px;
    color: #333;
  }
}
</style>
