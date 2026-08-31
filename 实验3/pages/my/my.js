Page({
  data: { isLogin: false, src: '', nickName: '', newsList: [], number: 0 },
  getUserInfo() {
    wx.getUserProfile({
      desc: '用于展示个人中心信息',
      success: res => {
        const info = res.userInfo
        this.setData({ isLogin: true, src: info.avatarUrl, nickName: info.nickName })
        this.getMyFavorites()
      }
    })
  },
  getMyFavorites() {
    const keys = wx.getStorageInfoSync().keys
    const list = keys.map(key => wx.getStorageSync(key)).filter(item => item && item.id)
    this.setData({ newsList: list, number: list.length })
  },
  onShow() {
    if (this.data.isLogin) this.getMyFavorites()
  },
  goToDetail(e) {
    wx.navigateTo({ url: '../detail/detail?id=' + e.currentTarget.dataset.id })
  }
})
