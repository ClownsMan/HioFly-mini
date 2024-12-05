Page({
  data: {
    banners: [
      { id: 1, image: '/assets/images/swiper1.png' },
      { id: 2, image: '/assets/images/swiper2.png' },
    ],
    quickActions: [
      { 
        id: 1, 
        name: '车贷计算', 
        icon: '/assets/icons/loan.png',
        url: '/pages/carLoan/carLoan',
        iconClass: 'icon-jisuan'
      },
      { 
        id: 2, 
        name: '充电桩', 
        icon: '/assets/icons/charging.png',
        url: '/pages/chargingStation/chargingStation',
        iconClass: 'icon-chongdian'
      },
      { 
        id: 3, 
        name: '停车场', 
        icon: '/assets/icons/parking.png',
        url: '/pages/parking/parking',
        iconClass: 'icon-parking'
      },
      { 
        id: 4, 
        name: '车型对比', 
        icon: '/assets/icons/compare.png',
        url: '/pages/carCompare/carCompare',
        iconClass: 'icon-vs'
      }
    ]
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      });
    }
  },

  navigateTo(e) {
    const { url } = e.currentTarget.dataset;
    wx.navigateTo({ url });
  },

  changeCar() {
    wx.navigateTo({
      url: '/pages/bindCar/bindCar'
    });
  }
}); 