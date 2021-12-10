<template>
  <div class="morder">
    <van-nav-bar
      title="我的订单"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <div class="product-wrap">
      <div class="product-item" v-for="(item, index) in product" :key="index">
        <div class="detail-product">
          <img :src="item.product[0].product.smallImg" alt />
          <div class="right-box">
            <div class="pro-name">{{ item.product[0].product.name }}</div>
            <div class="price-bu">
              <div class="price">&yen;{{ item.allPrice }}</div>
              <div class="bu">x1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Morder",
  data() {
    return {
      product: [],
      active: 2,
    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      this.axios({
        method: "get",
        url: "/getOrder",
        params: {
          id: localStorage.getItem("token"),
          stutas: this.active,
        },
      })
        .then((res) => {
          console.log(res);
          this.product = res.data.data;
        })
        .catch((err) => {});
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.morder {
  overflow: hidden;
}
.product-wrap {
  margin-top: 56px;
}
.product-item {
  height: 100px;
  border-radius: 10px;
  background: white;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 10px 10px;
  .choose {
    width: 35px;
    margin-left: 10px;
  }
}

.detail-product {
  // background: pink;
  flex: 1;
  height: 100px;
  display: flex;

  img {
    height: 100px;
    width: 100px;
  }

  .right-box {
    flex: 1;
    height: 80px;
    padding: 10px;
    // background: skyblue;

    .pro-name {
      height: 40px;
      font-size: 16px;
      // background: pink;
      width: 200px;
      /* 多行文本溢出 */
      text-overflow: ellipsis;
      word-wrap: break-word;
      overflow: hidden;
      display: -webkit-box;
      /*行数*/
      -webkit-line-clamp: 2;

      -webkit-box-orient: vertical;
    }

    .price-bu {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>