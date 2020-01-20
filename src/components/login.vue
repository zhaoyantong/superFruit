<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm">
      <!-- 登录标题 -->
      <div class="title-container">
        <h3 class="title">鲜果优选后台管理系统</h3>
      </div>
      <!-- 用户名 -->
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="userName" type="text" v-model="loginForm.userName" autoComplete="on" placeholder="请管理员输入登录账号"
          id="el-input__inner" />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
          autoComplete="on" placeholder="请管理员输入登录密码" id="el-input__inner" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <!-- 登录 -->
      <el-button type="primary" class="enter-btn" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>
<script>
  import {
    isvalidUsername
  } from '@/utils/validate'
  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户帐号'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能少于6个字符'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          userName: 'admin',
          password: '123456'
        },
        loginRules: {
          username: [{
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }]
        },
        passwordType: 'password',
        loading: false,
        showDialog: false
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      handleLogin() {
        // 无接口之前
        // this.$router.push({
        //   path: '/commodity'
        // })
        // 有接口之后
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({
                path: '/commodity'
              })
            }).catch(() => {
              this.loading = false
            })
          }
        })
      },
    },
  }
</script>
<style scoped>
  .login-container {
    width: 100%;
    height: 100vh;
    background: url(../img/bg.png) no-repeat left top / 100% 100%;
  }

  .login-form {
    width: 340px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    float: right;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    padding: 80px;
    margin-right: 100px;
  }

  /* 登录的标题 */
  .title-container .title {
    font-size: 28px;
    color: #000;
    margin: 0px auto 66px auto;
    font-weight: normal;
    text-align: center;
  }

  .login-container .el-form-item {
    border-bottom: 1px solid #bbb;
    color: #454545;
    margin-bottom: 22px;
  }

  .login-container .svg-container {
    display: inline-block;
    width: 30px;
    font-size: 20px;
    color: #889aa4;
    padding: 10px 6px 6px 10px;
    float: left;
  }
  /* 单行文本框（usernmae/password） */
  .login-container .el-input {
    width: 81%;
    height: 47px;
    font-size: 14px;
  }
  /* 局部样式覆盖全局样式的方法>>> */
    .el-input>>>.el-input__inner{
      width: 85% !important;
      font-size: 14px !important;
      color: #bbb !important;
      background: transparent !important;
      border: 0px !important;
      -webkit-appearance: none !important;
      border-radius: 0px !important;
      padding: 28px 5px 6px 0px !important;
      z-index: 99999;
    }
  /* 登录btn */
  .enter-btn {
    width: 340px;
    height: 68px;
    line-height: 40px !important;
    font-size: 18px;
    color: #fff;
    line-height: 60px;
    background: url(../img/enter.png) no-repeat left top/cover;
    border: 0;
    margin-top: 55px;
  }
</style>
