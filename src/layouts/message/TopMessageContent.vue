<template>
  <div style="width: 280px">
    <el-tabs v-model="activeName">
      <el-tab-pane
        :label="`通知${notifyNum}`"
        name="notify"
      >
        <NotifyItem class="item" />
        <NotifyItem class="item" />
        <NotifyItem class="item" />
        <NotifyItem class="item" />
        <NotifyItem class="item" />
        <div class="bottom-wrapper">
          <el-link
            :underline="false"
            class="flex-sub text-center"
            @click="clear('notify')"
          >清空通知</el-link>
          <div class="text-gray">|</div>
          <el-link
            :underline="false"
            class="flex-sub text-center"
            @click="more('notify')"
          >查看更多</el-link>
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="`消息${messageNum}`"
        name="message"
      >
        <MessageItem class="item" />
        <MessageItem class="item" />
        <MessageItem class="item" />
        <MessageItem class="item" />
        <MessageItem class="item" />
        <div class="bottom-wrapper">
          <el-link
            :underline="false"
            class="action"
            @click="clear('message')"
          >清空消息</el-link>
          <div>|</div>
          <el-link
            :underline="false"
            class="action"
            @click="more('message')"
          >查看更多</el-link>
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="`待办${todoNum}`"
        name="todo"
      >
        <TodoItem class="item" />
        <TodoItem class="item" />
        <TodoItem class="item" />
        <TodoItem class="item" />
        <TodoItem class="item" />
        <div class="bottom-wrapper">
          <el-link
            :underline="false"
            class="flex-sub text-center"
            @click="clear('todo')"
          >清空待办</el-link>
          <div class="text-gray">|</div>
          <el-link
            :underline="false"
            class="flex-sub text-center"
            @click="more('todo')"
          >查看更多</el-link>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import NotifyItem from './components/NotifyItem'
import MessageItem from './components/MessageItem'
import TodoItem from './components/TodoItem'
export default {
  name: 'MessageContent',
  components: {
    NotifyItem,
    MessageItem,
    TodoItem
  },
  data() {
    return {
      activeName: '',
      notifyNum: '(4)',
      messageNum: '(4)',
      todoNum: '(4)'
    }
  },
  methods: {
    update() {
      this.activeName = this.activeName === '0' ? 'notify' : this.activeName
    },
    clear(type) {
      if (!this[type + 'Num']) {
        return
      }
      this[type + 'Num'] = ''
      this.$emit('clear-num', 1)
    },
    more() {
      this.$successMsg('click more')
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-wrapper {
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  border-top: 1px solid #f5f5f5;
  .action {
    flex: 1;
    text-align: center;
  }
}
</style>
