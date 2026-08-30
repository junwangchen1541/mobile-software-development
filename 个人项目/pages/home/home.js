const { memories } = require('../../data/memories')

Page({
  data: {
    featured: memories.slice(0, 3),
    stats: [
      { value: memories.length, label: '段暑假记录' },
      { value: 4, label: '种生活侧面' },
      { value: 3, label: '项主要收获' }
    ]
  },

  openTimeline() {
    wx.switchTab({ url: '/pages/timeline/timeline' })
  },

  openSummary() {
    wx.switchTab({ url: '/pages/summary/summary' })
  },

  openDetail(event) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${event.currentTarget.dataset.id}`
    })
  }
})
