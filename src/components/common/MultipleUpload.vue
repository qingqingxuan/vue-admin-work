<template>
  <div class="upload-container">
    <el-upload
      class="upload-wrapper"
      drag
      :action="action"
      multiple
      :data="extraData"
      :headers="headers"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div
        slot="tip"
        class="el-upload__tip"
      >
        <slot name="tip"></slot>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'MultipleUpload',
  props: {
    action: {
      type: String,
      default: ''
    },
    headers: {
      type: Object,
      default: () => {
        return {}
      }
    },
    extraData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    fileList: {
      type: Array,
      default: function () {
        return []
      }
    },
    extraStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    fileName: {
      type: String,
      default: 'file'
    },
    beforeUpload: {
      type: Function,
      default: function () {}
    }
  },
  methods: {
    handleSuccess(res, file, fileList) {
      console.log(res)
      console.log(file)
      console.log(fileList)
    },
    handleError(err, file, fileList) {
      console.log(err)
      console.log(file)
      console.log(fileList)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-upload {
  border: 1px dashed #8c939d;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .el-upload:hover {
  border-color: #409eff;
}
.upload-container {
  text-align: center;
  .upload-wrapper {
    width: 100%;
    height: 100%;
  }
}
</style>
