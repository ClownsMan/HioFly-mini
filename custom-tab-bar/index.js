Component({
  data: {
    selected: 0,
    list: [{
      pagePath: "/pages/index/index",
      text: "首页",
      icon: "icon-shouye"
    }, {
      pagePath: "/pages/tools/tools",
      text: "工具",
      icon: "icon-gongju"
    }, {
      pagePath: "/pages/profile/profile",
      text: "我的",
      icon: "icon-31wode"
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