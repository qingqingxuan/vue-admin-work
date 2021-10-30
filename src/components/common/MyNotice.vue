<template>
  <div
    class="my-notice-container"
    :class="{ 'tran-wrapper': isShow }"
  >
    <div class="flex justify-between title-wrapper">
      <span class="text-bold">提示</span>
      <span
        class="el-icon-close text-lg"
        @click="close"
      ></span>
    </div>
    <div class="content-wrapper">
      您当前正在浏览 vue admin work 的示例，可能需要以下服务：
    </div>
    <div class="padding-tb">
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-shopping-cart-full"
        @click="showGetSource"
      >获取源码</el-button>
      <el-button
        size="mini"
        type="danger"
        icon="el-icon-setting"
        @click="showProjectInfo"
      >项目信息</el-button>
      <el-button
        size="mini"
        icon="el-icon-chat-dot-square"
        @click="showContact"
      >咨询</el-button>
    </div>
    <Dialog
      ref="projectInfoDialog"
      title="项目基本配置信息"
    >
      <template>
        <ProjectInfo />
      </template>
    </Dialog>
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
    <Dialog
      ref="getSourceDialog"
      title="关于源码"
    >
      <template>
        <GetSource />
      </template>
    </Dialog>
  </div>
</template>

<script>
import ProjectInfo from './ProjectInfo'
import Contact from './Contact'
import GetSource from './GetSource'
export default {
  name: 'MyNotice',
  components: { ProjectInfo, Contact, GetSource },
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    setTimeout((_) => {
      this.isShow = true
    }, 1500)
  },
  methods: {
    showGetSource() {
      this.close()
      this.$refs.getSourceDialog.show()
    },
    showProjectInfo() {
      this.close()
      this.$refs.projectInfoDialog.show()
    },
    showContact() {
      this.close()
      this.$refs.contactDialog.show()
    },
    show() {
      this.isShow = true
    },
    close() {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.dark {
  .my-notice-container {
    background-color: #000000;
    color: #f5f5f5;
  }
}
.light {
  .my-notice-container {
    background-color: #ffffff;
    color: #333333;
  }
}
.my-notice-container {
  position: fixed;
  top: 20px;
  right: -320px;
  z-index: 9999;
  width: 320px;
  border-radius: 5px;
  padding: 0 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  .title-wrapper {
    padding: 10px 0;
    border-bottom: 1px solid #e2e2e2;
  }
  .content-wrapper {
    padding: 10px 0 0 0;
    line-height: 18px;
  }
}
.tran-wrapper {
  position: fixed;
  right: 10px;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>
