<template>
  <div class="pay">
    <van-nav-bar
      title="订单结算"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <div class="big-content">
      <div class="choose-address">
        <div class="address-title" @click="showPopup">
          <div>选择地址</div>
          <van-icon size="14" name="arrow" />
        </div>
        <div class="detail-user">
          <div class="top-user">
            <div class="user-name">{{ address.name }}</div>
            <div class="user-tel">{{ address.phone }}</div>
            <div class="user-default" v-if="address.isDefault">默认</div>
          </div>
          <div class="botom-user">{{ address.detailAddress }}</div>
        </div>
      </div>
      <div class="order-msg">
        <div class="order-title">订单信息</div>
        <div class="product-item" v-for="(item, index) in product" :key="index">
          <div class="detail-product">
            <img :src="item.product.smallImg" alt />
            <div class="right-box">
              <div class="pro-name">{{ item.product.name }}</div>
              <div class="price-bu">
                <div class="price">&yen;{{ item.product.Price }}</div>
                <div class="bu">x{{ item.count }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="time">{{ time }}</div>
          <div class="count-all">
            <div class="count">共计1件</div>
            <div class="price">合计￥18元</div>
          </div>
        </div>
      </div>
      <div class="submit">
        <van-button color="red" block round type="primary" @click="addset"
          >主要按钮</van-button
        >
      </div>
    </div>

    <van-popup
      v-model="show"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '50%' }"
      ><van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @select="oneSelect"
    /></van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
const unti = require("../assets/js/util.js");
export default {
  data() {
    return {
      product: [], //产品数据
      allPrice: 0, //产品总价格
      show: false,
      chosenAddressId: "1",
      list: [],
      address: {
        name: "",
        phone: "",
        isDefault: false,
        detailAddress: "",
      },
      time: unti.formatTime(new Date()),
    };
  },

  created() {
    // 输出一下

    this.product = JSON.parse(this.$route.query.data);
    console.log(this.product);
    this.allPrice = this.$route.query.allPrice;
    this.getAddress();
  },
  methods: {
    oneSelect(item, index) {
      console.log(item);
      console.log(index);
      this.address.name = item.name;
      this.address.phone = item.tel;
      this.address.isDefault = item.isDefault;
      this.address.detailAddress = item.address;
      this.chosenAddressId = item.id;
    },
    getAddress() {
      this.axios({
        method: "get",
        url: "/findAddress",
        params: {
          userId: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.data.length > 0) {
            this.list = [];
            res.data.data.map((v) => {
              let obj = {};
              (obj.id = v.addId),
                (obj.name = v.name),
                (obj.tel = v.phone),
                (obj.address = v.area + v.detialArea),
                (obj.isDefault = v.defaultAddress);

              this.list.push(obj);
              if (v.defaultAddress) {
                this.address.name = v.name;
                this.address.phone = v.phone;
                this.address.isDefault = v.defaultAddress;
                this.address.detailAddress = v.area + v.detialArea;

                this.chosenAddressId = v.addId;
              } else {
                this.address.name = this.list[0].name;
                this.address.phone = this.list[0].tel;
                this.address.isDefault = false;
                this.address.detailAddress = this.list[0].address;
                this.chosenAddressId = this.list[0].id;
              }
            });
          }
        })
        .catch((err) => {});
    },
    showPopup() {
      this.show = true;
    },
    onClickLeft() {
      //   返回上一个页面
      this.$router.go(-1);
    },
    addset() {
      if (!this.address.name) {
        Toast("请选择地址");
        return;
      }
      this.axios({
        method: "post",
        url: "/order",
        data: {
          id: localStorage.getItem("token"),
          product: this.product,
          allPrice: this.allPrice,
          address: this.address.detailAddress,
        },
      })
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "Morder" });
        })
        .catch((err) => {});
    },
    onAdd() {
      this.$router.push({ name: "NewAddress" });
    },
  },
};
</script>

<style lang="less" scoped>
.big-content {
  padding: 10px;
  margin-top: 45px;

  .choose-address {
    // height: 100px;
    background: white;
    padding: 10px;
    // 上右下左
    border-radius: 10px 10px 0 0;
  }

  .address-title {
    display: flex;
    align-items: center;
    font-size: 14px;
    div {
      margin-right: 5px;
    }
  }

  .top-user {
    display: flex;
    align-items: center;
    height: 20px;
    font-size: 14px;
    margin-top: 10px;
    div {
      margin-right: 5px;
    }

    .user-default {
      background: crimson;
      color: white;
      width: 40px;
      height: 20px;
      text-align: center;
      border-radius: 10px;
    }
  }

  .botom-user {
    font-size: 14px;
    margin-top: 5px;
  }

  .order-msg {
    // height: 200px;
    background: white;
    border-radius: 10px 10px 0 0;
    // 内边距
    padding: 10px;
    margin-top: 10px;

    .order-title {
      font-size: 14px;
    }
  }

  .product-item {
    height: 100px;
    border-radius: 10px;
    background: white;
    display: flex;
    align-items: center;
    overflow: hidden;

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
}
.footer {
  // height: 100px;
  background-color: #fff;
  font-size: 14px;
  border-top: 1px dashed gray;
  .time {
    margin-top: 10px;
  }
  .count-all {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
}
.submit {
  margin-top: 10px;
}
</style>
