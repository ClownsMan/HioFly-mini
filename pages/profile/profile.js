Page({
  data: {
    userInfo: null,
    functions: [
      {
        id: 1,
        name: '送货订单',
        icon: 'icon-order',
        url: '/pages/orders/orders'
      },
      {
        id: 2,
        name: '我的订单',
        icon: 'icon-myorder',
        url: '/pages/myOrders/myOrders'
      },
      {
        id: 3,
        name: '我的卡券',
        icon: 'icon-coupon',
        url: '/pages/coupons/coupons'
      },
      {
        id: 4,
        name: '我的活动',
        icon: 'icon-activity',
        url: '/pages/activities/activities'
      },
      {
        id: 5,
        name: '我的地址',
        icon: 'icon-address',
        url: '/pages/address/address'
      },
      {
        id: 6,
        name: '关注公众号',
        icon: 'icon-wechat',
        url: '/pages/wechat/wechat'
      }
    ]
  },

  login() {
    if (this.data.userInfo) return;
    
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo
        });
        wx.setStorageSync('userInfo', res.userInfo);
      }
    });
  },

  navigateTo(e) {
    const { url } = e.currentTarget.dataset;
    if (!this.data.userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }
    wx.navigateTo({ url });
  },

  onLoad() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({ userInfo });
    }
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2  // 我的页面
      });
    }
  }
}); 