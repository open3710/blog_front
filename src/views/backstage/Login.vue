<template>
  <el-form
    :rules="rules"
    class="login-container"
    label-position="left"
    label-width="0px"
    v-loading="loading"
    :model="loginForm"
    ref="loginForm"
  >
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" autocomplete="off" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="code">
      <img :src="vcUrl" alt @click="ecitUrl" />
      <el-input
        type="text"
        v-model="loginForm.code"
        autocomplete="off"
        placeholder="点击图片更换验证码"
        style="width:250px;"
      ></el-input>
    </el-form-item>
    <!-- <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox> -->
    <el-form-item style="width: 100%">
      <el-button type="primary" @click="submitClick('loginForm')" style="width: 100%">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { request } from "../../network/request";

export default {
  data() {
    var checkUserName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("用户名不能为空"));
      } else {
        // 必须被调用
        callback();
      }
    };
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };

    return {
      // 校验
      rules: {
        username: [{ validator: checkUserName, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
        code: [{ required: true, message: "输入验证码", trigger: "blur" }]
      },
      checked: true,
      loginForm: {
        username: "admin",
        password: "123",
        code: ""
      },
      // 加载
      loading: false,
      vcUrl: "http://localhost:3710/blog/util/verifyCode"
    };
  },
  methods: {
    ecitUrl() {
      this.vcUrl =
        "http://localhost:3710/blog/util/verifyCode?time=" + new Date();
    },
    submitClick: function(loginForm) {
      this.$refs[loginForm].validate(valid => {
        // valid 返回结果是true或者false
        if (valid) {
          this.loading = true;
          request({
            url: "/doLogin",
            method: "post",
            params: {
              username: this.loginForm.username,
              password: this.loginForm.password,
              code: this.loginForm.code
            }
          })
            .then(res => {
              // 将用户信息放到session中浏览器关闭自动消失
              window.sessionStorage.setItem("user", JSON.stringify(res.data));
              if (res.status == 200 && res.data == 201) {
                this.$message({
                  message: "验证码填写有误",
                  type: "warning"
                });
                this.loading = false;
                return;
              }
              if (res.status == 200) {
                setTimeout(() => {
                  this.loading = false;
                  // 200登录成功
                  if (res.status == 200) {
                    this.$message({
                      message: "登录成功",
                      type: "success"
                    });
                  }
                  this.$router.push("/backstage");
                }, 1000);
              }
            })
            .catch(err => {
              if (err.response.data.code == 401) {
                let message = err.response.data.message;
                // 登录失败输出异常信息
                this.$message({
                  message: message,
                  type: "warning"
                });
                this.loading = false;
              }
            });
        } else {
          return false;
        }
      });
    }
  },created(){
    let that = this;
    document.onkeydown =function(e){
      e = window.event || e;
      if((e.code=='Enter'||e.code=='enter')){//验证在登录界面和按得键是回车键enter
        that.submitClick("loginForm");
      }
    }
  }
};
</script>
<style>
.el-form-item__content {
  align-items: center;
  display: flex;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.login_remember {
  margin: 0px 0px 35px 0px;
  text-align: left;
}
</style>
