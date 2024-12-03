// pages/bindCar/bindCar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedCar: null,
    plateNumber: '',
    vin: '',
    purchaseDate: '',
    mileage: '',
    showCarSelector: false,
    searchKeyword: '',
    carList: [],
    filteredCars: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadCarList();
  },

  loadCarList() {
    // 模拟加载车型数据
    const mockCarList = [
      {
        id: 1,
        brand: '海鸥汽车',
        name: 'Seagull 致臻版',
        image: '/assets/cars/seagull1.png'
      },
      {
        id: 2,
        brand: '海鸥汽车',
        name: 'Seagull 智享版',
        image: '/assets/cars/seagull2.png'
      }
    ];

    this.setData({
      carList: mockCarList,
      filteredCars: mockCarList
    });
  },

  showCarSelector() {
    this.setData({ showCarSelector: true });
  },

  hideCarSelector() {
    this.setData({
      showCarSelector: false,
      searchKeyword: '',
      filteredCars: this.data.carList
    });
  },

  onSearchInput(e) {
    const keyword = e.detail.value.toLowerCase();
    const filtered = this.data.carList.filter(car => 
      car.brand.toLowerCase().includes(keyword) || 
      car.name.toLowerCase().includes(keyword)
    );
    
    this.setData({
      searchKeyword: keyword,
      filteredCars: filtered
    });
  },

  onCarSelect(e) {
    const car = e.currentTarget.dataset.car;
    this.setData({
      selectedCar: car,
      showCarSelector: false,
      searchKeyword: '',
      filteredCars: this.data.carList
    });
  },

  onPlateNumberInput(e) {
    this.setData({ plateNumber: e.detail.value });
  },

  onVinInput(e) {
    this.setData({ vin: e.detail.value });
  },

  onDateChange(e) {
    this.setData({ purchaseDate: e.detail.value });
  },

  onMileageInput(e) {
    this.setData({ mileage: e.detail.value });
  },

  validateForm() {
    const { selectedCar, plateNumber, vin, purchaseDate, mileage } = this.data;
    
    if (!selectedCar) {
      wx.showToast({
        title: '请选择车型',
        icon: 'none'
      });
      return false;
    }

    if (!plateNumber) {
      wx.showToast({
        title: '请输入车牌号码',
        icon: 'none'
      });
      return false;
    }

    if (!vin || vin.length !== 17) {
      wx.showToast({
        title: '请输入正确的车架号',
        icon: 'none'
      });
      return false;
    }

    if (!purchaseDate) {
      wx.showToast({
        title: '请选择购车日期',
        icon: 'none'
      });
      return false;
    }

    if (!mileage) {
      wx.showToast({
        title: '请输入行驶里程',
        icon: 'none'
      });
      return false;
    }

    return true;
  },

  bindCar() {
    if (!this.validateForm()) return;

    wx.showLoading({ title: '绑定中...' });

    // 模拟API调用
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '绑定成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 2000);
        }
      });
    }, 1500);
  }
})