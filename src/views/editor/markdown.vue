<template>
  <div class="main-container">
    <div class="editor-container">
      <MarkdownEditor
        ref="markdownEditor"
        v-model="editorText"
        :height="400"
        placeholder="Insert here…"
      />
    </div>
    <div class="margin-top-lg">
      <el-button
        size="small"
        @click="addText"
      >增加文本</el-button>
      <el-button
        size="small"
        @click="addImage"
      >增加图片</el-button>
      <el-button
        size="small"
        type="primary"
        @click="getHTML"
      >预览HTML</el-button>
    </div>
    <div
      v-if="priviewContent"
      class="priview-content padding-xs margin-top"
      v-html="priviewContent"
    ></div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/common/MarkdownEditor'
import SimpleMDE from 'simplemde-w'

export default {
  name: 'Markdown',
  components: {
    MarkdownEditor
  },
  data() {
    return {
      editorText: '',
      priviewContent: ''
    }
  },
  methods: {
    addText() {
      this.$refs.markdownEditor.addText('\n### 新增内容')
    },
    addImage() {
      this.$refs.markdownEditor.addImage(
        '\n![](https://file.iviewui.com/dist/2ecd3b0452aa197097d5131afacab7b8.png)'
      )
    },
    getHTML() {
      this.priviewContent = SimpleMDE.prototype.markdown(this.editorText)
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-container {
  position: relative;
}
.theme-dark .priview-content {
  background: #5a5a5a;
  color: #fff;
}
.priview-content {
  background: #fff;
  color: #333;
}
</style>
