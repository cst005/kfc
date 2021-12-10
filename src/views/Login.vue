<template>
  <div id="login">
    <van-nav-bar title="登录" left-arrow @click-left="onClickLeft" />
    <div class="logo_img">
      <img src="../assets/images/icon-kfc.png" alt />
      <div class="logo_text">肯德基</div>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="loginUserInfo.user"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        autocomplete="off"
      />
      <van-field
        v-model="loginUserInfo.password"
        :type="passwordStatu? 'password':'text'"
        name="密码"
        label="密码"
        placeholder="密码"
        autocomplete="off"
        :right-icon="passwordStatu ? 'closed-eye':'eye-o'"
        @click-right-icon="toggle('passwordStatu')"
      />
      <div class="regiest">
        <div>忘记密码</div>
        <div>|</div>
        <div @click="showPopup">注册</div>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" color="#ff3b3b" native-type="submit" @click="login">立即登录</van-button>
      </div>
      <div class="regiests">
        <van-popup
          v-model="show"
          closeable
          round
          :close-on-click-overlay="false"
          @click-close-icon="clearInput"
        >
          <div class="user-regiest">用户注册</div>
          <div class="popup-reg">
            <van-form>
              <van-field
                v-model="regiestUserInfo.user"
                name="用户名"
                label="用户名"
                placeholder="请输入用户名"
                autocomplete="off"
              />
              <van-field
                v-model="regiestUserInfo.password"
                :type="passwordStatus? 'password':'text'"
                name="密码"
                label="密码"
                placeholder="请输入密码"
                autocomplete="off"
                :right-icon="passwordStatus ? 'closed-eye':'eye-o'"
                @click-right-icon="toggle('passwordStatus')"
              />
              <van-field
                v-model="regiestUserInfo.nickname"
                name="昵称"
                label="昵称"
                placeholder="请输入昵称"
                autocomplete="off"
              />
              <div class="btn">
                <div style="margin: 16px;">
                  <van-button round block type="info" color="#ff3b3b" @click="regiester">注册</van-button>
                </div>
              </div>
            </van-form>
          </div>
        </van-popup>
      </div>
    </van-form>
  </div>
</template>

<script>
import { validForm } from "../assets/js/validForm.js";
import { Toast } from "vant";
export default {
  name: "Login",
  data() {
    return {
      show: false,
      loginUserInfo: {
        user: "",
        password: ""
      },
      regiestUserInfo: {
        user: "",
        password: "",
        nickname: ""
      },
      passwordStatu: true,
      passwordStatus: true
    };
  },
  methods: {
    clearInput() {
      this.regiestUserInfo = {};
    },
    toggle(key) {
      this[key] = !this[key];
    },
    onSubmit(values) {
      console.log("submit", values);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    showPopup() {
      this.show = true;
    },
    login() {
      let o = {
        phone: {
          value: this.loginUserInfo.user,
          errorMsg: "手机号格式不正确",
          reg: /^1[3-9]\d{9}$/
        },
        password: {
          value: this.loginUserInfo.password,
          errorMsg: "密码由数字字母下划线组合(6-16字符)",
          reg: /^[A-Za-z]\w{5,15}$/
        }
      };
      let isPass = validForm.valid(o);
      if (!isPass) {
        return;
      } else {
        this.axios({
          method: "get",
          url: "/login",
          params: {
            user: this.loginUserInfo.user,
            password: this.loginUserInfo.password
          }
        })
          .then(res => {
            console.log("登录后的信息", res);
            localStorage.setItem("token", res.data.data);
            if (res.data.status == 300) {
              this.$router.push({ name: "Home" });
              Toast(res.data.msg);
            }
          })
          .catch(err => {});
      }
    },
    regiester() {
      //构造表单验证信息  注册正则
      let o = {
        phone: {
          value: this.regiestUserInfo.user,
          errorMsg: "手机号格式不正确",
          reg: /^1[3-9]\d{9}$/
        },
        password: {
          value: this.regiestUserInfo.password,
          errorMsg: "密码由数字字母下划线组合(6-16字符)",
          reg: /^[A-Za-z]\w{5,15}$/
        },
        nickName: {
          value: this.regiestUserInfo.nickname,
          errorMsg: "昵称由字母数字下划线汉字组合(1-10字符)",
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/
        }
      };

      let isPass = validForm.valid(o);
      console.log(isPass);
      if (!isPass) {
        return;
      } else {
        this.axios({
          method: "get",
          url: "/register",
          params: {
            user: this.regiestUserInfo.user,
            password: this.regiestUserInfo.password,
            nickname: this.regiestUserInfo.nickname
          }
        })
          .then(res => {
            console.log("注册后的信息", res);
            if (res.data.status === 200) {
              Toast(res.data.msg);
              this.show = false;
              this.regiestUserInfo = {};
            }
          })
          .catch(err => {});
      }
    }
  }
};
</script>

<style lang="less" scoped>
#login {
  /deep/ .van-nav-bar .van-icon {
    color: #333;
    font-size: 22px;
  }
  /deep/ .van-nav-bar__title {
    color: #ff3b3b;
    font-weight: bold;
  }
  .logo_img {
    margin-top: 100px;
    margin-bottom: 50px;
    text-align: center;
    img {
      width: 115px;
      height: 118px;
      border-radius: 28px;
    }
    .logo_text {
      font-size: 22px;
      color: #aaa;
    }
  }
  .text {
    .van-button__text {
      color: #333;
    }
  }
  .regiest {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    margin-right: 10px;
    div {
      margin-right: 5px;
    }
  }
  // .regiests .van-popup {
  //   border-radius: 10px;
  // }
  .user-regiest {
    text-align: left;
    font-size: 20px;
    padding: 15px;
    font-weight: bold;
  }
  .popup-reg {
    width: 300px;
    height: 280px;
  }
}
</style>
