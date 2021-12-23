<template>
  <div class="notify-container">
    <div class="icon-wrapper">
      <i class="el-icon-star-on"></i>
    </div>
    <div class="flex-sub margin-left-xs">
      <div class="title text-cut">请下午三点半到大会议室开项目需求分析会，要求与会人员必须按时到场</div>
      <div class="time">1小时前</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageItem'
}
</script>

<style lang="scss" scoped>
.notify-container {
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  .icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    min-width: 30px;
    max-width: 30px;
    height: 30px;
    border-radius: 50%;
    color: currentColor;
    background-color: #ffce3d;
    font-size: 18px;
  }
  .title {
    font-size: 14px;
  }
  .time {
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>
