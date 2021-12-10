<template>
  <div class="product">
    <div class="pic">
      <img :src="pro.smallImg" />
    </div>
    <p class="product-title">{{pro.name}}</p>
    <p class="product-price">￥{{pro.Price}}元</p>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    pro: Object
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.product {
  .pic {
    text-align: center;
    img {
      width: 150px;
      height: 150px;
    }
  }

  .product-title {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    padding: 0 10px;
    text-align: left;
    font-size: 14px;
    color: #333;
  }
  .product-price {
    text-align: left;
    font-weight: bold;
    color: #588ec9;
    padding: 0 10px;
    font-size: 12px;
  }
}
</style>