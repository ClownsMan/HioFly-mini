Page({
  data: {
    tools: [
      { id: 1, name: '车贷计算', icon: '/assets/images/tool-item.png', url: '/pages/carLoan/carLoan',
      iconClass: 'icon-jisuan' },
      { id: 2, name: '充电桩查询', icon: '/assets/images/tool-item.png', url: '/pages/chargingStation/chargingStation',
      iconClass: 'icon-chongdian' },
      { id: 3, name: '停车场查询', icon: '/assets/images/tool-item.png', url: '/pages/parking/parking',
      iconClass: 'icon-parking' },
      { id: 4, name: '车型对比', icon: '/assets/images/tool-item.png', url: '/pages/carCompare/carCompare',
      iconClass: 'icon-vs' }
    ]
  },

  navigateToTool(e) {
    const { url } = e.currentTarget.dataset;
    wx.navigateTo({ url });
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1  // 工具页
      });
    }
  }
}); 