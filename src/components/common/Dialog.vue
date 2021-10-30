<template>
  <el-dialog
    :title="innerTitle"
    :visible.sync="dialogVisible"
    :close-on-click-modal="closeOnClickModal"
    :width="isMobileScreen ? '85%' : '45%'"
  >
    <div class="content-wrapper">
      <slot></slot>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <slot name="footer-button">
      </slot>
      <el-button
        v-if="showCancel"
        size="mini"
        @click="dialogVisible = false"
      >取 消</el-button>
      <el-button
        v-if="!submitButton"
        type="primary"
        size="mini"
        @click="onConfirm"
      >确 定</el-button>
      <submit-button
        v-else
        :on-submit="onConfirm"
      />
    </span>
  </el-dialog>
</template>

<script>
import SubmitButton from './SubmitButton.vue'
export default {
  components: { SubmitButton },
  props: {
    title: {
      type: String,
      default: '提示'
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    submitButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      innerTitle: this.title
    }
  },
  computed: {
    isMobileScreen() {
      return this.$layoutStore.state.device === 'mobile'
    }
  },
  methods: {
    show(config = {}) {
      config.beforeShowAction && config.beforeShowAction()
      this.autoClose = config.autoClose || false
      this.innerTitle = config.innerTitle || this.title || '提示'
      this.onConfirmCallback = config.onConfirmCallback
      this.dialogVisible = true
    },
    close(afterAction) {
      this.dialogVisible = false
      afterAction && afterAction()
    },
    toggle() {
      this.dialogVisible = !this.dialogVisible
    },
    onConfirm(callback) {
      if (this.autoClose) {
        this.dialogVisible = false
      }
      callback && callback instanceof Function && callback()
      this.onConfirmCallback && this.onConfirmCallback()
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  max-height: 50vh;
  padding: 0 10px;
  overflow: auto;
}
</style>
