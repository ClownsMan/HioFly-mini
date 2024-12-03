Page({
  data: {
    latitude: 39.908860,
    longitude: 116.397390,
    markers: [],
    parkingLots: [],
    keyword: '',
    showFilterModal: false,
    minPrice: '',
    maxPrice: '',
    parkingTypes: [
      { id: 1, name: '路边停车', selected: false },
      { id: 2, name: '地下停车场', selected: false },
      { id: 3, name: '立体车库', selected: false },
      { id: 4, name: '露天停车场', selected: false }
    ],
    currentFilter: {
      minPrice: '',
      maxPrice: '',
      types: []
    }
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
    this.setData({ keyword: e.detail.value });
  },

  showFilter() {
    this.setData({ showFilterModal: true });
  },

  hideFilter() {
    this.setData({ showFilterModal: false });
  },

  onMinPriceInput(e) {
    this.setData({ minPrice: e.detail.value });
  },

  onMaxPriceInput(e) {
    this.setData({ maxPrice: e.detail.value });
  },

  toggleParkingType(e) {
    const id = e.currentTarget.dataset.id;
    const parkingTypes = this.data.parkingTypes.map(type => {
      if (type.id === id) {
        return { ...type, selected: !type.selected };
      }
      return type;
    });
    this.setData({ parkingTypes });
  },

  resetFilter() {
    this.setData({
      minPrice: '',
      maxPrice: '',
      parkingTypes: this.data.parkingTypes.map(type => ({
        ...type,
        selected: false
      }))
    });
  },

  applyFilter() {
    const selectedTypes = this.data.parkingTypes
      .filter(type => type.selected)
      .map(type => type.id);

    this.setData({
      currentFilter: {
        minPrice: this.data.minPrice,
        maxPrice: this.data.maxPrice,
        types: selectedTypes
      },
      showFilterModal: false
    });

    this.searchNearby();
  },

  searchNearby() {
    wx.showLoading({ title: '搜索中...' });

    // 模拟数据，实际应用中需要调用后端API
    const mockParkingLots = [
      {
        id: 1,
        name: '示例停车场1',
        address: '北京市朝阳区xx路xx号',
        latitude: this.data.latitude + 0.01,
        longitude: this.data.longitude + 0.01,
        distance: '0.8',
        status: '空闲',
        price: '15',
        availableSpaces: 20,
        type: 2
      },
      {
        id: 2,
        name: '示例停车场2',
        address: '北京市海淀区xx路xx号',
        latitude: this.data.latitude - 0.01,
        longitude: this.data.longitude - 0.01,
        distance: '1.5',
        status: '繁忙',
        price: '10',
        availableSpaces: 5,
        type: 1
      }
    ];

    // 应用筛选条件
    const filteredParkingLots = this.filterParkingLots(mockParkingLots);

    const markers = filteredParkingLots.map(parking => ({
      id: parking.id,
      latitude: parking.latitude,
      longitude: parking.longitude,
      width: 30,
      height: 30,
      callout: {
        content: `${parking.name}\n¥${parking.price}/小时`,
        padding: 5,
        borderRadius: 5,
        display: 'ALWAYS'
      }
    }));

    setTimeout(() => {
      this.setData({
        parkingLots: filteredParkingLots,
        markers
      });
      wx.hideLoading();
    }, 1000);
  },

  filterParkingLots(parkingLots) {
    const { minPrice, maxPrice, types } = this.data.currentFilter;
    
    return parkingLots.filter(parking => {
      const priceMatch = (!minPrice || parking.price >= minPrice) && 
                        (!maxPrice || parking.price <= maxPrice);
      const typeMatch = types.length === 0 || types.includes(parking.type);
      return priceMatch && typeMatch;
    });
  },

  selectParking(e) {
    const parking = e.currentTarget.dataset.parking;
    wx.openLocation({
      latitude: parking.latitude,
      longitude: parking.longitude,
      name: parking.name,
      address: parking.address,
      scale: 18
    });
  }
}); 