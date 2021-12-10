<template>
  <div class="detail">
    <div class="nav">
      <div class="nav-bar">
        <van-nav-bar
          title="商品详情"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
      </div>
    </div>
    <div class="pic">
      <div class="pic-top">
        <img :src="product.largeImg" />
        <div class="tow-icon">
          <div class="left-icon">
            <van-icon name="arrow-down" size="21" />
          </div>
          <div class="right-icon">
            <van-icon name="chat-o" size="21" />
          </div>
        </div>
        <div class="text">图片仅供参考，请以实物为准</div>
      </div>
      <div class="pic-bottom">
        <div class="title-box">
          <div class="product-name">{{ product.name }}</div>
          <div class="small-icon">
            <van-icon name="new-arrival-o" size="28" />
          </div>
        </div>
        <div class="price">￥{{ product.Price }}元</div>
      </div>
    </div>

    <div class="choose-count">
      <div class="choose">选择数量</div>
      <div class="bu">
        <van-stepper
          v-model="value"
          theme="round"
          button-size="22"
          disable-input
        />
      </div>
    </div>

    <div class="detail-evaluate">
      <div class="detail-top">
        <div class="detail">详情</div>
        <div class="evaluate">评价</div>
      </div>

      <div class="desc-box">
        <div class="manager-box">
          <div class="manager-title">掌柜描述</div>
          <div class="main-detail">
            <span v-for="(item, index) in product.desc" :key="index">{{
              item
            }}</span>
          </div>
        </div>
        <div class="price-desc"></div>
      </div>

      <div class="desc-box">
        <div class="manager-box">
          <div class="manager-title">价格说明</div>
          <div class="main-detail">
            <div class="query">?</div>
          </div>
        </div>
        <div class="price-desc"></div>
      </div>
    </div>
    <div class="notice-box">
      <div class="notice-title">注意事项</div>
      <div class="thing" v-for="(item, index) in product.notice" :key="index">
        {{ index + 1 }}.{{ item }}
      </div>
    </div>
    <div class="content">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
        <van-goods-action-button
          type="warning"
          @click="addCar"
          text="加入购物车"
        />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Detail",
  data() {
    return {
      value: 1,
      product: [],
    };
  },
  methods: {
    getDetail(pid) {
      this.axios({
        method: "get",
        url: "/detail",
        params: {
          pid: pid,
        },
      })
        .then((res) => {
          this.product = res.data.data[0];
        })
        .catch((err) => {});
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    addCar() {
      if (!localStorage.getItem("token")) {
        Toast("请登录");
        this.$router.push({ name: "Login" });
        return;
      }
      this.axios({
        method: "post",
        url: "/addcar",
        data: {
          id: localStorage.getItem("token"),
          count: this.value,
          product: this.product,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.stutas == 1205) {
            Toast("商品已存在");
            return;
          }
          if (res.data.stutas == 1201) {
            Toast("添加成功");
          } else {
            Toast("添加失败");
          }
        })
        .catch((err) => {});
    },
  },
  created() {
    let pid = this.$route.params.pid;
    // console.log(pid);
    this.getDetail(pid);
  },
};
</script>

<style lang="less" scoped>
.detail {
  .nav {
    position: fixed;
    width: 100%;
    height: 46px;
    top: 0;
    z-index: 10;
  }
  .pic {
    margin-top: 46px;
    .pic-top {
      position: relative;
      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
      .text {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
      .tow-icon {
        position: absolute;
        display: flex;
        justify-content: space-between;
        top: 0;
        height: 35px;
        width: 100%;

        .left-icon,
        .right-icon {
          width: 30px;
          height: 30px;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
        }
        .left-icon {
          margin-left: 5px;
          position: relative;
        }
        .right-icon {
          margin-right: 5px;
          position: relative;
        }
        .van-icon {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
        }
      }
    }
    .pic-bottom {
      // height: 100px;
      background-color: #fff;
      padding: 10px;
    }
    .title-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      font-weight: 580;
    }
    .price {
      font-size: 20px;
      font-weight: 580;
      color: #f72d2b;
      margin-top: 7px;
    }
  }
  .choose-count {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    margin-top: 5px;
  }
  .detail-evaluate {
    background-color: #fff;
    .detail-top {
      display: flex;
      height: 30px;
      padding: 0 10px;
      border-bottom: 1px solid #eddbdb;
      .detail,
      .evaluate {
        height: 29px;
        line-height: 29px;
        text-align: center;
        margin-right: 10px;
      }
      .detail {
        color: #333;
        font-weight: 550;
        border-bottom: 2px solid #868633;
      }
    }
    .desc-box {
      padding: 10px;
      .manager-box {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .manager-title {
          width: 120px;
          margin-right: 10px;
        }
        span::after {
          content: "+";
        }
        span:last-child::after {
          content: "";
        }
        .query {
          height: 15px;
          width: 15px;
          border-radius: 50%;
          border: 1px solid gray;
          text-align: center;
          line-height: 15px;
          color: gray;
        }
        .main-detail {
          font-weight: 550;
          color: #3e3333;
        }
      }
    }
  }
  .notice-box {
    background-color: #fff;
    margin-top: 5px;
    padding: 5px 0;
    margin-bottom: 60px;
    .notice-title {
      padding: 0 5px;
      font-size: 14px;
    }
    .thing {
      color: gray;
      margin-top: 10px;
      padding: 0 5px;
    }
  }
}
</style>