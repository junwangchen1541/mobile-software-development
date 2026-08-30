const { memories, categories } = require('../../data/memories')

Page({
  data: {
    categories,
    activeCategory: '全部',
    visibleMemories: memories
  },

  selectCategory(event) {
    const activeCategory = event.currentTarget.dataset.category
    this.setData({
      activeCategory,
      visibleMemories: activeCategory === '全部'
        ? memories
        : memories.filter(item => item.category === activeCategory)
    })
  },

  openDetail(event) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${event.currentTarget.dataset.id}`
    })
  }
})
