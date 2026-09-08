const cloud = require('../../utils/cloud')
Page({
  data: { photos: [], user: null },
  onShow() { this.loadUser(); this.loadPhotos() },
  loadUser() { this.setData({ user: cloud.getUser() }) },
  loadPhotos() {
    if (cloud.hasCloud()) {
      cloud.collection().orderBy('addDate', 'desc').get({ success: res => this.setData({ photos: this.normalize(res.data) }), fail: () => this.setData({ photos: this.normalize(cloud.allPhotos()) }) })
    } else this.setData({ photos: this.normalize(cloud.allPhotos()) })
  },
  normalize(list) { return list.map(item => ({ ...item, key: item._id || item.id })) },
  getUserInfo(event) { const user = event.detail.userInfo; if (user) { getApp().ensureUser(user); this.setData({ user }) } },
  goAdd() { wx.navigateTo({ url: '/pages/add/add' }) }
})
