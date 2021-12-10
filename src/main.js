import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "lib-flexible/flexible";
import {
  NavBar,
  Form,
  Field,
  Button,
  Tabbar,
  TabbarItem,
  Toast,
  Popup,
  Search,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Icon,
  Stepper,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  Empty,
  AddressList,
  AddressEdit,
} from "vant";

Vue.config.productionTip = false;
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast);
Vue.use(Popup);
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Icon);
Vue.use(Stepper);
Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Empty);
Vue.use(AddressList);
Vue.use(AddressEdit);

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么

    Toast.loading({
      message: "加载中",
      forbidClick: true,
    });
    return config;
  },
  (error) => {
    Toast.clear();
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    Toast.clear();
    // console.log("response==>", response);
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    Toast.clear();

    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
