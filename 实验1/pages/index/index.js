Page({
  data: {
    message: '欢迎来到我的第一个微信小程序',
    greeted: false
  },

  sayHello() {
    this.setData({
      message: '很高兴见到你！',
      greeted: true
    })
  }
})
