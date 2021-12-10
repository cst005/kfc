<template>
  <div class="shopBag">
    <div class="nav">
      <van-nav-bar title="购物车" fixed>
        <template #right v-if="!show">
          <div class="nav-right" v-if="shopbagData.length > 0" @click="edit">编辑</div>
        </template>
        <template #right v-else>
          <div class="nav-right" v-if="shopbagData.length > 0" @click="edit">完成</div>
        </template>
      </van-nav-bar>
    </div>

    <div class="empty" v-if="shopbagData.length == 0">
      <van-empty
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="购物车空空如也"
      />
    </div>
    <div v-if="shopbagData.length > 0">
      <div class="pink-area"></div>

      <div class="main-content">
        <div class="product-item" v-for="(item, index) in shopbagData" :key="index">
          <div class="choose">
            <van-checkbox v-model="item.checked" @change="danSelect"></van-checkbox>
          </div>
          <div class="detail-product">
            <img :src="item.product.smallImg" />
            <div class="right-box">
              <div class="pro-name">{{ item.product.name }}</div>
              <div class="price-bu">
                <div class="price">￥{{ item.product.Price }}元</div>
                <div class="bu">
                  <van-stepper v-model="item.count" theme="round" button-size="22" disable-input />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pay" v-if="!show">
        <div class="check">
          <van-checkbox v-model="allChoose" @click="allSelect">全选</van-checkbox>
        </div>
        <div class="all">
          合计：
          <span>&yen;{{ allPrice }}元</span>
        </div>
        <div class="order" @click="toOrder">提交订单</div>
      </div>

      <div class="del" v-else>
        <div class="check">
          <van-checkbox v-model="allChoose" @click="allSelect">全选</van-checkbox>
        </div>
        <div class="all-del" @click="delete1">删除选择</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  name: "Shopbag",
  data() {
    return {
      shopbagData: [],
      allChoose: false,
      show: false,
      delArr: []
    };
  },
  created() {
    this.getCar();
  },
  computed: {
    allPrice() {
      let price = 0;
      for (let index = 0; index < this.shopbagData.length; index++) {
        if (this.shopbagData[index].checked) {
          price =
            price +
            Number(this.shopbagData[index].count) *
              Number(this.shopbagData[index].product.Price);
        }
      }
      return price.toFixed(2);
    }
  },
  methods: {
    getCar() {
      this.axios({
        method: "get",
        url: "/findcar",
        params: {
          id: localStorage.getItem("token")
        }
      })
        .then(res => {
          this.shopbagData = [];
          if (res.data.stutas == 1302) {
            res.data.data.map(v => {
              v.checked = false;
            });
            this.shopbagData = res.data.data;
          }
        })
        .catch(err => {});
    },
    danSelect() {
      for (let index = 0; index < this.shopbagData.length; index++) {
        if (this.shopbagData[index].checked == false) {
          this.allChoose = false;
          return;
        }
      }
      this.allChoose = true;
    },
    allSelect() {
      this.shopbagData.map(v => {
        v.checked = this.allChoose;
      });
    },
    edit() {
      this.show = !this.show;
    },
    collection() {
      this.delArr = [];
      this.shopbagData.map(v => {
        if (v.checked == true) {
          this.delArr.push(v.carId);
        }
      });
    },
    delete1() {
      if (!localStorage.getItem("token")) {
        this.$router.push({ name: "Login" });
        return;
      }
      this.collection();
      this.axios({
        method: "post",
        url: "deleteCar",
        data: {
          id: localStorage.getItem("token"),
          carIdArr: this.delArr
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.stutas == 1501) {
            Toast("删除成功");
            this.getCar();
          }
        })
        .catch(err => {});
    },
    toOrder() {
      let pass = false;
      this.shopbagData.map(v => {
        if (v.checked == true) {
          pass = true;
        }
      });
      if (!pass) {
        Toast("请勾选");
        return;
      }
      let data = [];
      this.shopbagData.map((v, index) => {
        if (v.checked == true) {
          data.push(this.shopbagData[index]);
        }
      });

      this.$router.push({
        name: "Pay",
        query: { data: JSON.stringify(data), allPrice: this.allPrice }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.shopBag {
  overflow: hidden;
}

.nav {
  position: fixed;
  width: 100%;
  height: 46px;
  z-index: 999;
  .nav-right {
    color: #333;
  }
}
.empty {
  margin-top: 20px;

  /deep/ .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
}
.pink-area {
  height: 50px;
  background-color: pink;
  margin-top: 46px;
}
.main-content {
  padding: 10px;
  .product-item {
    display: flex;
    align-items: center;
    height: 100px;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    margin-top: 10px;
  }
  .product-item:nth-last-child(1) {
    margin-bottom: 100px;
  }
  .choose {
    width: 35px;
    margin-left: 10px;
  }
  .detail-product {
    flex: 1;
    display: flex;
    height: 100px;
    img {
      width: 100px;
      height: 100px;
    }
    .right-box {
      flex: 1;
      height: 80px;
      padding: 10px;
      .pro-name {
        height: 40px;
        font-size: 16px;
        color: #333;
        width: 200px;
        /* 多行文本溢出 */
        text-overflow: ellipsis;
        word-wrap: break-word;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2; /*行数*/
        -webkit-box-orient: vertical;
      }
      .price-bu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
      }
    }
  }
}
.pay,
.del {
  position: fixed;
  bottom: 50px;
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  font-size: 16px;
}
.check {
  margin-left: 10px;
}
.all {
  margin-left: 30px;
}
.order,
.all-del {
  padding: 10px 20px;
  background-color: #fb4d30;
  color: #fff;
  border-radius: 30px;
}
</style>
