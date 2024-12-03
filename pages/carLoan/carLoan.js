Page({
  data: {
    totalPrice: '',
    downPaymentRatios: [30, 40, 50, 60, 70],
    downPaymentIndex: 0,
    loanTerms: [1, 2, 3, 4, 5],
    loanTermIndex: 2,
    interestRate: '',
    showResult: false,
    downPayment: '0',
    loanAmount: '0',
    monthlyPayment: '0',
    totalInterest: '0'
  },

  onTotalPriceInput(e) {
    this.setData({ totalPrice: e.detail.value });
  },

  onDownPaymentChange(e) {
    this.setData({ downPaymentIndex: e.detail.value });
  },

  onLoanTermChange(e) {
    this.setData({ loanTermIndex: e.detail.value });
  },

  onInterestRateInput(e) {
    this.setData({ interestRate: e.detail.value });
  },

  calculateLoan() {
    const { totalPrice, downPaymentRatios, downPaymentIndex, loanTerms, loanTermIndex, interestRate } = this.data;
    
    if (!totalPrice || !interestRate) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    const totalAmount = parseFloat(totalPrice) * 10000;
    const downPaymentRatio = downPaymentRatios[downPaymentIndex] / 100;
    const downPayment = totalAmount * downPaymentRatio;
    const loanAmount = totalAmount - downPayment;
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const totalMonths = loanTerms[loanTermIndex] * 12;

    // 等额本息计算公式
    const monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) 
      / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = totalPayment - loanAmount;

    this.setData({
      showResult: true,
      downPayment: downPayment.toFixed(2),
      loanAmount: loanAmount.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    });
  }
}); 