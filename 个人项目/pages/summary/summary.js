const { categories } = require('../../data/memories')
const { getAllMemories } = require('../../data/store')

Page({
  data: {
    total: 0,
    stats: [],
    userPosts: 0,
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
        text: '阅读、交流和适度休息并不与成长冲突，它们让生活保持弹性和温度。'
      }
    ]
  },

  onShow() {
    const allMemories = getAllMemories()
    const userPosts = allMemories.filter(item => item.ownerId).length
    this.setData({
      total: allMemories.length,
      stats: categories.slice(1).map(name => ({
        name,
        count: allMemories.filter(item => item.category === name).length
      })),
      userPosts
    })
  },

  openTimeline() {
    wx.switchTab({ url: '/pages/timeline/timeline' })
  }
})
