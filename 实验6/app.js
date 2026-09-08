const { getUser, saveUser } = require('./utils/cloud')

App({
  globalData: { userInfo: null, openid: null, cloudReady: false },
  onLaunch() {
    if (wx.cloud) {
      try {
        wx.cloud.init({ env: wx.cloud.DYNAMIC_CURRENT_ENV, traceUser: true })
        this.globalData.cloudReady = true
      } catch (error) {
        console.warn('云能力初始化失败，将使用本地演示模式', error)
      }
    }
  },
  ensureUser(userInfo) {
    const user = userInfo || { nickName: '夏日访客', avatarUrl: '/images/avatar-default.png', province: '山东', country: '中国' }
    this.globalData.userInfo = user
    saveUser(user)
    return getUser()
  }
})
