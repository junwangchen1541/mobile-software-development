const { getCurrentUser, saveCurrentUser, clearCurrentUser, getUserPosts } = require('../../data/store')

Page({
  data: {
    user: null,
    posts: []
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const user = getCurrentUser()
    this.setData({
      user,
      posts: user ? getUserPosts() : []
    })
  },

  login() {
    const completeLogin = result => {
      const info = result && result.userInfo ? result.userInfo : {}
      const user = {
        id: 'local-demo-user',
        nickname: info.nickName || '夏日记录者',
        avatarUrl: info.avatarUrl || ''
      }
      saveCurrentUser(user)
      this.refresh()
      wx.showToast({ title: info.nickName ? '登录成功' : '已使用演示身份登录', icon: 'none' })
    }

    if (typeof wx.getUserProfile !== 'function') {
      completeLogin({})
      return
    }

    wx.getUserProfile({
      desc: '用于展示发布者昵称和个人主页',
      success: completeLogin,
      fail: () => completeLogin({})
    })
  },

  logout() {
    clearCurrentUser()
    this.refresh()
    wx.showToast({ title: '已退出登录', icon: 'none' })
  },

  createPost() {
    if (!this.data.user) {
      wx.showToast({ title: '请先登录', icon: 'none' })
      return
    }
    wx.navigateTo({ url: '/pages/editor/editor' })
  },

  editPost(event) {
    wx.navigateTo({
      url: `/pages/editor/editor?id=${event.currentTarget.dataset.id}`
    })
  },

  openTimeline() {
    wx.switchTab({ url: '/pages/timeline/timeline' })
  }
})
