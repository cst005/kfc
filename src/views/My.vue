<template>
  <div class="my">
    <div></div>
    <div class="mys"></div>
    <div class="box">
      <div class="boxo">
        <img
          src="https://picnew11.photophoto.cn/20170107/xinedgzhanduishiliangtulogo-22546692_1.jpg"
          alt=""
        />
        <div>
          <span class="sdad">sass</span><br /><span
            >这家伙很懒什么也没留下</span
          >
        </div>
      </div>
      <div class="myde" @click="goLogin">
        <span>立即登录</span>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="myde" @click="goOut">
        <span>取消登录</span>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="myde" @click="goes">
        <span>我的订单</span>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "My",
  data() {
    return {};
  },
  methods: {
    goLogin() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      setTimeout(() => {
        this.$router.push({ name: "Login" });
      }, 500);
    },
    goOut() {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        this.$router.push("/");
        console.log("退出登录成功");
      } else {
        Toast("请先登录");
      }
    },
    goes() {
      if (localStorage.getItem("token")) {
        this.$router.push({ name: "Morder" });
      } else {
        Toast("请先登录");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.mys {
  background: url("http://www.kangliuyong.com:10002/assets/default_bg.jpg");
  height: 160px;
  background-size: cover;
}
.box {
  width: 80vw;
  height: 50vh;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  .boxo {
    display: flex;
    height: 80px;
    width: 80vw;
    padding: 10px;
    img {
      display: block;
      height: 60px;
      width: 60px;
      border-radius: 50%;
    }
    div {
      height: 20px;
      margin-left: 20px;
      .sdad {
        color: #396b8e;
      }
    }
  }
  .myde {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    .right {
      width: 10px;
      height: 10px;
    }
  }
}
</style>