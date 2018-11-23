<template>
  <div class="login-content">
    <div class="logo_box animated rollIn">
    </div>
    <div class="ad_register">
      <h1 id="system_title" class="system_title   animated zoomIn  "><label class="hvr-bounce-in">智能广告投放系统1V1.0</label></h1>
      <hr/>
      <span class=""></span>
      <el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm" label-width="100px">
        <el-form-item label="" prop="name">
          <el-input placeholder="帐 号" v-model="loginForm.name" auto-complete="on" class="name animated fadeInLeft">
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="pass">
          <el-input placeholder="密 码" type="password" v-model="loginForm.pass" auto-complete="on" @keyup.enter.native="submitForm('loginForm')" class="password animated fadeInRight"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')" class="login animated fadeInUp">登录</el-button>
      </el-form>
      <p class="pass_box">
        <a href="javascript:;" class="get_passw forget-pws animated fadeInUp">忘记密码</a>
      </p>
    </div>
    <p class="copy_txt animated fadeInUp">copy Copyright 2008-2016 All Rights Reserved 北京****公司</p>
  </div>
</template>

<script>
  import axios from "../../common/axios";
  import {
    mapState,
    mapActions
  } from "vuex";
  import {
    login
  } from "../../service/index";
  import store from 'store';
  import {RSAencrypt} from "../../common/utils";
  // import {
  //   Base64
  // } from 'js-base64';
  let Base64 = require('base64-utf8');
  export default {
    beforeCreate: function() {
      document.getElementsByTagName("body")[0].className = "bg-active";
    },
    beforeDestroy: function() {
      document.body.removeAttribute("class", "bg-active");
    },
    data() {
      var validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("姓名不能为空"));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          pass: "",
          name: ""
        },
        rules2: {
          pass: [{
            validator: validatePass,
            trigger: "blur"
          }],
          name: [{
            validator: validateName,
            trigger: "blur"
          }]
        },
        customizeClass: 'active'
      };
    },
    mounted() {
      if (store.get("user")) {
        this.loginForm.name = store.get("user").email;
      }
      function GetRequest(attribute) { 
          var reg = new RegExp("(^|&)"+attribute+"=([^&]*)(&|$)");
          var r = window.location.search.substr(1).match(reg);
          if(r!=null) return decodeURI(r[2].toString()); return null;   
      } 

      if(GetRequest("pasw")){
        this.loginForm.name = decodeURIComponent(GetRequest("username"));
        this.loginForm.pass = GetRequest("pasw");
        this.submitForm('loginForm');
      }

    },
    components: {
      // headTop
    },
    computed: {},
    methods: {
      ...mapActions(["doLogin", "setDefaultOpends", "getSideBar","getPublickKeyAciton"]),

      loginSystem(val) {
        login
          .doLogin({
            data: val
            // username: this.loginForm.name,
            // pasw: Base64.encode(getRSApassword(this.loginForm.pass))
          })
          .then(res => {
            if (res.data.code == 0) {
            
              store.set("token", res.data.data.token);
              store.set("user", res.data.data.user);
              store.set("sidebar", res.data.data.menu);
              store.set("permission", res.data.data.element);
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.get("token");
              // console.log("菜单数据");
              // console.log(res.data.data.menu);
              // this.getSideBar(res.data.data.menu);

              if(res.data.data.menu.length == 0){
                   this.$message({
                    showClose: true,
                    message: "此账号过期",
                    type: "error"
                  });
                  return false;
              }

              let curPath="home";
              res.data.data.menu.every(element => {
                  if(element.chiled.length>0){
                      element.chiled.every(ele=>{
                          if(ele.path){
                            curPath = ele.path
                            return false;
                          }
                      })
                  }
              });
              
              this.$router.push({
                    path: curPath
               });
              // this.$router.push({
              //   path: "/home"  
              // });

            } else {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "error"
              });
            }
          });
      },
      submitForm(formName) {
        store.clearAll();
        this.$refs[formName].validate(valid => {
          if (valid) {
            login.getPublickKey().then(res => {
              // console.log("加密开始");
              //this.getPublickKeyAciton(res.data);
              //store.remove('publicKey');
              store.set("publicKey",res.data);
              console.log(store.get("publicKey"));
              let val = RSAencrypt(res.data, JSON.stringify({
                username: this.loginForm.name,
                pasw: this.loginForm.pass
              }),this);

              // login.getTest({data:val}).then(res=>{

              //   console.log("源数据");
              //   console.log(res.data);

              // });
              // return;

              this.loginSystem(val);

              //  console.log(Base64.encode(val));
               
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  @import "../../style/mixin";
  @import "../../style/common"; // 只针对Login页面的body添加的背景className
  // 只针对Login页面的body添加的背景className
  .bg-active {
    background: url("../../style/image/login/login_bg.jpg") no-repeat center;
    background-size: "1920px 1080px";
    background-size: 100% 100%;
  }
  .login-content {
    width: 100%;
    .el-form-item__content {
      margin-left: 0 !important;
    } // 修改chrome浏览器自带填充表单功能默认样式
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-transition-delay: 99999s;
      -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
    }
    .el-input__inner {
      width: 300px;
      text-align: center;
      color: #bcbcbc;
      background-color: transparent !important;
    }
    .el-button {
      span {
        color: #fff;
        letter-spacing: 2.6px;
      }
    }
    .logo_box {
      position: absolute;
      top: 40px;
      left: 60px;
      background-image: url("../../style/image/login/logo.svg");
      background-size: 100% 100%;
      width: 148px;
      height: 61px;
    }
    .ad_register {
      width: 305px;
      height: 300px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -150px 0 0 -150px;
      hr {
        border: 1px solid #007ee5;
        width: 60px;
        margin: 17px auto 31px;
      }
    }
    .el-button,
    .el-input {
      margin: 0 0 0 3px;
      float: left;
    }
    .el-button {
      display: block;
      width: 300px;
      background-color: #1968de;
      border-color: #1968de;
      &:hover {
        background-color: #1660cf;
        border-color: #1660cf;
      }
    }
    .get_passw {
      font-size: 14px;
      float: left;
      color: $fc;
      margin: 20px 0 0 128px;
      font-family: "微软雅黑";
    }
    .system_title {
      font-size: 26px;
      font-weight: normal;
      color: $fc;
      letter-spacing: 2.6px;
    }
    .pass_box {
      text-align: center;
    }
    .copy_txt {
      font-size: 14px;
      font-family: "微软雅黑";
      position: absolute;
      bottom: 20px;
      width: 100%;
      margin: 0 auto;
      text-align: center;
      color: $fc;
    }
    #system_title {
      animation-duration: 1s;
      animation-delay: 0s; // animation-iteration-count: infinite;
      animation-iteration-count: 1;
    }
    .name {
      animation-duration: 0.7s;
      animation-delay: 1.1s;
    }
    .password {
      animation-duration: 0.6s;
      animation-delay: 1.1s;
    }
    .login {
      animation-duration: 0.6s;
      animation-delay: 1.7s;
    }
    .forget-pws {
      animation-duration: 0.5s;
      animation-delay: 2.3s;
    }
    .copy_txt {
      animation-duration: 0.5s;
      animation-delay: 2.8s;
    }
    .logo_box {
      animation-duration: 0.5s;
      animation-delay: 3.3s;
    }
  }
</style>


