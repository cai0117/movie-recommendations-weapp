export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/mine/index",
    "pages/movie-classification/index",
    "pages/community/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
    navigationStyle: "custom",
  },
  tabBar: {
    selectedColor: "#1480c5",
    color: "#181818",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "./images/store.png",
        selectedIconPath: "./images/store_selected.png",
        text: "首页",
      },
      {
        pagePath: "pages/movie-classification/index",
        iconPath: "./images/order.png",
        selectedIconPath: "./images/order_selected.png",
        text: "电影分类",
      },
      {
        pagePath: "pages/community/index",
        iconPath: "./images/order.png",
        selectedIconPath: "./images/order_selected.png",
        text: "社区",
      },
      {
        pagePath: "pages/mine/index",
        iconPath: "./images/account.png",
        selectedIconPath: "./images/account_selected.png",
        text: "我的",
      },
    ],
  },
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于定位效果展示",
    },
    "scope.writePhotosAlbum": {
      desc: "请求获取您的相册权限",
    },
  },
  requiredBackgroundModes: ["audio", "location"],
  requiredPrivateInfos: ["getLocation", "choosePoi", "chooseLocation"],
});
