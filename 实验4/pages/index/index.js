Page({
  data: {
    levels: [
      { image: 'level01.png', name: '第 1 关' },
      { image: 'level02.png', name: '第 2 关' },
      { image: 'level03.png', name: '第 3 关' },
      { image: 'level04.png', name: '第 4 关' }
    ]
  },

  chooseLevel(event) {
    const level = event.currentTarget.dataset.level
    wx.navigateTo({
      url: `../game/game?level=${level}`
    })
  }
})
