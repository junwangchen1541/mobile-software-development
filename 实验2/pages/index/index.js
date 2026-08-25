Page({
  data: {
    isFavorite: false,
    expanded: false,
    activeSkill: '小程序开发',
    skills: [
      {
        name: '小程序开发',
        detail: '使用 WXML、WXSS 和 JavaScript 构建轻量、清晰的移动端体验。'
      },
      {
        name: '界面设计',
        detail: '关注信息层级、阅读节奏和真实使用场景，让页面更容易理解。'
      },
      {
        name: '持续学习',
        detail: '把课程练习拆成可运行的小成果，在实践中积累解决问题的方法。'
      }
    ]
  },

  onLoad() {
    this.setData({
      isFavorite: wx.getStorageSync('lab2-card-favorite') === true
    })
  },

  toggleIntro() {
    this.setData({ expanded: !this.data.expanded })
  },

  selectSkill(event) {
    this.setData({ activeSkill: event.currentTarget.dataset.skill })
  },

  toggleFavorite() {
    const isFavorite = !this.data.isFavorite
    this.setData({ isFavorite })
    wx.setStorageSync('lab2-card-favorite', isFavorite)
    wx.showToast({
      title: isFavorite ? '已收藏名片' : '已取消收藏',
      icon: 'none'
    })
  },

  copyContact() {
    wx.setClipboardData({
      data: '刘翼晨｜移动软件开发学习者',
      success: () => {
        wx.showToast({ title: '简介已复制', icon: 'success' })
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '刘翼晨的个人名片',
      path: '/pages/index/index'
    }
  }
})
