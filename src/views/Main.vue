<template>
  <div id="main">
    <router-view />
    <van-tabbar v-model="active" route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item v-for="(item,index) in tabbarList" :key="index" :to="item.to">
        <span>{{item.title}}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active :item. icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      active: 0,
      tabbarList: [
        {
          title: "首页",
          icon: {
            active: require("../assets/images/tabbar/home@act.png"),
            inactive: require("../assets/images/tabbar/home.png")
          },
          to: {
            name: "Home"
          }
        },
        {
          title: "分类",
          icon: {
            active: require("../assets/images/tabbar/order@act.png"),
            inactive: require("../assets/images/tabbar/order.png")
          },
          to: {
            name: "Order"
          }
        },
        {
          title: "订单",
          icon: {
            active: require("../assets/images/tabbar/shopbag@act.png"),
            inactive: require("../assets/images/tabbar/shopbag.png")
          },
          to: {
            name: "Shopbag"
          }
        },
        {
          title: "我的",
          icon: {
            active: require("../assets/images/tabbar/my@act.png"),
            inactive: require("../assets/images/tabbar/my.png")
          },
          to: {
            name: "My"
          }
        }
      ]
    };
  }
};
</script lang="less" scoped>

<style>
</style>