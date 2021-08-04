<template>
  <div class="main-container">
    <el-card
      :body-style="{padding: '10px'}"
      style="height: 100%"
    >
      <template #header>
        <el-page-header
          content="上一个页面传递过来的参数"
          @back="goBack"
        />
      </template>
      <div class="padding text-lg">
        通过 query 传递过来的参数:
      </div>
      <div class="padding text-lg">
        {{ queryInfo }}
      </div>
      <div class="padding text-lg">
        通过params传递过来的参数:
      </div>
      <div class="padding text-lg">
        {{ paramInfo }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'NextPageInfo',
  computed: {
    queryInfo() {
      if (this.$route.query) {
        return JSON.stringify(this.$route.query)
      } else {
        return ''
      }
    },
    paramInfo() {
      if (this.$route.params) {
        return JSON.stringify(this.$route.params)
      } else {
        return ''
      }
    }
  },
  methods: {
    goBack() {
      this.$store.dispatch('router/removeRoute', this.$route).then(_ => {
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
