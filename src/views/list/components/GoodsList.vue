<template>
  <div
    v-infinite-scroll="load"
    class="goods-wrapper goods-scroll__wrapper"
    :infinite-scroll-disabled="disabled"
  >
    <el-row :gutter="10">
      <el-col
        v-for="item of dataList"
        :key="item.id"
        :xs="24"
        :sm="12"
        :md="6"
        class="col-item"
      >
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <div class="padding text-center">
            <el-image
              style="width: 90%; height: 180px"
              :src="item.image"
              fit="cover"
            />
          </div>
          <div style="padding: 14px">
            <div class="goods-title text-cut-l2">
              {{ item.description }}
            </div>
            <div class="flex justify-between align-center margin-top-xs">
              <span class="text-price text-red text-df">
                {{ Number(item.price).toFixed(2) }}
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="text-center margin-top">
      <div v-if="loading">
        加载中...
      </div>
      <div v-if="noMore">没有更多了</div>
    </div>
  </div>
</template>

<script>
import TableMixin, { PageModelMixin } from '@/mixins/TableMixin'
import { GetDataMixin } from '@/mixins/ActionMixin'
export default {
  name: 'GoodsList',
  mixins: [TableMixin, PageModelMixin, GetDataMixin],
  data() {
    return {
      loading: false,
      noMore: false
    }
  },
  computed: {
    disabled() {
      return this.loading
    }
  },
  mounted() {
    this.initGetData({
      url: this.$urlPath.getCardList,
      params: {
        page: this.pageModel.currentPage,
        pageSize: this.pageModel.pageSize
      },
      onResult: (res) => {
        this.loading = false
        this.dataList.push(...res.data)
        this.noMore = this.dataList.length === res.totalSize
      }
    })
  },
  methods: {
    load() {
      if (this.noMore) return
      this.pageModel.currentPage += 1
      this.loading = true
      setTimeout(_ => {
        this.getData()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.col-item + .col-item {
  margin-bottom: 10px;
}
.goods-wrapper {
  padding: 5px 10px;
  .goods-title {
    color: #666666;
    font-size: 12px;
    line-height: 16px;
  }
}
</style>
