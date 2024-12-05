Component({
  data: {
    selected: 0,
    list: [{
      pagePath: "/pages/index/index",
      text: "首页",
      imageUnActive: "/assets/icons/home-unactive.png",
      image: "/assets/icons/home.png",
    }, {
      pagePath: "/pages/tools/tools",
      text: "工具",
      imageUnActive: "/assets/icons/tools-unactive.png",
      image: "/assets/icons/tools.png"
    }, {
      pagePath: "/pages/profile/profile",
      text: "我的",
      imageUnActive: "/assets/icons/mine-unactive.png",
      image: "/assets/icons/mine.png"
    }]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
      setTimeout(() => {
        this.setData({
          selected: data.index
        });
      }, 0)
    }
  }
}); 