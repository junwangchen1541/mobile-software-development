const common = require('../../utils/common.js')
Page({
  data: { article: {}, isAdd: false },
  onLoad(options) {
    const id = options.id
    const stored = wx.getStorageSync(id)
    if (stored) {
      this.setData({ article: stored, isAdd: true })
      return
    }
    const result = common.getNewsDetail(id)
    if (result.code === '200') this.setData({ article: result.news, isAdd: false })
  },
  addFavorites() {
    wx.setStorageSync(this.data.article.id, this.data.article)
    this.setData({ isAdd: true })
    wx.showToast({ title: '收藏成功', icon: 'success' })
  },
  cancelFavorites() {
    wx.removeStorageSync(this.data.article.id)
    this.setData({ isAdd: false })
    wx.showToast({ title: '已取消收藏', icon: 'none' })
  }
})
