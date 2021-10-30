<template>
  <div
    v-infinite-scroll="load"
    class="comment-wrapper"
    :infinite-scroll-disabled="disabled"
  >
    <el-card
      v-for="item of dataList"
      :key="item.id"
      :body-style="{padding: '0'}"
      class="item-wrapper"
    >
      <div class="header-wrapper">
        <div class="avatar-wrapper">
          <img
            class="avatar"
            :src="item.avatar"
          />
          <img
            class="vip"
            :src="require('@/assets/img_vip_icon.png')"
          />
        </div>
        <div class="nick-wrapper">
          <span class="nick-name">{{ item.nickName }}</span>
          <el-rate
            v-model="item.rate"
            disabled
            text-color="#ff9900"
          />
        </div>
        <el-tag
          size="mini"
          :type="item.status === 0 ? 'warning' : 'success'"
        >
          {{ item.status === 0 ? '不对外展示' : '对外展示' }}
        </el-tag>
        <div class="flex-sub"></div>
        <div>
          <el-dropdown
            size="mini"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{ type: 'delete', item }">
                删除
              </el-dropdown-item>
              <el-dropdown-item :command="{ type: 'changeStatus', item }">
                {{ item.status === 0 ? '开启对外展示' : '关闭对外展示' }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="content-wrapper">
        {{ item.content }}
      </div>
      <div>
        <el-image
          v-for="(image, index) of item.images"
          :key="index"
          :src="image"
          :preview-src-list="item.images"
          class="content-image"
          fit="cover"
        />
      </div>
    </el-card>
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
  name: 'CommentList',
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
      url: this.$urlPath.getCommentList,
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
    handleCommand({ type, item }) {
      if (type === 'delete') {
        this.$showConfirmDialog('是否要删除此评论？', () => {
          this.dataList.splice(this.dataList.indexOf(item), 1)
          this.$successMsg('评论删除成功')
        })
      } else {
        const tip = item.status === 0 ? '开启' : '关闭'
        this.$showConfirmDialog(`是否要${tip}此评论？`, () => {
          item.status = item.status === 0 ? 1 : 0
          this.$successMsg(`评论${tip}成功`)
        })
      }
    },
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
.comment-wrapper {
  padding: 5px 10px;
  .item-wrapper {
    padding: 10px;
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    border-radius: 5px;
    .header-wrapper {
      display: flex;
      justify-content: flex-start;
      .avatar-wrapper {
        position: relative;
        .avatar {
          border-radius: 50%;
          width: 40px;
          height: 40px;
          border: 3px solid #f5f5f5;
        }
        .vip {
          position: absolute;
          top: -13px;
          right: -13px;
          width: 30px;
          height: 30px;
          transform: rotate(45deg);
        }
      }
      .nick-wrapper {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .nick-name {
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
    .content-wrapper {
      font-size: 14px;
      margin: 5px 0;
      line-height: 20px;
    }
    .content-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
    .content-image + .content-image {
      margin-left: 10px;
    }
  }
}
</style>
