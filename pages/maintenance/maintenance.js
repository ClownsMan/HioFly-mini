// pages/maintenance/maintenance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    car: null,
    nextMaintenance: null,
    records: [],
    showAddRecord: false,
    newRecord: {
      date: '',
      mileage: '',
      services: [{ name: '', price: '' }]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadCarInfo();
    this.loadMaintenanceRecords();
  },

  loadCarInfo() {
    // 模拟加载车辆信息
    const mockCar = {
      brand: '海鸥汽车',
      name: 'Seagull 致臻版',
      image: '/assets/cars/seagull1.png',
      plateNumber: '京A12345',
      mileage: '5000'
    };

    const mockNextMaintenance = {
      date: '2024-06-15',
      remainDays: 60,
      remainMileage: 2000
    };

    this.setData({
      car: mockCar,
      nextMaintenance: mockNextMaintenance
    });
  },

  loadMaintenanceRecords() {
    // 模拟加载保养记录
    const mockRecords = [
      {
        id: 1,
        date: '2024-01-15',
        mileage: '3000',
        services: [
          { name: '机油更换', price: '500' },
          { name: '机滤更换', price: '200' }
        ],
        totalPrice: '700'
      }
    ];

    this.setData({ records: mockRecords });
  },

  addRecord() {
    this.setData({
      showAddRecord: true,
      newRecord: {
        date: '',
        mileage: '',
        services: [{ name: '', price: '' }]
      }
    });
  },

  hideAddRecord() {
    this.setData({ showAddRecord: false });
  },

  onDateChange(e) {
    this.setData({
      'newRecord.date': e.detail.value
    });
  },

  onMileageInput(e) {
    this.setData({
      'newRecord.mileage': e.detail.value
    });
  },

  onServiceNameInput(e) {
    const index = e.currentTarget.dataset.index;
    const services = this.data.newRecord.services;
    services[index].name = e.detail.value;
    this.setData({
      'newRecord.services': services
    });
  },

  onServicePriceInput(e) {
    const index = e.currentTarget.dataset.index;
    const services = this.data.newRecord.services;
    services[index].price = e.detail.value;
    this.setData({
      'newRecord.services': services
    });
  },

  addService() {
    const services = this.data.newRecord.services;
    services.push({ name: '', price: '' });
    this.setData({
      'newRecord.services': services
    });
  },

  deleteService(e) {
    const index = e.currentTarget.dataset.index;
    const services = this.data.newRecord.services;
    if (services.length > 1) {
      services.splice(index, 1);
      this.setData({
        'newRecord.services': services
      });
    }
  },

  validateRecord() {
    const { date, mileage, services } = this.data.newRecord;
    
    if (!date) {
      wx.showToast({
        title: '请选择保养日期',
        icon: 'none'
      });
      return false;
    }

    if (!mileage) {
      wx.showToast({
        title: '请输入保养里程',
        icon: 'none'
      });
      return false;
    }

    for (const service of services) {
      if (!service.name || !service.price) {
        wx.showToast({
          title: '请完善保养项目信息',
          icon: 'none'
        });
        return false;
      }
    }

    return true;
  },

  saveRecord() {
    if (!this.validateRecord()) return;

    wx.showLoading({ title: '保存中...' });

    // 计算总价
    const totalPrice = this.data.newRecord.services.reduce(
      (sum, service) => sum + parseFloat(service.price || 0), 0
    ).toFixed(2);

    // 模拟保存记录
    setTimeout(() => {
      const newRecord = {
        id: Date.now(),
        ...this.data.newRecord,
        totalPrice
      };

      const records = [newRecord, ...this.data.records];
      
      this.setData({
        records,
        showAddRecord: false
      });

      wx.hideLoading();
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });
    }, 1500);
  }
})