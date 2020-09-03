<template>
  <div class="login-box">
    <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

        <div class="title-container">
          <h3 class="title text-center">登录</h3>
        </div>

        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="账号"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            show-password
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>

        <el-form-item>
          <el-input
            ref="code"
            v-model="loginForm.code"
            placeholder="验证码"
            name="code"
            type="text"
            tabindex="1"
            auto-complete="off"
          />
          <div class="login-code">
            <img :src="codeUrl">
          </div>
        </el-form-item>

        <el-form-item>
          <el-checkbox>自动登录</el-checkbox>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      </el-form>
    </div>
  </div>
</template>

<script>
// import { getCodeImg } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'test',
        password: '123456'
      },
      codeUrl: '',
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  // created() {
  //   this.getCode()
  // },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // getCode() {
    //   getCodeImg().then(res => {
    //     this.codeUrl = res.img
    //     this.loginForm.uuid = res.uuid
    //   })
    // },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        // const user = {
        //   username: this.loginForm.username,
        //   password: this.loginForm.password,
        //   code: this.loginForm.code,
        //   uuid: this.loginForm.uuid
        // }
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '账号或密码错误'
            })
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-box{
  height: 100%;
  background-color: #F6F7F8;
  background-image: url('../../assets/images/login_bg.png');
  background-size: 100% 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20%;
}
.login-container{
  width: 510px;
  height: 457px;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 50px 60px;

}
.login-code {
  display: inline-block;
}

</style>
