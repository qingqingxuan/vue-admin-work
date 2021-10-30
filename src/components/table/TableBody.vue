<template>
  <el-card
    :body-style="{padding: 0}"
    class="table-container"
    :style="cardStyle"
    shadow="never"
  >
    <slot name="tableHeader"></slot>
    <slot></slot>
  </el-card>
</template>

<script>
import TableBodyMixin from '@/mixins/TableBodyMixin'
export default {
  name: 'TableBody',
  mixins: [TableBodyMixin]
}
</script>
