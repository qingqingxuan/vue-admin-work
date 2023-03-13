<template>
  <div class="vaw-avatar-container">
    <el-dropdown trigger="hover" @command="onCommad">
      <div class="action-wrapper">
        <div class="avatar">
          <img :src="avatar" />
        </div>
        <span class="nick-name el-dropdown-link">
          <span>{{ nickName || "admin" }}</span>
          <i class="el-icon-arrow-down tip"></i>
        </span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user" command="personalCenter">
          个人中心
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button" command="logout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import store from '../store/index'
import { MessageBox } from 'element-ui'
import { mapGetters } from 'vuex'
export default {
  name: 'VAWAvatar',
  data() {
    return {
      state: store.state
    }
  },
  computed: {
    ...mapGetters({
      avatar: 'user/getAvatar',
      nickName: 'user/getNickName'
    })
  },
  methods: {
    onCommad(command) {
      switch (command) {
        case 'personalCenter':
          this.onPersonalCenter()
          break
        case 'logout':
          this.onLogout()
          break
      }
    },
    onPersonalCenter() {
      store.toPersonalCenter && store.toPersonalCenter()
    },
    onLogout() {
      MessageBox.confirm('是否要退出登录？', '提示')
        .then(_ => {
          store.logout()
          store.onLogout && store.onLogout()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
.vaw-avatar-container {
  .action-wrapper {
    display: flex;
    align-items: center;
    .avatar {
      width: calc(#{$logoHeight} - 15px);
      height: calc(#{$logoHeight} - 15px);
      display: flex;
      align-items: center;
      & > img {
        border: 1px solid #f6f6f6;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .nick-name {
      margin-left: 10px;
      .tip {
        transform: rotate(0);
        transition: transform $transitionTime;
      }
    }
  }
}
.vaw-avatar-container:hover {
  cursor: pointer;
  .nick-name .tip {
    transform: rotate(180deg);
    transition: transform $transitionTime;
  }
}
.el-dropdown-menu {
  top: 40px !important;
}
</style>
