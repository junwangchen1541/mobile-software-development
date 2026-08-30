const { getMemory } = require('../../data/memories')

Page({
  data: {
    memory: null,
    isFavorite: false
  },

  onLoad(options) {
    const memory = getMemory(options.id)
    if (!memory) {
      wx.showToast({ title: '记录不存在', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 800)
      return
    }

    const favorites = wx.getStorageSync('summer-favorites') || []
    this.setData({
      memory,
      isFavorite: favorites.includes(memory.id)
    })
  },

  toggleFavorite() {
    const id = this.data.memory.id
    let favorites = wx.getStorageSync('summer-favorites') || []
    const isFavorite = !this.data.isFavorite

    favorites = isFavorite
      ? [...new Set([...favorites, id])]
      : favorites.filter(item => item !== id)

    wx.setStorageSync('summer-favorites', favorites)
    this.setData({ isFavorite })
    wx.showToast({
      title: isFavorite ? '已记住这一刻' : '已取消收藏',
      icon: 'none'
    })
  },

  onShareAppMessage() {
    return {
      title: this.data.memory ? this.data.memory.title : '我的暑假生活',
      path: `/pages/detail/detail?id=${this.data.memory.id}`
    }
  }
})
