<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">账号登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          登录账号
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          登录密码
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          show-password
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <!-- <el-form-item prop="code">
        <span class="svg-container">
          图形验证码
        </span>
        <el-input
          ref="code"
          v-model="loginForm.code"
          placeholder=""
          name="code"
          type="text"
          tabindex="1"
          auto-complete="off"
        />
        <div class="login-code">
          <img :src="codeUrl">
        </div>
      </el-form-item> -->

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

    </el-form>
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
.login-container{
  position: absolute;
  width: 500px;
  height: 500px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  .title-container{

  }
}
.login-code {
  display: inline-block;
}

</style>
