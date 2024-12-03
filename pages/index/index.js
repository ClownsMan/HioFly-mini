Page({
  data: {
    swiperList: [
      { id: 1, image: '/assets/images/swiper1.png' },
      { id: 2, image: '/assets/images/swiper2.png' },
      { id: 3, image: '/assets/images/swiper3.png' }
    ],
    quickTools: [
      { id: 1, name: '车贷计算', icon: '/assets/icons/loan.png', url: '/pages/carLoan/carLoan' },
      { id: 2, name: '充电桩', icon: '/assets/icons/charging.png', url: '/pages/chargingStation/chargingStation' },
      { id: 3, name: '停车场', icon: '/assets/icons/parking.png', url: '/pages/parking/parking' },
      { id: 4, name: '车型对比', icon: '/assets/icons/compare.png', url: '/pages/carCompare/carCompare' }
    ],
    carImages: [],
    currentImageIndex: 0,
    startX: 0,
    moving: false
  },

  navigateToTool(e) {
    const { url } = e.currentTarget.dataset;
    wx.navigateTo({ url });
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0  // 首页
      });
    }
  },

  onLoad() {
    this.loadCarImages();
  },

  loadCarImages() {
    const images = [];
    for (let i = 0; i < 36; i++) {
      images.push(`/assets/car-360/${i}.png`);
    }
    this.setData({ carImages: images });

    images.forEach(src => {
      wx.getImageInfo({
        src: src,
        success: () => {
          // 图片加载成功
        },
        fail: () => {
          console.error('Failed to load image:', src);
        }
      });
    });
  },

  touchStart(e) {
    this.setData({
      startX: e.touches[0].pageX,
      moving: true
    });
  },

  touchMove(e) {
    if (!this.data.moving) return;

    const currentX = e.touches[0].pageX;
    const diff = currentX - this.data.startX;
    
    if (Math.abs(diff) > 10) {
      const direction = diff > 0 ? 1 : -1;
      let newIndex = this.data.currentImageIndex - direction;
      
      if (newIndex >= this.data.carImages.length) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = this.data.carImages.length - 1;
      }

      this.setData({
        currentImageIndex: newIndex,
        startX: currentX
      });
    }
  },

  touchEnd() {
    this.setData({ moving: false });
  }
}); 