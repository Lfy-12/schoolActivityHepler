export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/category/index",
    "pages/user/index",
  ],
  subPackages: [
    {
      "root":"pageA/",
      "pages":[
        "pages/activity_item/index",
        "pages/my_activity/index",
        "pages/add_activity/index",
        "pages/date_activity/index",
      ],
    },
    {
      "root":"pageB/",
      "pages":[
        "pages/apply/index",
        "pages/feedback/index",
        "pages/about/index"
      ],
    }
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#eb4450",
    navigationBarTitleText: "校园活动助手",
    navigationBarTextStyle: "white",
  },
  tabBar: {
    "color": "#999",
    "selectedColor": "#ff2d4a",
    "backgroundColor": "#fafafa",
    "position": "bottom",
    "borderStyle": "black",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "pages/images/index.png",  // 未点击时显示的图片
        selectedIconPath: "pages/images/index-active.png"  // 点击后显示的图片
      },
      {
        pagePath: "pages/category/index",
        text: "分类",
        iconPath: "pages/images/category.png",
        selectedIconPath: "pages/images/category-active.png"
      },
      {
        pagePath: "pages/user/index",
        text: "我的",
        iconPath: "pages/images/user.png",
        selectedIconPath: "pages/images/user-active.png"
      }
    ]
  },
  "lazyCodeLoading": "requiredComponents"
});
