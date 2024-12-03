Page({
  data: {
    leftCar: null,
    rightCar: null,
    showCarSelector: false,
    currentSelectSide: '', // 'left' or 'right'
    searchKeyword: '',
    carList: [], // 所有车型数据
    filteredCars: [], // 搜索过滤后的车型
    compareCategories: [
      {
        category: '基本参数',
        params: [
          { name: '车身尺寸', key: 'size', unit: 'mm' },
          { name: '轴距', key: 'wheelbase', unit: 'mm' },
          { name: '整备质量', key: 'weight', unit: 'kg' }
        ]
      },
      {
        category: '动力参数',
        params: [
          { name: '最大功率', key: 'power', unit: 'kW' },
          { name: '最大扭矩', key: 'torque', unit: 'N·m' },
          { name: '电池容量', key: 'batteryCapacity', unit: 'kWh' }
        ]
      },
      {
        category: '性能参数',
        params: [
          { name: '最高车速', key: 'maxSpeed', unit: 'km/h' },
          { name: '续航里程', key: 'range', unit: 'km' },
          { name: '百公里加速', key: 'acceleration', unit: 's' }
        ]
      }
    ]
  },

  onLoad() {
    this.loadCarList();
  },

  loadCarList() {
    // 模拟加载车型数据
    const mockCarList = [
      {
        id: 1,
        brand: '海鸥汽车',
        name: 'Seagull 致臻版',
        image: '/assets/cars/seagull1.png',
        price: '15.99',
        size: '4800×1875×1500',
        wheelbase: '2800',
        weight: '1850',
        power: '160',
        torque: '310',
        batteryCapacity: '72.8',
        maxSpeed: '180',
        range: '500',
        acceleration: '7.9'
      },
      {
        id: 2,
        brand: '海鸥汽车',
        name: 'Seagull 智享版',
        image: '/assets/cars/seagull2.png',
        price: '13.99',
        size: '4800×1875×1500',
        wheelbase: '2800',
        weight: '1820',
        power: '150',
        torque: '290',
        batteryCapacity: '65.8',
        maxSpeed: '170',
        range: '450',
        acceleration: '8.5'
      }
    ];

    this.setData({
      carList: mockCarList,
      filteredCars: mockCarList
    });
  },

  selectCar(e) {
    const side = e.currentTarget.dataset.side;
    this.setData({
      showCarSelector: true,
      currentSelectSide: side
    });
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
    const side = this.data.currentSelectSide;
    
    this.setData({
      [side + 'Car']: car,
      showCarSelector: false,
      searchKeyword: '',
      filteredCars: this.data.carList
    });

    if (this.data.leftCar && this.data.rightCar) {
      this.compareParams();
    }
  },

  compareParams() {
    const categories = this.data.compareCategories.map(category => {
      const params = category.params.map(param => {
        const leftValue = parseFloat(this.data.leftCar[param.key]);
        const rightValue = parseFloat(this.data.rightCar[param.key]);
        
        let winner = '';
        if (param.key === 'acceleration') {
          // 加速时间越小越好
          winner = leftValue < rightValue ? 'left' : (leftValue > rightValue ? 'right' : '');
        } else {
          // 其他参数越大越好
          winner = leftValue > rightValue ? 'left' : (leftValue < rightValue ? 'right' : '');
        }
        
        return { ...param, winner };
      });
      
      return { ...category, params };
    });

    this.setData({ compareCategories: categories });
  }
}); 