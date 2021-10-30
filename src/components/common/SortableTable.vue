<template>
  <el-tooltip
    class="item"
    effect="dark"
    content="列设置"
    placement="top"
  >
    <el-popover
      placement="bottom"
      trigger="click"
    >
      <div
        :body-style="{padding: 0}"
        style="border-bottom: 1px solid #f5f5f5"
        class="flex justify-between align-center"
      >
        <el-checkbox
          v-model="allChecked"
          :indeterminate="isIndeterminate"
          @change="onAllChange"
        >全选</el-checkbox>
        <el-button
          type="text"
          @click="onReset"
        >重置</el-button>
      </div>
      <draggable
        v-model="innerTableProps"
        animation="500"
        @end="onDraggableEnd"
      >
        <transition-group>
          <div
            v-for="propsItem of innerTableProps"
            :key="propsItem.prop"
            class="padding-tb-sm"
            :body-style="{padding: 0}"
            shadow="hover"
          >
            <span class="el-icon-sort padding-right-sm"></span>
            <el-checkbox
              v-model="propsItem.checked"
              :label="propsItem.prop"
              @change="onChange"
            >{{ propsItem.title }}</el-checkbox>
          </div>
        </transition-group>
      </draggable>
      <el-button
        slot="reference"
        type="primary"
        size="mini"
        icon="el-icon-setting"
        circle
      />
    </el-popover>
  </el-tooltip>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'SortableTable',
  components: { draggable },
  props: {
    tableProps: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      innerTableProps: this.tableProps.map(it => {
        return { ...it }
      }),
      originTableProps: this.tableProps.map(it => {
        return { ...it }
      }),
      isIndeterminate: this.tableProps.filter(it => it.checked).length !== this.tableProps.length,
      allChecked: this.tableProps.every(it => it.checked)
    }
  },
  methods: {
    onDraggableEnd() {
      this.$emit('update', this.innerTableProps)
    },
    onAllChange(value) {
      this.innerTableProps.forEach(it => (it.checked = value))
      this.$emit('update', this.innerTableProps)
    },
    onChange() {
      const checkedItems = this.innerTableProps.filter(it => it.checked)
      this.allChecked = checkedItems.length === this.innerTableProps.length
      this.isIndeterminate = checkedItems.length > 0 && checkedItems.length !== this.innerTableProps.length
      this.$emit('update', this.innerTableProps)
    },
    onReset() {
      this.innerTableProps = this.originTableProps.map(it => {
        return { ...it }
      })
      this.onChange()
    }
  }
}
</script>

