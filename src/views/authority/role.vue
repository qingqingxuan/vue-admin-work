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
            label="角色名称"
            prop="name"
          />
          <el-table-column
            align="center"
            label="角色编号"
            prop="roleCode"
          />
          <el-table-column
            align="center"
            label="角色描述"
            prop="description"
          />
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
                :disabled="scope.row.roleCode === 'ROLE_admin'"
                type="primary"
                :underline="false"
                @click="onUpdateItem(scope.row)"
              >编辑</el-link>
              <el-link
                :disabled="scope.row.roleCode === 'ROLE_admin'"
                type="danger"
                :underline="false"
                @click="onDeleteItem(scope.row)"
              >删除</el-link>
              <el-link
                :disabled="scope.row.roleCode === 'ROLE_admin'"
                type="warning"
                :underline="false"
                @click="showMenu(scope.row)"
              >菜单权限</el-link>
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
    <Dialog
      ref="menuDialog"
      title="菜单权限"
      :submit-button="true"
    >
      <template>
        <el-tree
          :data="menuData"
          show-checkbox
          node-key="menuUrl"
          :default-expanded-keys="defaultExpandedKeys"
          :default-checked-keys="defaultCheckedKeys"
          :props="defaultProps"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import TableMixin from '@/mixins/TableMixin'
import { currentDate, uuid } from '@/utils/utils'
import CRUDMixins from '@/mixins/ActionMixin'
import { formBuilder } from '@/utils/form'
import BaseForm from '@/components/common/BaseForm'
const ROLE_CODE_FLAG = 'ROLE_'
export default {
  name: 'Role',
  components: { BaseForm },
  mixins: [TableMixin, CRUDMixins],
  data() {
    return {
      roleModel: {
        id: 0,
        name: '',
        roleCode: '',
        description: '',
        createTime: ''
      },
      menuData: [],
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      defaultCheckedKeys: [],
      defaultExpandedKeys: []
    }
  },
  computed: {
    formItems() {
      return formBuilder()
        .formItem({
          label: '角色名称',
          type: 'input',
          name: 'name',
          value: this.roleModel.name,
          maxLength: 50,
          inputType: 'text',
          placeholder: '请输入角色名称',
          validator: ({ value, placeholder }) => {
            if (!value) {
              this.$errorMsg(placeholder)
              return false
            }
            return true
          }
        })
        .formItem({
          label: '角色编号',
          type: 'input',
          name: 'roleCode',
          value: this.roleModel.roleCode,
          maxLength: 20,
          inputType: 'text',
          placeholder: '请输入角色编号',
          validator: ({ value, placeholder }) => {
            if (!value) {
              this.$errorMsg(placeholder)
              return false
            }
            return true
          }
        })
        .formItem({
          label: '角色描述',
          type: 'input',
          name: 'description',
          value: this.roleModel.description,
          maxLength: 50,
          inputType: 'text',
          placeholder: '请输入角色描述',
          validator: ({ value, placeholder }) => {
            if (!value) {
              this.$errorMsg(placeholder)
              return false
            }
            return true
          }
        })
        .build().formItems
    }
  },
  mounted() {
    this.initGetData({
      url: this.$urlPath.getRoleList,
      params: {},
      onResult: (res) => {
        this.handleSuccess(res)
      },
      onError: (error) => {
        this.$errorMsg(error)
      }
    }).then((_) => {
      this.getData()
    })
    this.initAddItem({
      url: this.$urlPath.getRoleList,
      params: () => {
        return this.$refs.baseForm.checkParams()
      },
      onAddItem: () => {
        this.$refs.dialog.show({
          beforeShowAction: () => {
            this.roleModel = {
              name: '',
              roleCode: '',
              description: ''
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
        console.log(item)
        if (!item.roleCode.startsWith(ROLE_CODE_FLAG)) {
          item.roleCode = ROLE_CODE_FLAG + item.roleCode
        }
        item.itemId = uuid()
        item.createTime = currentDate()
        this.dataList.unshift(item)
        this.$refs.dialog.close()
      },
      onError: (error) => {
        this.$errorMsg(error)
      }
    })
    this.initUpdateItem({
      url: this.$urlPath.getRoleList,
      params: () => {
        return this.$refs.baseForm.checkParams()
      },
      onUpdateItem: (item) => {
        this.$refs.dialog.show({
          beforeShowAction: () => {
            this.roleModel.name = item.name
            this.roleModel.roleCode = item.roleCode
            this.roleModel.description = item.description
          },
          onConfirmCallback: () => {
            const checkResult = this.$refs.baseForm.checkParams()
            if (checkResult) {
              this.doUpdateItem()
            }
          }
        })
      },
      onResult: () => {
        this.$successMsg('模拟修改角色信息成功')
        this.$refs.dialog.close()
      }
    })
    this.initDeleteItem({
      url: this.$urlPath.getRoleList,
      params: {},
      onDeleteItem: (item) => {
        this.roleModel = item
        this.$showConfirmDialog('确定要删除此角色信息吗？').then((_) => {
          // 真实环境下了要调用此方法进行删除 this.doDeleteItem('single')
          this.dataList = this.dataList.filter((it) => it.id !== item.id)
          this.$successMsg('角色模拟删除成功')
        })
      },
      onResult: () => {},
      onError: () => {
        this.$successMsg('角色模拟删除失败')
      }
    })
  },
  methods: {
    showMenu(item) {
      this.$post({
        url: this.$urlPath.getAllMenuByRoleId,
        data: {
          roleId: item.id
        }
      })
        .then((res) => {
          this.menuData = res.data
          this.defaultCheckedKeys = []
          this.defaultExpandedKeys = []
          this.handleRoleMenusSelected(this.menuData)
          this.$refs.menuDialog.show({
            onConfirmCallback: (cb) => {
              cb && cb()
              this.$successMsg('模拟菜单修改成功')
              this.$refs.menuDialog.close()
            }
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleRoleMenusSelected(menus) {
      menus.forEach((it) => {
        if (it.isSelect) {
          this.defaultCheckedKeys.push(it.menuUrl)
        }
        if (it.children) {
          this.defaultExpandedKeys.push(it.menuUrl)
          this.handleRoleMenusSelected(it.children)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  bottom: 8px;
}
</style>

