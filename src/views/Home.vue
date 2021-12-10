<template>
  <div class="home">
    <div class="nav">
      <img src="../assets/images/icon-kfc.png" alt />
      <div class="time">下午好</div>
      <div class="search">
        <van-search v-model="value" placeholder="请输入搜索关键词"></van-search>
      </div>
    </div>
    <div class="home-main">
      <div class="banner">
        <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in banner" :key="index">
            <img :src="item.bannerImg" alt />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="hot-buy">
        <div class="hot-text">热卖推荐</div>
      </div>
      <div class="re-product clearfix">
        <div
          class="item-product"
          v-for="(item, index) in product"
          :key="index"
          @click="viewDetail(item.pid)"
        >
          <Product :pro="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from "../components/Product.vue";
export default {
  name: "Home",
  components: {
    Product,
  },
  data() {
    return {
      value: "",
      banner: [],
      product: [],
    };
  },
  methods: {
    viewDetail(pid) {
      this.$router.push({ name: "Detail", params: { pid } });
    },
    getBanner() {
      this.axios({
        method: "get",
        url: "/bannar",
      })
        .then((res) => {
          this.banner = res.data.data.result;
        })
        .catch((err) => {});
    },
    getProduct() {
      let cacheData = localStorage.getItem("cacheProduct");
      cacheData = cacheData ? JSON.parse(cacheData) : {};
      if (Object.keys(cacheData).length > 0) {
        this.product = cacheData;
        return;
      }
      console.log("发起请求");
      this.axios({
        method: "get",
        url: "/product",
      })
        .then((res) => {
          this.product = res.data.data;
          cacheData = res.data.data;
          localStorage.setItem("cacheProduct", JSON.stringify(cacheData));
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getBanner();
    this.getProduct();
  },
};
</script>

<style lang="less" scoped>
.home {
  .clearfix:before,
  .clearfix:after {
    content: "";
    display: table;
  }

  .clearfix:after {
    clear: both;
  }

  .clearfix {
    *zoom: 1;
  }

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    height: 50px;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    .time {
      font-size: 14px;
      font-weight: 580;
      margin-left: 10px;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-left: 10px;
    }
  }
  .home-main {
    padding: 10px;
    margin-top: 50px;
    .hot-buy {
      display: flex;
      align-items: center;
      height: 50px;
      background-color: #fff;
      margin-top: 10px;
    }
    .hot-text {
      height: 40px;
      background-color: #e22731;
      width: 120px;
      line-height: 40px;
      font-size: 16px;
      color: #fff;
      text-align: center;
      border-top-right-radius: 15px;
    }

    .re-product {
      padding-bottom: 50px;
      // overflow: hidden;
      .item-product {
        width: calc(50% - 5px);
        height: 210px;
        background-color: #fff;
        float: left;
        margin-top: 10px;
        margin-right: 10px;
        border-radius: 10px;
      }
      .item-product:nth-child(2n) {
        margin-right: 0;
      }
      .item-product::before {
        content: "热卖";
        position: relative;
        top: 3px;
        left: 0;
        padding: 5px;
        background-color: red;
        color: #fff;
        border-bottom-right-radius: 10px;
      }
    }
  }
  .banner {
    img {
      width: 100%;
      height: 146px;
    }
  }
}
</style>