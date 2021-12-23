<template>
  <div class="notify-container">
    <div class="icon-wrapper">
      <i class="el-icon-message-solid"></i>
    </div>
    <div class="content">
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
    background-color: rgb(254, 92, 87);
    font-size: 18px;
  }
  .content {
    flex: 1;
    .title {
      font-size: 14px;
      color: currentColor;
    }
    .time {
      margin-top: 10px;
      font-size: 12px;
    }
  }
}
</style>
