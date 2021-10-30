<template>
  <el-button
    :loading="loadingStatus"
    :type="type"
    :size="size"
    @click="submit"
  >
    {{ text }}
  </el-button>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'small'
    },
    text: {
      type: String,
      default: '提交'
    },
    onSubmit: {
      type: Function,
      default: null,
      required: true
    }
  },
  data() {
    return {
      loadingStatus: false
    }
  },
  methods: {
    closeLoading() {
      this.loadingStatus = false
    },
    submit() {
      this.loadingStatus = true
      const result = this.onSubmit(() => {
        this.loadingStatus = false
      })
      if (result === undefined || result === false) {
        return
      }
      if (result instanceof Promise) {
        result.then(_ => {
          this.loadingStatus = false
        })
      }
    }
  }
}
</script>
