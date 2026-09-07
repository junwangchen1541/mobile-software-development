const { categories } = require('../../data/memories')
const { getAllMemories, getCurrentUser } = require('../../data/store')

Page({
  data: {
    categories,
    activeCategory: '全部',
    visibleMemories: []
  },

  onShow() {
    this.refreshList()
  },

  refreshList() {
    const memories = getAllMemories()
    this.setData({
      visibleMemories: this.data.activeCategory === '全部'
        ? memories
        : memories.filter(item => item.category === this.data.activeCategory)
    })
  },

  selectCategory(event) {
    const activeCategory = event.currentTarget.dataset.category
    this.setData({ activeCategory }, () => this.refreshList())
  },

  openDetail(event) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${event.currentTarget.dataset.id}`
    })
  },

  openEditor() {
    wx.navigateTo({
      url: getCurrentUser() ? '/pages/editor/editor' : '/pages/profile/profile'
    })
  }
})
