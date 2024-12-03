Component({
  data: {
    selected: 0,
    list: [{
      pagePath: "/pages/index/index",
      text: "首页",
      iconPath: "/assets/icons/home.png",
      selectedIconPath: "/assets/icons/home-active.png"
    }, {
      pagePath: "/pages/tools/tools",
      text: "工具",
      iconPath: "/assets/icons/tools.png",
      selectedIconPath: "/assets/icons/tools-active.png"
    }, {
      pagePath: "/pages/profile/profile",
      text: "我的",
      iconPath: "/assets/icons/profile.png",
      selectedIconPath: "/assets/icons/profile-active.png"
    }]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
      this.setData({
        selected: data.index
      });
    }
  }
}); 