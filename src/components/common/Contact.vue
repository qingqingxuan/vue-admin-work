<template>
  <div class="contact-container">
    <div class="code-wrapper">
      <img :src="require('@/assets/qrcode.jpg')" />
    </div>
    <span>关注公众号<strong>{{ officialAccount }}</strong>获取源码</span>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'
import Setting from '@/utils/setting'
export default {
  name: 'Contact',
  data() {
    return {
      qq: Setting.customQQ,
      officialAccount: Setting.officialAccount
    }
  },
  methods: {
    copy() {
      const clipboard = new ClipboardJS('.copy')
      clipboard.on('success', (e) => {
        this.$successMsg('复制成功~')
      })
      clipboard.on('error', (e) => {
        this.$errorMsg('复制失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-container {
  width: 100%;
  text-align: center;
  .code-wrapper {
    width: 80%;
    margin: 0 auto;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
  .copy {
    width: 50px;
    background-color: #409eff;
    font-size: 12px;
    color: #fff;
    padding: 5px;
    border-radius: 3px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .copy:active {
    background-color: #1989fa;
  }
}
</style>
