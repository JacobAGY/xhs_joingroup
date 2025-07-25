// index.js
Page({
  data: {
    searchKeyword: '',
    currentCategory: 'all',
    currentStatus: 'all',
    productList: [],
    page: 1,
    pageSize: 10,
    loading: false,
    noMore: false,
    refreshing: false,
    // 模拟销量测试拼团数据
    mockProducts: [
      {
        groupId: 'PT20240601001',
        initiator: {
          avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
          nickname: '创业者小李',
          intro: '90后创业者，热爱创新'
        },
        projectTitle: '智能便携榨汁杯销量测试',
        projectDesc: '便携、易清洗、动力强劲，适合上班族和健身人群。',
        images: ['/pages/images/榨汁杯图片.png'],
        targetCount: 100,
        currentCount: 56,
        endTime: '还剩2天3小时',
        status: 'testing', // testing, success, fail
        progress: 56
      },
      {
        groupId: 'PT20240601002',
        initiator: {
          avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
          nickname: '创客小王',
          intro: '专注生活好物孵化'
        },
        projectTitle: '多功能折叠桌销量测试',
        projectDesc: '小户型神器，办公/用餐/收纳一桌多用。',
        images: ['/pages/images/多功能折叠椅.png'],
        targetCount: 50,
        currentCount: 50,
        endTime: '已结束',
        status: 'success',
        progress: 100
      },
      {
        groupId: 'PT20240601003',
        initiator: {
          avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
          nickname: '新锐设计师',
          intro: '极简风格家居设计'
        },
        projectTitle: '极简风格台灯销量测试',
        projectDesc: '北欧极简，三档调光，适合卧室/书房。',
        images: ['/pages/images/极简风格台灯.png'],
        targetCount: 80,
        currentCount: 30,
        endTime: '已结束',
        status: 'fail',
        progress: 37.5
      }
    ]
  },

  onLoad() {
    this.loadProducts();
  },

  // 加载商品数据
  loadProducts(isRefresh = false) {
    if (this.data.loading) return;
    this.setData({ loading: true });
    setTimeout(() => {
      let filteredProducts = this.filterProducts();
      if (isRefresh) {
        this.setData({
          productList: filteredProducts.slice(0, this.data.pageSize),
          page: 1,
          noMore: filteredProducts.length <= this.data.pageSize,
          loading: false,
          refreshing: false
        });
      } else {
        const startIndex = (this.data.page - 1) * this.data.pageSize;
        const endIndex = startIndex + this.data.pageSize;
        const newProducts = filteredProducts.slice(startIndex, endIndex);
        this.setData({
          productList: [...this.data.productList, ...newProducts],
          page: this.data.page + 1,
          noMore: endIndex >= filteredProducts.length,
          loading: false
        });
      }
    }, 500);
  },

  // 筛选商品
  filterProducts() {
    let products = [...this.data.mockProducts];
    // 按搜索关键词筛选
    if (this.data.searchKeyword) {
      products = products.filter(item =>
        item.projectTitle.toLowerCase().includes(this.data.searchKeyword.toLowerCase()) ||
        item.projectDesc.toLowerCase().includes(this.data.searchKeyword.toLowerCase())
      );
    }
    // 按状态筛选
    if (this.data.currentStatus !== 'all') {
      products = products.filter(item => item.status === this.data.currentStatus);
    }
    return products;
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value });
  },
  onSearchConfirm(e) {
    this.setData({ searchKeyword: e.detail.value });
    this.refreshData();
  },
  onCategoryFilter(e) {
    // 分类筛选可按需扩展
  },
  onStatusFilter(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({ currentStatus: status });
    this.refreshData();
  },
  refreshData() {
    this.setData({ productList: [], page: 1, noMore: false, refreshing: true });
    this.loadProducts(true);
  },
  onRefresh() {
    this.refreshData();
  },
  onLoadMore() {
    if (!this.data.loading && !this.data.noMore) {
      this.loadProducts();
    }
  },
  // 点击卡片跳转详情
  onProductClick(e) {
    const item = e.currentTarget.dataset.product;
    wx.navigateTo({ url: `/pages/product/detail?groupId=${item.groupId}` });
  }
});