const common = require('../../utils/common.js')
Page({
  data: {
    swiperImg: [
      { src: '../../images/newsimage1.jpg' },
      { src: '../../images/newsimage2.jpg' },
      { src: '../../images/newsimage3.jpg' }
    ],
    newsList: []
  },
  onLoad() {
    this.setData({ newsList: common.getNewsList() })
  },
  goToDetail(e) {
    wx.navigateTo({ url: '../detail/detail?id=' + e.currentTarget.dataset.id })
  }
})
