<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="right">
        <el-button
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
          row-key="menuUrl"
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
            label="菜单名称"
            prop="menuName"
          />
          <el-table-column
            align="center"
            label="菜单地址"
            prop="menuUrl"
          />
          <el-table-column
            align="center"
            label="创建时间"
            prop="createTime"
            width="160px"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.createTime || '--' }}</div>
            </template>
          </el-table-column>
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
        <el-form
          ref="baseForm"
          :model="menuModel"
          :rules="formRules"
          label-width="80px"
          label-position="right"
        >
          <el-form-item label="上级菜单">
            <el-col :span="20">
              <el-select
                v-model="menuModel.parentItem"
                size="small"
                placeholder="请输入菜单名称"
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) of dataList"
                  :key="index"
                  :label="item.menuName"
                  :value="item.menuUrl"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item
            label="菜单名称"
            prop="name"
          >
            <el-col :span="20">
              <el-input
                v-model="menuModel.name"
                size="small"
                placeholder="请输入菜单名称"
              />
            </el-col>
          </el-form-item>
          <el-form-item
            label="菜单地址"
            prop="url"
          >
            <el-col :span="20">
              <el-input
                v-model="menuModel.url"
                size="small"
                placeholder="请输入菜单地址"
              >
                <template slot="prepend">{{ menuModel.parentItem ? menuModel.parentItem : '/' }}</template>
              </el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </template>
    </Dialog>
  </div>
</template>

<script>
import TableMixin from '@/mixins/TableMixin'
import { uuid } from '@/utils/utils'
import {
  UpdateItemMixin,
  GetDataMixin,
  AddItemMixin,
  DeleteItemsMixin
} from '@/mixins/ActionMixin'
export default {
  name: 'Menu',
  mixins: [
    TableMixin,
    GetDataMixin,
    UpdateItemMixin,
    AddItemMixin,
    DeleteItemsMixin
  ],
  data() {
    return {
      menuModel: {
        id: uuid(),
        name: '',
        parentItem: '',
        url: '',
        createTime: ''
      },
      formRules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输入菜单地址', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.initGetData({
      url: this.$urlPath.getMenuList,
      onResult: (res) => {
        this.handleSuccess(res)
      }
    }).then(this.getData())
    this.initAddItem({
      url: this.$urlPath.getMenuList,
      params: () => {
        return {
          menuName: this.menuModel.name,
          menuUrl: this.menuModel.menuUrl
        }
      },
      onAddItem: () => {
        this.$refs.dialog.show({
          beforeShowAction: () => {
            this.menuModel.name = ''
            this.menuModel.url = ''
          },
          onConfirmCallback: () => {
            this.$refs.baseForm.validate((valid) => {
              if (!valid) return
              this.doAddItem()
            })
          }
        })
      },
      onResult: () => { },
      onError: () => { }
    })
    this.initUpdateItem({
      url: this.$urlPath.getMenuList,
      params: () => {
        return {
          menuName: this.menuModel.name,
          menuUrl: this.menuModel.menuUrl
        }
      },
      onUpdateItem: (item) => {
        this.$refs.dialog.show({
          beforeShowAction: () => {
            this.menuModel.id = item.id
            this.menuModel.name = item.menuName
            this.menuModel.url = item.menuUrl
          },
          onConfirmCallback: () => {
            this.$refs.baseForm.validate((valid) => {
              if (!valid) return
              this.doUpdateItem()
            })
          }
        })
      },
      onResult: () => {
        this.$successMsg('菜单模拟添加成功')
      },
      onError: () => { }
    })
    this.initDeleteItem({
      url: this.$urlPath.getMenuList,
      params: {
        id: this.menuModel.id
      },
      onDeleteItem: (item) => {
        this.menuModel.id = item.id
        if (item.children && item.children.length > 0) {
          this.$errorMsg('当前菜单包含有子菜单，不可删除，请先删除子菜单')
        } else {
          this.$showConfirmDialog(
            '是否要删除此菜单信息，删除后不可恢复？'
          ).then(() => {
            this.$successMsg('菜单模拟删除成功')
          })
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  bottom: 8px;
}
</style>

