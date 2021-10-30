<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="right">
        <el-button
          v-if="isInited('addItemModel')"
          v-permission="['admin', 'editor']"
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="onAddItem"
        >添加
        </el-button>
        <el-button
          v-if="isInited('deleteItemsModel')"
          type="danger"
          size="mini"
          icon="el-icon-delete"
          @click="onDeleteMultiItem"
        >删除
        </el-button>
      </template>
    </TableHeader>
    <TableBody ref="tableBody">
      <template #tableHeader>
        <div class="flex justify-between padding">
          <el-link :underline="false">表格设置</el-link>
          <div>
            <span class="margin-right">
              <el-checkbox v-model="tableConfig.border">表格边框</el-checkbox>
            </span>
            <span class="margin-right">
              <el-checkbox v-model="tableConfig.stripe">斑马纹</el-checkbox>
            </span>
            <el-tooltip
              class="item"
              effect="dark"
              content="刷新页面"
              placement="top"
            >
              <el-button
                circle
                type="success"
                icon="el-icon-refresh"
                size="mini"
                @click="doRefresh"
              />
            </el-tooltip>
            <SortableTable
              class="margin-left"
              :table-props="tableProps"
              @update="onUpdateTable"
            />
          </div>
        </div>
      </template>
      <template>
        <el-table
          ref="table"
          v-loading="tableLoading"
          :data="dataList"
          :header-cell-style="tableConfig.headerCellStyle"
          :size="tableConfig.size"
          :stripe="tableConfig.stripe"
          :border="tableConfig.border"
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
            v-for="item of tableProps"
            :key="item.props"
            align="center"
            :prop="item.prop"
            :label="item.title"
          >
            <template slot-scope="scope">
              <div
                v-if="item.prop === 'gender'"
                class="gender-container flex justify-center align-center"
              >
                <img
                  class="gender-icon"
                  :src="scope.row.gender === 0 ? require('@/assets/icon_sex_man.png') : require('@/assets/icon_sex_woman.png')"
                />
                <span>{{ scope.row.gender === 0 ? '男' : '女' }}</span>
              </div>
              <div
                v-else-if="item.prop === 'vip'"
                class="avatar-container"
              >
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
              <div v-else>{{ scope.row[item.prop] }}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                v-if="isInited('updateItemModel')"
                type="text"
                @click="onUpdateItem(scope.row)"
              >编辑</el-button>
              <el-button
                v-if="isInited('deleteItemsModel')"
                type="text"
                @click="onDeleteItem(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </TableBody>
    <TableFooter
      :page-size="pageModel.pageSize"
      :total-size="pageModel.totalSize"
      @pageSizeChanged="pageSizeChanged"
      @currentChanged="currentChanged"
      @onRefresh="doRefresh"
    />
    <Dialog
      ref="dialog"
      v-draggable
      :submit-button="true"
    >
      <template>
        <BaseForm
          ref="baseForm"
          :form-items="formItems"
        >
          <template #extra>
            <el-form-item label="上传头像">
              <SingleUpload
                action="http://test.youcanedu.net:8881/yx/uploadSpellingTextBookCoverImage"
                :headers="{'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJBdXRob3JpemF0aW9uIjoiUk9MRV9hZG1pbiwiLCJ1c2VyRW50aXR5SWQiOjE4LCJ1c2VyRW50aXR5TmFtZSI6IueuoeeQhuWRmCIsInVzZXJFbnRpdHlQaG9uZSI6IjE4ODAwMDAwMDA4Iiwic3ViIjoi566h55CG5ZGYIiwiZXhwIjoxNjE2MTQ2MjQwfQ.TZS59WlhzJwkbk60OhE7xJMJ2XlIY3gBo_Cnh8yqCooKfyquS_IbSH-d6___nVNAhrMzNq3qDMM2sTZpiQ2IDA`}"
                file-name="textBookCoverFile"
                :extra-style="{width: '100px', height: '100px'}"
                :multiple="true"
                :image-path="userModel.avatar"
                :before-upload="beforeUpload"
                @onSingleSuccess="onSingleSuccess"
              />
            </el-form-item>
          </template>
        </BaseForm>
      </template>
    </Dialog>
  </div>
</template>

<script>
import TableMixin, { PageModelMixin } from '@/mixins/TableMixin'
import {
  GetDataMixin,
  AddItemMixin,
  DeleteItemsMixin,
  UpdateItemMixin,
  RefreshActionMixin
} from '@/mixins/ActionMixin'
import SingleUpload from '@/components/common/SingleUpload.vue'
import BaseForm from '@/components/common/BaseForm.vue'
import { formBuilder } from '@/utils/form'
import draggable from '@/directive/draggable'
export default {
  name: 'TableCustom',
  components: { SingleUpload, BaseForm },
  directives: { draggable },
  mixins: [
    TableMixin,
    PageModelMixin,
    GetDataMixin,
    AddItemMixin,
    DeleteItemsMixin,
    UpdateItemMixin,
    RefreshActionMixin
  ],
  data() {
    return {
      tableProps: [
        {
          title: '姓名',
          prop: 'nickName',
          checked: true
        },
        {
          title: '头像',
          prop: 'vip',
          checked: true
        },
        {
          title: '性别',
          prop: 'gender',
          checked: true
        },
        {
          title: '地址',
          prop: 'address',
          checked: true
        }
      ],
      userModel: {
        address: '',
        avatar: '',
        gender: 1,
        id: 1,
        lastLoginIp: '',
        lastLoginTime: '',
        nickName: '',
        status: 0,
        vip: 1
      }
    }
  },
  computed: {
    checkedTablePropes() {
      return this.tableProps.filter(it => it.checked).map(it => it.props)
    },
    formItems() {
      return formBuilder()
        .formItem({
          label: '用户名称',
          type: 'input',
          name: 'nickName',
          value: this.userModel.nickName,
          maxLength: 50,
          inputType: 'text',
          placeholder: '请输入用户名称',
          associatedOption: 'address',
          validator: ({ value, placeholder }, { value: assValue }) => {
            if (!value) {
              this.$errorMsg(placeholder)
              return false
            }
            if (!assValue) {
              this.$errorMsg('地址不正确')
              return false
            }
            return true
          }
        })
        .formItem({
          label: '用户性别',
          type: 'radio-group',
          name: 'gender',
          style: 'button',
          value: this.userModel.gender,
          radioOptions: [
            {
              label: '男',
              value: 0
            },
            {
              label: '女',
              value: 1
            }
          ]
        })
        .formItem({
          label: '联系地址',
          type: 'input',
          name: 'address',
          value: this.userModel.address,
          maxLength: 50,
          inputType: 'textarea',
          row: 5,
          placeholder: '请输入联系地址'
        })
        .formItem({
          label: '用户状态',
          type: 'radio-group',
          name: 'status',
          value: this.userModel.status,
          radioOptions: [
            {
              label: '正常',
              value: 1
            },
            {
              label: '禁用',
              value: 0
            }
          ]
        })
        .build().formItems
    }
  },
  mounted() {
    this.initGetData({
      url: this.$urlPath.getTableList,
      params: () => this.withPageInfoData(),
      beforeAction: () => {
        this.tableLoading = true
      },
      afterAction: () => {
        this.tableLoading = false
      },
      onResult: (res) => {
        this.handleSuccess(res)
      }
    }).then(() => {
      this.getData()
    })
    this.initAddItem({
      url: this.$urlPath.getTableList,
      params: () => {
        return this.$refs.baseForm.generatorParams()
      },
      onAddItem: () => {
        this.$refs.dialog.show({
          beforeShowAction: () => {
            this.userModel = {
              address: '',
              avatar: '',
              gender: 1,
              id: 1,
              lastLoginIp: '',
              lastLoginTime: '',
              nickName: '',
              status: 0,
              vip: 1
            }
          },
          onConfirmCallback: () => {
            const checkResult = this.$refs.baseForm.checkParams()
            if (checkResult) {
              this.doAddItem()
            }
          }
        })
      },
      onResult: (res) => {
        this.$successMsg('用户信息模拟添加成功')
        const params = this.$refs.baseForm.generatorParams()
        params.avatar =
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201411%2F29%2F20141129194517_5Z2Lu.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615013287&t=832537ff575fa5c5bb2e65b71c2b52fb'
        params.lastLoginIp = '221.189.176.207'
        params.lastLoginTime = '2021-03-22 20:39:25'
        this.dataList.unshift({
          ...params
        })
        this.$refs.dialog.close()
      },
      onError: (error) => {
        this.$errorMsg(error)
        this.$refs.dialog.close()
      }
    })
    this.initUpdateItem({
      url: this.$urlPath.updateUserInfo,
      params: () => {
        return this.$refs.baseForm.generatorParams()
      },
      onUpdateItem: (item) => {
        this.$refs.dialog.show({
          beforeShowAction: () => {
            this.userModel.nickName = item.nickName
            this.userModel.gender = item.gender
            this.userModel.address = item.address
            this.userModel.status = item.status
            this.userModel.avatar = item.avatar
          },
          onConfirmCallback: () => {
            if (this.$refs.baseForm.checkParams()) {
              this.doUpdateItem()
            }
          }
        })
      },
      onResult: (res) => {
        this.$successMsg('用户信息模拟修改成功')
        this.$refs.dialog.close()
      },
      onError: (error) => {
        this.$errorMsg(error)
        this.$refs.dialog.close()
      }
    })
    this.initDeleteItem({
      url: this.$urlPath.getTableList,
      params: () => {
        return {
          ids: this.tempItem.id
        }
      },
      multiParams: () => {
        return {
          ids: this.selectedItems.map((it) => it.id).join(',')
        }
      },
      onDeleteItem: (item) => {
        this.tempItem = item
        this.$showConfirmDialog('确定要删除此用户信息吗？').then((_) => {
          this.$successMsg('用户模拟删除成功')
          // 纯前端环境下，可以使用这种方式模拟，真实的环境下，要替换成 this.doDeleteItem('single')
          this.dataList = this.dataList.filter((it) => it.id !== item.id)
        })
      },
      onDeleteMultiItem: () => {
        this.$showConfirmDialog('确定要删除这些用户信息吗？').then((_) => {
          this.$successMsg('用户模拟删除成功')
          // 纯前端环境下，可以使用这种方式模拟，真实的环境下，要替换成 this.doDeleteItem('multi')
          const tempIds = this.selectedItems.map((it) => it.id)
          this.dataList = this.dataList.filter((it) => !tempIds.includes(it.id))
        })
      },
      onResult: () => { },
      onError: () => { }
    })
  },
  methods: {
    onUpdateTable(tableProps) {
      this.tableProps = tableProps.filter(it => it.checked)
    },
    onSingleSuccess({ res }) {
      if (res.status !== 200) {
        this.$errorMsg(res.msg)
      } else {
        this.userModel = res.obj
      }
    },
    beforeUpload(file) {
      const size = file.size
      if (size / 1024 > 500) {
        this.$errorMsg('上传文件最大不能超过500K')
        return false
      }
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
