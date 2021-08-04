<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="right">
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete"
          @click="onDeleteMultiItem"
        >删除
        </el-button>
      </template>
    </TableHeader>
    <TableBody ref="tableBody">
      <template>
        <el-table
          ref="table"
          v-loading="tableLoading"
          :data="dataList"
          :header-cell-style="tableConfig.headerCellStyle"
          :size="tableConfig.size"
          :stripe="tableConfig.stripe"
          :border="false"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="45"
          />
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
                  :src="require('@/assets/img_avatar_01.jpeg')"
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
            label="操作"
          >
            <template slot-scope="scope">
              <el-link
                type="danger"
                :underline="false"
                @click="onDeleteItem(scope.row)"
              >删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </TableBody>
    <TableFooter
      :current-page="pageModel.currentPage"
      :page-size="pageModel.pageSize"
      :total-size="pageModel.totalSize"
      @pageSizeChanged="pageSizeChanged"
      @currentChanged="currentChanged"
    />
  </div>
</template>

<script>
import TableMixin, { PageModelMixin } from '@/mixins/TableMixin'
import { GetDataMixin, DeleteItemsMixin } from '@/mixins/ActionMixin'
export default {
  name: 'Table',
  mixins: [TableMixin, PageModelMixin, GetDataMixin, DeleteItemsMixin],
  data() {
    return {
      userModel: {}
    }
  },
  mounted() {
    this.initGetData({
      url: this.$urlPath.getTableList,
      params: this.withPageInfoData(),
      multiParams: (item) => {
        return {
          ids: item.map((it) => it.id).join(',')
        }
      },
      onResult: (res) => {
        this.handleSuccess(res)
      },
      afterAction: (res) => { }
    }).then((_) => {
      this.getData()
    })
    this.initDeleteItem({
      url: this.$urlPath.getTableList,
      params: () => {
        return { id: this.userMode.id }
      },
      multiParams: (items) => {
        return {
          ids: items.map((it) => it.id).join(',')
        }
      },
      onDeleteItem: (item) => {
        this.userMode = item
        this.$showConfirmDialog('确定要删用户信息吗？').then((_) => {
          // 真实环境下了要调用此方法进行删除 this.doDeleteItem('single')
          this.dataList = this.dataList.filter((it) => it.id !== item.id)
        })
      },
      onDeleteMultiItem: () => {
        if (this.selectedItems.length === 0) {
          this.$errorMsg('请选择要删除的用户')
          return
        }
        this.$showConfirmDialog('确定要删这些用户信息吗？').then((_) => {
          // 纯前端环境下，可以使用这种方式模拟，真实的环境下，要替换成 this.doDeleteItem('multi')
          const tempIds = this.selectedItems.map((it) => it.id)
          this.dataList = this.dataList.filter((it) => !tempIds.includes(it.id))
        })
      },
      onResult: (res) => {
        this.$successMsg('模拟删除成功')
      },
      onError: (error) => {
        this.$errorMsg(error)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.avatar-container {
  position: relative;
  width: 30px;
  margin: 0 auto;
  vertical-align: middle;
  .avatar {
    width: 100%;
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
