Page({
  data: {
    latitude: 39.908860,
    longitude: 116.397390,
    markers: [],
    stations: [],
    keyword: ''
  },

  onLoad() {
    this.getLocation();
  },

  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        this.searchNearby();
      },
      fail: () => {
        wx.showToast({
          title: '请开启位置权限',
          icon: 'none'
        });
      }
    });
  },

  onSearchInput(e) {
    this.setData({
      keyword: e.detail.value
    });
  },

  searchNearby() {
    wx.showLoading({
      title: '搜索中...'
    });

    // 这里应该调用实际的API，这里使用模拟数据
    const mockStations = [
      {
        id: 1,
        name: '示例充电站1',
        address: '北京市朝阳区xx路xx号',
        latitude: this.data.latitude + 0.01,
        longitude: this.data.longitude + 0.01,
        distance: '1.2',
        availableCount: 5,
        totalCount: 10,
        price: '1.5'
      },
      {
        id: 2,
        name: '示例充电站2',
        address: '北京市海淀区xx路xx号',
        latitude: this.data.latitude - 0.01,
        longitude: this.data.longitude - 0.01,
        distance: '2.4',
        availableCount: 3,
        totalCount: 8,
        price: '1.8'
      }
    ];

    setTimeout(() => {
      const markers = mockStations.map(station => ({
        id: station.id,
        latitude: station.latitude,
        longitude: station.longitude,
        width: 30,
        height: 30,
        callout: {
          content: station.name,
          padding: 5,
          borderRadius: 5,
          display: 'ALWAYS'
        }
      }));

      this.setData({
        stations: mockStations,
        markers
      });

      wx.hideLoading();
    }, 1000);
  },

  selectStation(e) {
    const station = e.currentTarget.dataset.station;
    wx.openLocation({
      latitude: station.latitude,
      longitude: station.longitude,
      name: station.name,
      address: station.address,
      scale: 18
    });
  }
}); 