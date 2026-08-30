const { memories, getStats } = require('../../data/memories')

Page({
  data: {
    total: memories.length,
    stats: getStats(),
    favorites: 0,
    lessons: [
      {
        number: '01',
        title: '把时间交给真正重要的事',
        text: '计划不需要排满每一天。明确当天最重要的一件事，反而更容易持续完成。'
      },
      {
        number: '02',
        title: '用小成果建立确定感',
        text: '完成一道题、一个实验或一个能运行的页面，都会让模糊的目标变得具体。'
      },
      {
        number: '03',
        title: '休息、交流与学习同样重要',
        text: '海边散步、阅读和见朋友并不与成长冲突，它们让生活保持弹性和温度。'
      }
    ]
  },

  onShow() {
    const favorites = wx.getStorageSync('summer-favorites') || []
    this.setData({ favorites: favorites.length })
  },

  openTimeline() {
    wx.switchTab({ url: '/pages/timeline/timeline' })
  }
})
