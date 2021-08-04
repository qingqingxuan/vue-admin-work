<template>
  <el-card
    :body-style="{padding: '0'}"
    shadow="never"
    class="main-container"
  >
    <template #header>
      <div class="flex">
        <el-link :underline="false">生成二维码</el-link>
        <el-input
          v-model="qrText"
          class="flex-sub margin-lr"
          size="small"
          placeholder="请输入文本内容"
        />
        <el-button
          type="primary"
          size="mini"
          @click="generatorCode"
        >点击生成</el-button>
      </div>
    </template>
    <div
      v-show="qrUrl"
      class="content-wrappar flex flex-direction justify-center align-center"
    >
      <img
        ref="canvas"
        :src="qrUrl"
        class="canvas"
      />
      <div class="setting-wrapper margin-top">
        <div class="flex justify-between align-center">
          <span class="label">间距</span>
          <el-slider
            v-model="margin"
            :step="1"
            :max="10"
            :min="1"
            class="slider-wrapper"
            @change="onMarginChange"
          />
        </div>
        <div class="flex justify-center align-center margin-top">
          <el-button
            size="mini"
            type="primary"
            @click="changeBgColor"
          >更改背景色</el-button>
          <el-button
            size="mini"
            type="warning"
            @click="changeFrColor"
          >更改前景色</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="restore"
          >恢复原始状态</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import Qrcode from 'qrcode'
export default {
  name: 'Qrcode',
  data() {
    return {
      qrText: '',
      qrUrl: '',
      margin: 1,
      lightColor: '',
      darkColor: ''
    }
  },
  methods: {
    generatorCode() {
      if (!this.qrText) {
        this.$errorMsg('请输入二维码文本内容')
        return
      }
      Qrcode.toDataURL(this.qrText, {
        width: 250,
        margin: this.margin,
        color: {
          dark: this.darkColor,
          light: this.lightColor
        }
      }).then(res => {
        this.qrUrl = res
      })
    },
    onMarginChange() {
      this.generatorCode()
    },
    changeBgColor() {
      this.lightColor = '#ffff00'
      this.generatorCode()
    },
    changeFrColor() {
      this.darkColor = '#ff0000'
      this.generatorCode()
    },
    restore() {
      this.lightColor = ''
      this.darkColor = ''
      this.margin = 1
      this.generatorCode()
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrappar {
  .canvas {
    width: 250px !important;
    height: 250px !important;
    border: 2px solid #f5f5f5;
  }
  .setting-wrapper {
    width: 50%;
    .label {
      width: 50px;
    }
    .slider-wrapper {
      width: 100%;
    }
  }
}
</style>
