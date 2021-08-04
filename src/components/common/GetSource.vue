<template>
  <div class="get-source-container">
    <el-link
      type="primary"
      :underline="false"
    >
      获取说明：
    </el-link>
    <div class="margin-tb">
      <ul>
        <li>
          关注公众号
          <el-link
            type="danger"
            @click="showContact"
          >知码前端</el-link>
          分享最新前端知识，框架源码更新说明等服务
        </li>
        <li>
          VIP专属问题解答群
        </li>
        <li>
          vue-admin-work源码
        </li>
        <li>
          vue-admin-work使用文档
        </li>
      </ul>
      <div class="margin-left text-red">本框架及源码仅限自己及团队使用</div>
      <div class="margin-left text-red">源码不得二次出售转卖</div>
      <div class="margin-left text-red">恶意分享取消使用资格</div>
    </div>
    <el-link
      type="primary"
      :underline="false"
    >
      联系方式：
    </el-link>
    <div class="margin-tb margin-left flex align-center">
      <span>加QQ客服：<strong>{{ customQQ }}</strong></span>
      <span
        class="copy-custom-qq margin-left"
        :data-clipboard-text="customQQ"
        @click="copy"
      >复制</span>
    </div>
    <Dialog
      ref="contactDialog"
      title="联系我们"
    >
      <template>
        <div style="width: 60%; margin: 0 auto;">
          <Contact />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'
import Setting from '@/utils/setting'
import Contact from './Contact'
export default {
  name: 'GetSource',
  components: { Contact },
  data() {
    return {
      customQQ: Setting.customQQ
    }
  },
  methods: {
    copy() {
      const clipboard = new ClipboardJS('.copy-custom-qq')
      clipboard.on('success', (e) => {
        this.$successMsg('复制成功~')
      })
      clipboard.on('error', (e) => {
        this.$errorMsg('复制失败')
      })
    },
    showContact() {
      this.$refs.contactDialog.show()
    }
  }
}
</script>

<style lang="scss" scoped>
.get-source-container {
  & li {
    margin: 5px 0;
  }
  .copy-custom-qq {
    text-align: center;
    width: 50px;
    background-color: #409eff;
    font-size: 12px;
    color: #fff;
    padding: 5px;
    border-radius: 3px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .copy-custom-qq:active {
    background-color: #1989fa;
  }
}
</style>
