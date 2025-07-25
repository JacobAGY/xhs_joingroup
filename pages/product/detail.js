// detail.js
Page({
  data: {
    groupInfo: null,
    statusText: {
      testing: '测试中',
      success: '已达标',
      fail: '未达标'
    }
  },

  onLoad(options) {
    this.loadGroupInfo(options.groupId || 'PT20240601001');
  },

  // 加载销量测试拼团详情
  loadGroupInfo(groupId) {
    // 模拟API请求
    const groupInfo = {
      id: groupId,
      initiator: {
        avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
        nickname: '创业者小李',
        intro: '90后创业者，热爱创新'
      },
      projectTitle: '智能便携榨汁杯销量测试',
      projectDesc: '一款便携、易清洗、动力强劲的智能榨汁杯，适合上班族和健身人群。',
      images: ['/pages/images/榨汁杯图片.png'],
      targetCount: 100,
      currentCount: 56,
      endTime: '还剩2天3小时',
      status: 'testing', // testing, success, fail
      progress: 56,
      participants: [
        { id: 1, avatar: 'https://randomuser.me/api/portraits/women/1.jpg', nickname: '小美' },
        { id: 2, avatar: 'https://randomuser.me/api/portraits/men/2.jpg', nickname: '阿强' },
        { id: 3, avatar: 'https://randomuser.me/api/portraits/women/3.jpg', nickname: '小芳' },
        { id: 4, avatar: 'https://randomuser.me/api/portraits/men/4.jpg', nickname: '大壮' },
        { id: 5, avatar: 'https://randomuser.me/api/portraits/women/5.jpg', nickname: '小雪' },
        { id: 6, avatar: 'https://randomuser.me/api/portraits/men/6.jpg', nickname: '小明' },
        { id: 7, avatar: 'https://randomuser.me/api/portraits/women/7.jpg', nickname: '小红' }
      ]
    };
    this.setData({ groupInfo });
  },

  // 参与拼单
  onJoinGroup() {
    const { groupInfo } = this.data;
    wx.showModal({
      title: '确认参与销量测试拼单',
      content: `目标单量：${groupInfo.targetCount}，当前已参与：${groupInfo.currentCount}\n是否确认参与？`,
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '提交中...' });
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({ title: '参与成功', icon: 'success' });
            // 更新参与人数和进度
            this.setData({
              'groupInfo.currentCount': groupInfo.currentCount + 1,
              'groupInfo.progress': Math.min(100, ((groupInfo.currentCount + 1) / groupInfo.targetCount) * 100),
              'groupInfo.participants': groupInfo.participants.concat({
                id: Date.now(),
                avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
                nickname: '我'
              })
            });
          }, 1000);
        }
      }
    });
  }
}); 