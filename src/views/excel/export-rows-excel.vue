<template>
  <div class="main-container">
    <TableHeader>
      <template slot="right">
        <el-button
          type="primary"
          size="mini"
          @click="exportExcel"
        >导出选中的Excel
        </el-button>
      </template>
    </TableHeader>
    <TableBody ref="tableBody">
      <template>
        <el-table
          ref="table"
          :data="dataList"
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
            label="性别"
            prop="gender"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.gender === 0 ? '男' : '女' }}</span>
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
  </div>
</template>

<script>
import TableMixin from '@/mixins/TableMixin'
import { GetDataMixin, MultiSelection } from '@/mixins/ActionMixin'
import XLSX from 'xlsx'
export default {
  name: 'ExportExcel',
  mixins: [TableMixin, GetDataMixin, MultiSelection],
  mounted() {
    this.initGetData({
      url: this.$urlPath.getTableList,
      params: {
        page: 1,
        pageSize: 20
      },
      onResult: (res) => {
        this.handleSuccess(res)
      }
    }).then((_) => {
      this.getData()
    })
  },
  methods: {
    exportExcel() {
      if (this.selectedItems.length === 0) {
        this.$errorMsg('请先选择要导出的条目')
        return
      }
      const data = this.selectedItems.map((it) => {
        return [
          it.nickName,
          it.gender === 0 ? '男' : '女',
          it.address,
          it.lastLoginTime,
          it.lastLoginIp
        ]
      })
      data.unshift(['昵称', '性别', '地址', '上次登录时间', '上次登录IP'])
      const workSheet = XLSX.utils.aoa_to_sheet(data)
      const workBook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workBook, workSheet, '数据报表')
      XLSX.writeFile(workBook, 'tale-list.xlsx')
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  bottom: 0;
}
</style>
