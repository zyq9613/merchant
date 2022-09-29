<template>
  <!-- <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
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
          <svg-icon icon-class="password" />
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
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>

    </el-form>
  </div> -->
  <el-row class="w-full h-full overflow-hidden">
    <header class="w-full h-80px">
      <div class="w-8/10 mx-auto flex items-center h-full">
        <svg-icon icon-class="logo" class="!w-30 !h-auto" />
      </div>
    </header>
    <main class="w-full h-full bg-contain flex justify-center items-center">
      <el-card class="w-600px h-400px -mt-40">
          <div class="flex pt-30px justify-center items-end">
            <el-link v-if="loginNum == 1 || loginNum == 2" class="text-xl mx-8" type="primary" @click="changeLoginNum(1)">手机登录</el-link>
            <el-link v-if="loginNum == 1 || loginNum == 2" class="text-xl mx-8" type="primary" @click="changeLoginNum(2)">账号登录</el-link>
            <span v-if="loginNum == 3" class="text-xl">找回密码</span>
            <span v-if="loginNum == 4" class="text-xl">注册咨询</span>
          </div>
          <div class="flex mt-36px justify-center w-full">
            <el-form ref="telLogin" v-if="loginNum == 1" :model="telLoginData" :rules="rules" class="w-380px">
              <el-form-item prop="phoneNumber" class="">
                <el-input prefix-icon="el-icon-phone" placeholder="请输入手机号码" v-model="telLoginData.phoneNumber"></el-input>
              </el-form-item>
              <el-form-item prop="verificationCode">
                <el-input prefix-icon="el-icon-user-solid" placeholder="请输入验证码" v-model="telLoginData.verificationCode">
                  <el-button class="w-113px" v-bind:class="{'i-primary':toggleverificationCode}" :disabled="!toggleverificationCode" type="primary" slot="append" @click="getVerificationCode">{{toggleverificationCode ? '获取验证码' : countdownNum}}</el-button>
                </el-input>
              </el-form-item>
              <el-button type="primary" class="w-full mt-0 mb-4" @click.native.prevent="verificationCodeLogin">立即登录</el-button>
            </el-form>
            
            <el-form v-if="loginNum == 2" :model="userData" class="w-380px">
              <el-form-item prop="userName" class="-mt-4
              ">
                <el-input prefix-icon="el-icon-user-solid" v-model="userData.name"></el-input>
              </el-form-item>
              <el-form-item prop="password" class="h-45px mb-2">
                <el-input prefix-icon="el-icon-s-goods" type="password" show-password v-model="userData.password"></el-input>
              </el-form-item>
              <div class="flex justify-between w-full items-center">
                <el-form-item prop="isRemember" class="mb-0">
                  <el-checkbox v-model="userData.isRemember">记住密码</el-checkbox>
                  
                </el-form-item>
                <el-link type="primary" class="text-sm align-baseline w-auto h-auto"  @click="changeLoginNum(3)">忘记密码</el-link>
              </div>
              <el-button type="primary" class="w-full mt-2" @click.native.prevent="handleLogin">立即登录</el-button>
              <el-form-item prop="isRemember" class="mt-2 mb-0">
                <el-checkbox v-model="userData.isRemember">已阅读并同意<el-link type="primary" class="text-sm align-baseline w-auto h-auto">《用户使用协议》</el-link><el-link type="primary" class="text-sm align-baseline w-auto h-auto">《隐私协议》</el-link></el-checkbox>
              </el-form-item>
            </el-form>  

            <el-form v-if="loginNum == 3" :model="backPasswordData" class="w-380px">
              <el-form-item prop="phoneNumber" class="-mt-2">
                <el-input prefix-icon="el-icon-user-solid" v-model="backPasswordData.phoneNumber"></el-input>
              </el-form-item>
              <el-form-item prop="verificationCode">
                <el-input prefix-icon="el-icon-user-solid" v-model="backPasswordData.verificationCode">
                  <el-button class="w-80px" type="primary" slot="append">获取验证码</el-button>
                </el-input>
              </el-form-item>

              <el-form-item prop="newPassword">
                <el-input type="password" show-password prefix-icon="el-icon-user-solid" v-model="backPasswordData.newPassword"></el-input>
              </el-form-item>
              <el-button type="primary" class="w-full mt-0">立即登录</el-button>
            </el-form>

            <div v-if="loginNum == 4">
              <div class="w-full text-center text-sm -mt-4 mb-4">请输入咨询信息，工作人员会与您联系</div>
              <el-form :model="registerData" class="w-380px">
                <el-form-item prop="name" >
                  <el-input prefix-icon="el-icon-user-solid" v-model="registerData.name"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="h-45px mb-2">
                  <el-input prefix-icon="el-icon-s-goods" type="tel" show-password v-model="registerData.password"></el-input>
                </el-form-item>
                <el-button type="primary" class="w-full mt-0">立即咨询</el-button>
              </el-form>
            </div>

          </div>
          <div v-if="loginNum !== 4" class="text-base text-center mt-2"><span>还没有账号？ 点击立即</span><el-link type="primary" class="text-base align-baseline w-auto h-auto" @click="changeLoginNum(4)">注册</el-link></div>
          <div v-if="loginNum == 4" class="text-base text-center mt-4"><span>已有账号？立即</span><el-link type="primary" class="text-base align-baseline w-auto h-auto" @click="changeLoginNum(2)">登录</el-link></div>
      </el-card>
    </main>
  </el-row>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getVerificationCode } from '@/api/user'
import { mapActions } from 'vuex';
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }

    const validatePhone = (rule, value, callback) => {
      const regExp = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (!regExp.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }

    return {
      timer:null, //定时器
      countdownNum:'', //倒计时
      toggleverificationCode:true, 
      telLoginData:{
        phoneNumber:'13989453089'
      }, //手机验证码登录表单
      registerData:{},
      backPasswordData:{},
      rules:{
        phoneNumber:[
          {required: true,message: '请输入电话号码',trigger: 'blur'},
          {validator: validatePhone,trigger: 'change'}
        ],
        verificationCode:[
          {required: true,message: '请输入验证码',trigger: 'blur'}
        ]
      },
      userData:{},
      loginNum:1,
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
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
  methods: {
    ...mapActions(['verificationLogin']),
    handlecountdownNum(){
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.countdownNum = TIME_COUNT;
        this.toggleverificationCode = false;
        this.timer = setInterval(() => {
          if (this.countdownNum > 0 && this.countdownNum <= TIME_COUNT) {
            this.countdownNum--
          }else{
            this.toggleverificationCode = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        },1000)
      }
    },
    // 获取验证码
    getVerificationCode(){
      this.$refs.telLogin.validateField('phoneNumber', formError => {
        if (!formError) {
          this.handlecountdownNum();
          getVerificationCode({iphone:this.telLoginData.phoneNumber}).then(response => {
            console.log(response)
          })
        } 
      })
      // this.handlecountdownNum();
    },
    //修改登录方式
    changeLoginNum(num){
      this.loginNum = num;
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
    //验证码登录
    verificationCodeLogin(){
      this.$refs.telLogin.validate(valid => {
        if (valid) {
          console.log(this.telLoginData)
          this.$store.dispatch('user/verificationLogin',{iphone:this.telLoginData.phoneNumber,vCode:this.telLoginData.verificationCode}).then(response => {
            console.log(response)
            this.$router.push({ path: this.redirect || '/' });
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // handleLogin() {
    //   this.$refs.telLogin.validate(valid => {
    //     if (valid) {
    //       this.loading = true
    //       this.$store.dispatch('user/login', this.loginForm).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //         this.loading = false
    //       }).catch(() => {
    //         this.loading = false
    //       })
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
.i-primary{
  background: #409EFF !important;
  color: #fff !important;
  &:hover{
    opacity: .6
  }
}
.is-disabled{
  &:hover{
    background: transparent !important;
    color: inherit !important;
    border-color: #EBEEF5 !important;
  }
}
main{
  background: url('../../assets/common/bg.png') no-repeat center top
}
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
