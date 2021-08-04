export default {
  data() {
    return {
      userPasswordModel: {
        originPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    validatePassword() {
      if (!this.userPasswordModel.originPassword) {
        this.$errorMsg('请输入原始密码')
        return
      }
      if (!this.userPasswordModel.originPassword) {
        this.$errorMsg('请输入新密码')
        return
      }
      if (!this.userPasswordModel.confirmPassword) {
        this.$errorMsg('请输入确认密码')
        return
      }
      return true
    }
  }
}
