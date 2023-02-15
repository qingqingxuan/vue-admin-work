<template>
  <div
    class="editor-wrapper"
    :style="{ zIndex: zIndex, height: height + 50 + 'px'}"
  >
    <textarea ref="markdownEditor"></textarea>
  </div>
</template>

<script>
import 'simplemde-w/dist/simplemde.min.css'
import 'font-awesome/css/font-awesome.min.css'
import SimpleMDE from 'simplemde-w'
export default {
  name: 'MarkdowEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 1
    },
    height: {
      type: [Number, String],
      default: 'auto'
    }
  },
  data() {
    return {
      simpleMDE: null,
      innerInput: false
    }
  },
  watch: {
    value(newVal) {
      if (this.innerInput) {
        this.innerInput = false
      } else {
        this.simpleMDE.value(newVal)
      }
    }
  },
  mounted() {
    this.init()
  },
  destroyed() {
    this.simpleMDE.toTextArea()
    this.simpleMDE = null
  },
  methods: {
    init() {
      this.simpleMDE = new SimpleMDE({
        element: this.$refs.markdownEditor,
        spellChecker: false,
        placeholder: this.placeholder,
        hideIcons: ['side-by-side', 'fullscreen']
      })
      this.simpleMDE.codemirror.on('change', () => {
        this.innerInput = true
        const val = this.simpleMDE.value()
        this.$emit('input', val)
      })
    },
    addText(text) {
      this.simpleMDE.value(this.simpleMDE.value() + text)
    },
    addImage(imgInfo) {
      this.simpleMDE.value(this.simpleMDE.value() + imgInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-wrapper {
  position: relative;
  ::v-deep .CodeMirror {
    height: calc(100% - 50px);
  }
}
</style>
