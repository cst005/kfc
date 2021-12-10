<template>
  <div class="newAddress">
    <van-nav-bar
      title="新增地址"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <div class="edit">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import areaList from "../assets/js/area.js";
export default {
  name: "NewAddress",
  data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  methods: {
    onSave(content) {
      console.log(content);
      this.axios({
        method: "post",
        url: "/address",
        data: {
          userId: localStorage.getItem("token"),
          name: content.name,
          phone: content.tel,
          area: content.province + content.city + content.county,
          detialArea: content.addressDetail,
          mail: content.postalCode,
          defaultAddress: content.isDefault,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.stutas == 1999) {
            Toast("添加成功");
            this.$router.go(-1);
          }
        })
        .catch((err) => {});
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.edit {
  margin-top: 46px;
}
</style>