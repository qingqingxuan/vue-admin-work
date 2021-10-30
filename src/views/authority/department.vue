<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="right">
        <el-button
          v-if="isInited('addItemModel')"
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="onAddItem"
        >添加
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
          :border="tableConfig.border"
          row-key="id"
          :tree-props="{children: 'children'}"
        >
          <el-table-column
            align="center"
            label="序号"
            fixed="left"
            width="80"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="部门名称"
            prop="name"
          />
          <el-table-column
            align="center"
            label="部门编号"
            prop="depCode"
          />
          <el-table-column
            align="center"
            label="排序"
            prop="order"
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
            label="创建时间"
            prop="createTime"
            width="160px"
          />
          <el-table-column
            align="center"
            label="操作"
          >
            <template slot-scope="scope">
              <el-link
                type="primary"
                :underline="false"
                @click="onUpdateItem(scope.row)"
              >编辑</el-link>
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
    <Dialog ref="dialog">
      <template>
        <BaseForm
          ref="baseForm"
          :form-items="formItems"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import TableMixin from '@/mixins/TableMixin'
import {
  AddItemMixin,
  DeleteItemsMixin,
  GetDataMixin,
  UpdateItemMixin
} from '@/mixins/ActionMixin'
import { formBuilder } from '@/utils/form'
import BaseForm from '@/components/common/BaseForm.vue'
import { currentDate, uuid } from '@/utils/utils'
const DP_CODE_FLAG = 'dp_code_'
export default {
  name: 'Department',
  components: { BaseForm },
  mixins: [
    TableMixin,
    GetDataMixin,
    AddItemMixin,
    DeleteItemsMixin,
    UpdateItemMixin
  ],
  data() {
    return {
      departmentModel: {
        itemId: 0,
        name: '',
        depCode: '',
        order: 1,
        status: 1
      }
    }
  },
  computed: {
    formItems() {
      return formBuilder()
        .formItem({
          label: '部门名称',
          type: 'input',
          name: 'name',
          value: this.departmentModel.name,
          maxLength: 50,
          inputType: 'text',
          placeholder: '请输入部门名称',
          validator: ({ value, placeholder }) => {
            if (!value) {
              this.$errorMsg(placeholder)
              return false
            }
            return true
          }
        })
        .formItem({
          label: '部门编号',
          type: 'input',
          name: 'depCode',
          value: this.departmentModel.depCode,
          maxLength: 10,
          inputType: 'text',
          placeholder: '请输入部门编号',
          validator: ({ value, placeholder }) => {
            if (!value) {
              this.$errorMsg(placeholder)
              return false
            }
            return true
          }
        })
        .formItem({
          label: '部门状态',
          type: 'radio-group',
          name: 'status',
          value: this.departmentModel.status,
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
      url: this.$urlPath.getDepartmentList,
      onResult: (res) => {
        this.handleSuccess(res)
      }
    }).then((_) => {
      this.getData()
    })
    this.initAddItem({
      url: this.$urlPath.addDepartment,
      params: () => {
        return this.$refs.baseForm.checkParams()
      },
      onAddItem: () => {
        this.$refs.dialog.show({
          beforeShowAction: () => {
            this.departmentModel = {
              itemId: 0,
              name: '',
              depCode: '',
              order: 1,
              status: 1
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
        const item = this.$refs.baseForm.generatorParams()
        if (!item.depCode.startsWith(DP_CODE_FLAG)) {
          item.depCode = DP_CODE_FLAG + item.depCode
        }
        item.itemId = uuid()
        item.order = 1
        item.createTime = currentDate()
        this.dataList.unshift(item)
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
            this.departmentModel.name = item.name
            this.departmentModel.depCode = item.depCode
            this.departmentModel.status = item.status
          },
          onConfirmCallback: () => {
            if (this.$refs.baseForm.checkParams()) {
              this.doUpdateItem()
            }
          }
        })
      },
      onResult: (res) => {
        this.$successMsg('部门信息模拟修改成功')
        this.$refs.dialog.close()
      },
      onError: (error) => {
        this.$errorMsg(error)
        this.$refs.dialog.close()
      }
    })
    this.initDeleteItem({
      url: this.$urlPath.getTableList,
      params: () => { },
      onDeleteItem: (item) => {
        this.departmentModel = item
        this.$showConfirmDialog('确定要删除此部门信息吗？').then((_) => {
          // 真实环境下了要调用此方法进行删除 this.doDeleteItem('single)
          this.dataList = this.dataList.filter(it => it.id !== item.id)
          this.$successMsg('部门信息模拟删除成功')
        })
      },
      onResult: () => { },
      onError: () => { }
    })
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  bottom: 8px;
}
</style>
