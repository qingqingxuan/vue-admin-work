<template>
  <div class="notify-container flex justify-start">
    <div class="flex justify-center align-center icon-wrapper">
      <i class="el-icon-message-solid"></i>
    </div>
    <div class="flex-sub margin-left-xs">
      <div class="title text-cut">请下午三点半到大会议室开项目需求分析会，要求与会人员必须按时到场</div>
      <div class="time">1小时前</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotifyItem'
}
</script>

<style lang="scss" scoped>
.notify-container {
  padding: 10px;
  .icon-wrapper {
    width: 30px;
    min-width: 30px;
    max-width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #fff;
    background-color: rgb(254, 92, 87);
    font-size: 18px;
  }
  .title {
    font-size: 14px;
    color: #333;
  }
  .time {
    margin-top: 10px;
    font-size: 12px;
    color: #888;
  }
}
</style>
