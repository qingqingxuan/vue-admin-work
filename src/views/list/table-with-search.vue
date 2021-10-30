<template>
  <div class="main-container">
    <TableHeader
      :can-collapsed="likeSearchModel.conditionItems && likeSearchModel.conditionItems.length !== 0"
      :search-model="likeSearchModel.conditionItems"
      :default-collapsed-state="true"
      title="查询条件"
      @doSearch="doSearch"
      @resetSearch="resetSearch"
    />
    <TableBody ref="tableBody">
      <template>
        <el-table
          ref="table"
          v-loading="tableLoading"
          :data="filterList || dataList"
          :header-cell-style="tableConfig.headerCellStyle"
          :size="tableConfig.size"
          :stripe="tableConfig.stripe"
          :border="tableConfig.border"
        >
          <el-table-column
            align="center"
            label="序号"
            width="80"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="名称"
            prop="nickName"
          />
          <el-table-column
            align="center"
            label="头像"
          >
            <template slot-scope="scope">
              <div class="avatar-container">
                <el-image
                  :src="require('@/assets/img_avatar_default.png')"
                  class="avatar"
                  :class="{'avatar-vip' : scope.row.vip === 1}"
                />
                <img
                  v-if="scope.row.vip === 1"
                  class="vip"
                  :src="require('@/assets/img_vip_icon.png')"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="性别"
            prop="gender"
          >
            <template slot-scope="scope">
              <div class="gender-container flex justify-center align-center">
                <img
                  class="gender-icon"
                  :src="scope.row.gender === 0 ? require('@/assets/icon_sex_man.png') : require('@/assets/icon_sex_woman.png')"
                />
                <span>{{ scope.row.gender === 0 ? '男' : '女' }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="状态"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
              />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="地址"
            prop="address"
          />
          <el-table-column
            align="center"
            label="上次登录时间"
            prop="lastLoginTime"
            width="160px"
          />
          <el-table-column
            align="center"
            label="上次登录IP"
            prop="lastLoginIp"
            width="130px"
          />
        </el-table>
      </template>
    </TableBody>
    <TableFooter
      :current-page="pageModel.currentPage"
      :page-size="pageModel.pageSize"
      :total-size="pageModel.totalSize"
      @pageSizeChanged="pageSizeChanged"
      @currentChanged="currentChanged"
      @onRefresh="doRefresh"
    />
  </div>
</template>

<script>
import TableMixin, { PageModelMixin } from '@/mixins/TableMixin'
import {
  LikeSearchMixin,
  GetDataMixin,
  RefreshActionMixin
} from '@/mixins/ActionMixin'
export default {
  name: 'TableWithSearch',
  mixins: [
    TableMixin,
    LikeSearchMixin,
    GetDataMixin,
    PageModelMixin,
    RefreshActionMixin
  ],
  data() {
    return {
      filterList: null
    }
  },
  created() {
    this.initLikeSearch({
      url: this.$urlPath.getTableList,
      conditionItems: [
        {
          name: 'name',
          label: '用户姓名',
          value: '',
          type: 'input',
          placeholder: '请输入用户姓名',
          span: 8
        },
        {
          name: 'sex',
          label: '用户姓别',
          value: '',
          type: 'select',
          placeholder: '请选择用户姓别',
          selectOptions: [
            {
              label: '男',
              value: 0
            },
            {
              label: '女',
              value: 1
            }
          ],
          span: 8
        }
      ],
      extraParams: () => this.withPageInfoData(),
      onResult: (res) => {
        this.handleSuccess(res)
      },
      onError: (error) => {
        console.log(error)
      }
    })
  },
  mounted() {
    this.initGetData({
      url: this.$urlPath.getTableList,
      params: () => this.withPageInfoData(),
      onResult: (res) => {
        this.handleSuccess(res)
      }
    }).then((_) => {
      this.getData()
    })
  },
  methods: {
    // 重写 doSearch方法，自定义实现过程
    doSearch() {
      const { name, sex } = this.generatorSearchParams()
      this.filterList = this.dataList.filter(it => {
        if (name && sex) {
          return it.nickName.indexOf(name) !== -1 && parseInt(it.gener) === parseInt(sex)
        }
        if (name) {
          return it.nickName.indexOf(name) !== -1
        }
        if (sex !== '') {
          return parseInt(it.gender) === parseInt(sex)
        }
        return true
      })
    },
    // 重写 resetSearch方法，自定义实现过程
    resetSearch() {
      this.likeSearchModel.conditionItems && this.likeSearchModel.conditionItems.forEach(it => { it.value = '' })
      this.filterList = null
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-container {
  position: relative;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  vertical-align: middle;
  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .avatar-vip {
    border: 2px solid #cece1e;
  }
  .vip {
    position: absolute;
    top: 0;
    right: -9px;
    width: 15px;
    transform: rotate(60deg);
  }
}
.gender-container {
  .gender-icon {
    width: 20px;
  }
}
</style>
