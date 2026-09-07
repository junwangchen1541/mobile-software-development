const { getMemoryById, getCurrentUser, getInteraction, toggleLike, addComment, replyComment, deleteUserPost } = require('../../data/store')

Page({
  data: {
    memory: null,
    interaction: { liked: false, likes: 0, comments: [] },
    commentText: '',
    replyText: '',
    replyIndex: -1,
    currentUser: null,
    isOwner: false
  },

  onLoad(options) {
    const memory = getMemoryById(options.id)
    if (!memory) {
      wx.showToast({ title: '记录不存在', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 800)
      return
    }

    this.setData({
      memory,
      interaction: getInteraction(memory.id),
      currentUser: getCurrentUser(),
      isOwner: Boolean(getCurrentUser() && memory.ownerId === getCurrentUser().id)
    })
  },

  onShow() {
    if (!this.data.memory) return
    const currentUser = getCurrentUser()
    const memory = getMemoryById(this.data.memory.id)
    this.setData({
      memory: memory || this.data.memory,
      interaction: getInteraction(this.data.memory.id),
      currentUser,
      isOwner: Boolean(currentUser && memory && memory.ownerId === currentUser.id)
    })
  },

  toggleLike() {
    if (!getCurrentUser()) {
      wx.showToast({ title: '登录后才能点赞', icon: 'none' })
      return
    }
    const interaction = toggleLike(this.data.memory.id)
    this.setData({ interaction })
  },

  onCommentInput(event) {
    this.setData({ commentText: event.detail.value })
  },

  submitComment() {
    if (!getCurrentUser()) {
      wx.showToast({ title: '登录后才能评论', icon: 'none' })
      return
    }
    const text = (this.data.commentText || '').trim()
    if (!text) {
      wx.showToast({ title: '先写下评论内容', icon: 'none' })
      return
    }
    const user = getCurrentUser() || { nickname: '游客用户' }
    const interaction = addComment(this.data.memory.id, {
      id: `comment-${Date.now()}`,
      author: user.nickname,
      text,
      replies: []
    })
    this.setData({ interaction, commentText: '' })
    wx.showToast({ title: '评论已发布', icon: 'none' })
  },

  showReply(event) {
    this.setData({ replyIndex: Number(event.currentTarget.dataset.index), replyText: '' })
  },

  onReplyInput(event) {
    this.setData({ replyText: event.detail.value })
  },

  submitReply(event) {
    if (!getCurrentUser()) {
      wx.showToast({ title: '登录后才能回复', icon: 'none' })
      return
    }
    const text = (this.data.replyText || '').trim()
    if (!text) {
      wx.showToast({ title: '先写下回复内容', icon: 'none' })
      return
    }
    const index = Number(event.currentTarget.dataset.index)
    const comment = this.data.interaction.comments[index]
    const user = getCurrentUser() || { nickname: '游客用户' }
    const interaction = replyComment(this.data.memory.id, comment.id, {
      id: `reply-${Date.now()}`,
      author: user.nickname,
      text
    })
    this.setData({ interaction, replyIndex: -1, replyText: '' })
  },

  editMemory() {
    wx.navigateTo({ url: `/pages/editor/editor?id=${this.data.memory.id}` })
  },

  deleteMemory() {
    wx.showModal({
      title: '删除这条记录？',
      content: '删除后只能重新发布，互动数据也会一并清除。',
      success: result => {
        if (!result.confirm) return
        deleteUserPost(this.data.memory.id)
        wx.showToast({ title: '已删除', icon: 'none' })
        setTimeout(() => wx.navigateBack(), 500)
      }
    })
  },

  onShareAppMessage() {
    return {
      title: this.data.memory ? this.data.memory.title : '我的暑假生活',
      path: this.data.memory ? `/pages/detail/detail?id=${this.data.memory.id}` : '/pages/home/home'
    }
  }
})
