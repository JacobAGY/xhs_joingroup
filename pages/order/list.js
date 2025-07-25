// list.js
Page({
  data: {
    currentStatus: 'all',
    orderList: [],
    allOrders: [],
    groupStatusText: {
      pending: '待成团',
      success: '已成团',
      fail: '已失败'
    }
  },

  onLoad() {
    this.checkLogin();
    this.loadOrders();
  },

  // 检查登录状态
  checkLogin() {
    // 注释掉登录校验，方便测试
    // const userInfo = wx.getStorageSync('userInfo');
    // if (!userInfo) {
    //   wx.redirectTo({ url: '/pages/login/index' });
    // }
  },

  // 加载订单数据（模拟）
  loadOrders() {
    // 模拟订单数据
    const orders = [
      {
        id: 1,
        isGroup: true,
        groupId: 'PT20240601001',
        groupStatus: 'pending',
        price: 79.9,
        createTime: '2024-06-01 10:00',
        product: {
          title: '时尚连衣裙 春季新款',
          image: 'https://via.placeholder.com/300x400/ff2442/ffffff?text=商品1'
        },
        members: [
          { id: 1, avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
          { id: 2, avatar: 'https://randomuser.me/api/portraits/men/2.jpg' }
        ]
      },
      {
        id: 2,
        isGroup: true,
        groupId: 'PT20240601002',
        groupStatus: 'success',
        price: 79.9,
        createTime: '2024-05-28 14:30',
        product: {
          title: '无线蓝牙耳机 降噪音乐耳机',
          image: 'https://via.placeholder.com/300x400/4CAF50/ffffff?text=商品2'
        },
        members: [
          { id: 1, avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
          { id: 2, avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
          { id: 3, avatar: 'https://randomuser.me/api/portraits/women/3.jpg' }
        ]
      },
      {
        id: 3,
        isGroup: true,
        groupId: 'PT20240601003',
        groupStatus: 'fail',
        price: 79.9,
        createTime: '2024-05-20 09:20',
        product: {
          title: '儿童益智玩具 积木拼装',
          image: 'https://via.placeholder.com/300x400/E91E63/ffffff?text=商品6'
        },
        members: [
          { id: 1, avatar: 'https://randomuser.me/api/portraits/men/4.jpg' }
        ]
      },
      {
        id: 4,
        isGroup: false,
        price: 128,
        createTime: '2024-06-02 11:15',
        product: {
          title: '厨房刀具套装 不锈钢',
          image: 'https://via.placeholder.com/300x400/9C27B0/ffffff?text=商品5'
        }
      }
    ];
    this.setData({
      allOrders: orders
    });
    this.filterOrders();
  },

  // 按状态筛选订单
  onStatusFilter(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({ currentStatus: status }, this.filterOrders);
  },
  filterOrders() {
    const { currentStatus, allOrders } = this.data;
    let filtered = allOrders;
    if (currentStatus === 'pending') {
      filtered = allOrders.filter(o => o.isGroup && o.groupStatus === 'pending');
    } else if (currentStatus === 'success') {
      filtered = allOrders.filter(o => o.isGroup && o.groupStatus === 'success');
    } else if (currentStatus === 'fail') {
      filtered = allOrders.filter(o => o.isGroup && o.groupStatus === 'fail');
    } else if (currentStatus === 'normal') {
      filtered = allOrders.filter(o => !o.isGroup);
    }
    this.setData({ orderList: filtered });
  },

  // 查看拼团详情
  onViewGroupDetail(e) {
    const groupId = e.currentTarget.dataset.groupid;
    wx.navigateTo({ url: `/pages/product/detail?groupId=${groupId}` });
  }
}); 