<template>
  <div class="login-container">
    <div
      ref="loginWrapper"
      class="login-bg-wrapper"
    >
      <img :src="$isMobile ? ImageMobileBg1 : ImageBg1" />
    </div>
    <div class="flex form-wrapper">
      <div class="left"></div>
      <div class="right">
        <div class="my-width flex-sub flex justify-center align-center">
          <div class="logo-wrapper">
            <img :src="require('@/assets/work_logo.png')" />
          </div>
          <div class="title margin-left">Vue Admin Work</div>
        </div>
        <div class="form-container">
          <div class="item-wrapper">
            <el-input
              v-model="username"
              placeholder="请输入用户名/手机号"
              prefix-icon="el-icon-user"
              clearable
            />
          </div>
          <div class="item-wrapper margin-top-lg">
            <el-input
              v-model="password"
              placeholder="请输入密码"
              type="password"
              clearable
              prefix-icon="el-icon-lock"
            />
          </div>
          <div class="item-wrapper">
            <VawVerify
              class="margin-top-lg"
              @verify-success="onVerifySuccess"
            />
          </div>
          <div class="flex-sub"></div>
          <div class="margin-top-lg">
            <el-button
              type="primary"
              class="login"
              @click="login"
            >
              登录
            </el-button>
          </div>
        </div>
        <div class="my-width flex-sub margin-top">
          <div class="flex justify-between">
            <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
            <el-link
              :underline="false"
              type="primary"
            >忘记密码？</el-link>
          </div>
        </div>
      </div>
    </div>
    <div class="login-footer-wrapper">
      <PageFooter />
    </div>
  </div>
</template>

<script>
import ImageBg1 from '@/assets/img_login_bg_01.jpg'
import ImageMobileBg1 from '@/assets/img_login_mobile_bg_01.jpg'
import PageFooter from '@/layouts/footer'
import VawVerify from 'vaw-verify'
import 'vaw-verify/lib/vaw-verify.css'
export default {
  name: 'Login',
  components: { PageFooter, VawVerify },
  data() {
    return {
      username: 'admin',
      password: '123456',
      ImageBg1,
      ImageMobileBg1,
      redirect: '',
      autoLogin: true,
      verifyState: false,
      defaultTheme: this.$layoutStore.state.theme
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.$layoutStore.changeTheme('light')
  },
  destroyed() {
    this.$layoutStore.changeTheme(this.defaultTheme)
  },
  methods: {
    login() {
      if (!this.username) {
        this.$errorMsg('请输入用户名')
        return
      }
      if (!this.password) {
        this.$errorMsg('请输入密码')
        return
      }
      if (!this.verifyState) {
        this.$errorMsg('滑动验证失败')
        return
      }
      this.$post({
        url: this.$urlPath.login,
        data: {
          username: this.username,
          password: this.password,
          authLogin: this.authLogin ? '1' : '0'
        }
      })
        .then((res) => {
          this.$store
            .dispatch('user/saveUserInfo', res.data)
            .then((_) => {
              this.$router.push({ path: this.redirect || '/index/main' })
            })
            .catch((error) => {
              this.$errorMsg(error.message || '登录失败，未知异常')
            })
        })
        .catch((error) => {
          this.$errorMsg(error.message || '登录失败，未知异常')
        })
    },
    onVerifySuccess() {
      this.verifyState = true
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  .login-bg-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .logo-wrapper {
    & img {
      width: 50px;
    }
    & img::after {
      content: "欢迎来到vue-admin-work";
    }
  }
  .login-footer-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    ::v-deep {
      .el-card {
        background-color: transparent;
      }
    }
  }
  .form-wrapper {
    position: absolute;
    top: 18.5%;
    left: 0;
    right: 0;
    bottom: 15.8%;
    @media screen and (max-width: 768px) {
      .left {
        display: none;
      }
      .right {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .my-width {
          width: 80%;
        }
        .title {
          display: block;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #34495e;
          text-shadow: 0 0 0.2em #41b883, -0 -0 0.2em #41b883;
        }
        .form-container {
          width: 80%;
          min-height: 60%;
          text-align: center;
          background: rgba(183, 183, 183, 0.2);
          padding: 5%;
          border-radius: 5px;
          border: 2px solid #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item-wrapper {
            width: 100%;
          }
          .login {
            width: 100%;
          }
        }
      }
    }
    @media screen and (min-width: 768px) and (max-width: 992px) {
      .left {
        display: none;
      }
      .right {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .my-width {
          width: 48%;
        }
        .title {
          display: block;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #5497ff;
        }
        .form-container {
          width: 50%;
          height: 60%;
          margin-bottom: 10%;
          text-align: center;
          background: rgba(183, 183, 183, 0.2);
          padding: 5%;
          border-radius: 5px;
          border: 2px solid #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item-wrapper {
            width: 100%;
          }
          .login {
            width: 100%;
          }
        }
      }
    }
    @media screen and (min-width: 992px) {
      .left {
        display: block;
        flex: 1;
      }
      .right {
        margin-left: 10%;
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .my-width {
          width: 48%;
        }
        .title {
          display: block;
          font-size: 24px;
          font-weight: bold;
          color: #5497ff;
        }
        .item-wrapper {
          width: 48%;
        }
        .login {
          width: 48%;
        }
      }
    }
  }
}
</style>
