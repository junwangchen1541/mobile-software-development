const { getAllMemories } = require('../../data/store')

Page({
  data: {
    featured: [],
    stats: [
      { value: 0, label: '段暑假记录' },
      { value: 4, label: '种生活侧面' },
      { value: 3, label: '项主要收获' }
    ]
  },

  onShow() {
    const allMemories = getAllMemories()
    this.setData({
      featured: allMemories.slice(0, 3),
      'stats[0].value': allMemories.length
    })
  },

  openTimeline() {
    wx.switchTab({ url: '/pages/timeline/timeline' })
  },

  openSummary() {
    wx.switchTab({ url: '/pages/summary/summary' })
  },

  openProfile() {
    wx.navigateTo({ url: '/pages/profile/profile' })
  },

  openDetail(event) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${event.currentTarget.dataset.id}`
    })
  }
})
