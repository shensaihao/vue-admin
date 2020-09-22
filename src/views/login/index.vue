<template>
  <div class="login-box">
    <div class="login-wraper">
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
            >
              <i slot="prefix" class="el-input__icon el-icon-user" />
            </el-input>
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
            >
              <i slot="prefix" class="el-input__icon el-icon-key" />
            </el-input>
          </el-form-item>

          <el-form-item prop="code">
            <el-input
              ref="verifyCode"
              v-model="loginForm.verifyCode"
              placeholder="验证码"
              name="verifyCode"
              type="text"
              tabindex="1"
              auto-complete="on"
              style="width: 278px"
            >
              <i slot="prefix" class="el-input__icon el-icon-picture-outline-round" />
            </el-input>
            <div class="login-code" @click="refreshCode">
              <!--验证码组件-->
              <img :src="codeUrl" alt="">
            </div>
          </el-form-item>

          <el-form-item>
            <el-checkbox>自动登录</el-checkbox>
          </el-form-item>

          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'test',
        password: '123456'
      },
      codeUrl: '',
      key: '',
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        verifyCode: [{ required: true, trigger: 'blur', message: '验证码不能为空' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      identifyCodes: '1234567890',
      identifyCode: '1234'
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
  created() {
    this.getCodeImg()
  },
  methods: {
    getCodeImg() {
      getCodeImg().then((res) => {
        this.codeUrl = res.content.imageStr
        this.key = res.content.key
      })
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.getCodeImg()
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
    },
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          verifyCode: this.loginForm.verifyCode,
          key: this.key
        }
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', user).then(() => {
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch((err) => {
            console.log(err)
            this.$message({
              type: 'error',
              message: err.data.responseMsg
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
  height: 900px;
  min-width: 1200px;
  background-color: #F6F7F8;
  background: url('../../assets/images/new_login_bg.png') no-repeat center top;
  background-size: contain;
  position: relative;
}
.login-wraper {
  height: 900px;
  min-width: 1200px;
  background: url('../../assets/images/new_logo1.png') no-repeat;
  background-position-x: 17%;
  background-position-y: 94px;
}
.login-container{
  width: 510px;
  height: 457px;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 50px 60px;
  position: absolute;
  left: 55%;
  top: 0;
  bottom: 0;
  margin: auto;

}
.login-code {
  display: inline-block;
  position: absolute;
}

</style>
