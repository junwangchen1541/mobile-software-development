const { categories } = require('../../data/memories')
const { getCurrentUser, getMemoryById, saveUserPost, createPostId } = require('../../data/store')

const COLORS = {
  娱乐: '#4b9fb5',
  学习: '#ee9d58',
  研究: '#315f89',
  生活: '#96775d'
}

Page({
  data: {
    editing: false,
    id: '',
    date: '',
    categoryIndex: 1,
    categories: categories.slice(1),
    title: '',
    summary: '',
    content: '',
    learning: '',
    feeling: '',
    imagePath: '',
    currentUser: null
  },

  onLoad(options) {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      wx.showToast({ title: '请先登录', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 500)
      return
    }

    if (options.id) {
      const memory = getMemoryById(options.id)
      if (!memory || memory.ownerId !== currentUser.id) {
        wx.showToast({ title: '只能编辑自己的记录', icon: 'none' })
        setTimeout(() => wx.navigateBack(), 500)
        return
      }
      const categoryIndex = Math.max(0, this.data.categories.indexOf(memory.category))
      this.setData({
        editing: true,
        id: memory.id,
        date: memory.fullDate || memory.date,
        categoryIndex,
        title: memory.title,
        summary: memory.summary,
        content: memory.content,
        learning: memory.learning,
        feeling: memory.feeling,
        imagePath: memory.imagePath || '',
        currentUser
      })
      wx.setNavigationBarTitle({ title: '编辑足迹' })
      return
    }

    this.setData({ currentUser, date: this.getToday() })
  },

  getToday() {
    const date = new Date()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `2026年${month}月${day}日`
  },

  getShortDate(fullDate) {
    const match = String(fullDate).match(/(\d{1,2})月(\d{1,2})日/)
    if (!match) return String(fullDate)
    return `${match[1].padStart(2, '0')}.${match[2].padStart(2, '0')}`
  },

  onInput(event) {
    this.setData({ [event.currentTarget.dataset.field]: event.detail.value })
  },

  onCategoryChange(event) {
    this.setData({ categoryIndex: Number(event.detail.value) })
  },

  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: result => {
        const file = result.tempFiles && result.tempFiles[0]
        if (!file) return
        wx.saveFile({
          tempFilePath: file.tempFilePath,
          success: saved => this.setData({ imagePath: saved.savedFilePath }),
          fail: () => this.setData({ imagePath: file.tempFilePath })
        })
      }
    })
  },

  removeImage() {
    this.setData({ imagePath: '' })
  },

  submit() {
    const fields = ['title', 'summary', 'content', 'learning', 'feeling']
    const missing = fields.find(field => !String(this.data[field] || '').trim())
    if (missing) {
      wx.showToast({ title: '请把记录内容填写完整', icon: 'none' })
      return
    }

    const category = this.data.categories[this.data.categoryIndex]
    const fullDate = this.data.date || this.getToday()
    const post = {
      id: this.data.editing ? this.data.id : createPostId(),
      date: this.getShortDate(fullDate),
      fullDate,
      category,
      icon: category.slice(0, 1),
      color: COLORS[category],
      title: this.data.title.trim(),
      summary: this.data.summary.trim(),
      content: this.data.content.trim(),
      learning: this.data.learning.trim(),
      feeling: this.data.feeling.trim(),
      ownerId: this.data.currentUser.id,
      author: this.data.currentUser.nickname,
      imagePath: this.data.imagePath || ''
    }

    saveUserPost(post)
    wx.showToast({ title: this.data.editing ? '已保存修改' : '已发布足迹', icon: 'none' })
    setTimeout(() => wx.navigateBack(), 500)
  }
})
