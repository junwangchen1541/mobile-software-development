const data = require('../../utils/data.js')

const BOARD_SIZE = 8
const TILE_SIZE = 40
const TILE_IMAGES = {
  floor: '/images/icons/ice.png',
  wall: '/images/icons/stone.png',
  target: '/images/icons/pig.png',
  box: '/images/icons/box.png',
  player: '/images/icons/bird.png'
}

let map = []
let boxes = []
let player = { row: 0, col: 0 }

Page({
  data: {
    level: 1,
    steps: 0
  },

  onLoad(options) {
    const rawLevel = Number(options.level)
    const levelIndex = Number.isInteger(rawLevel) && rawLevel >= 0 && rawLevel < data.maps.length
      ? rawLevel
      : 0

    this.levelIndex = levelIndex
    this.setData({ level: levelIndex + 1 })
    this.ctx = wx.createCanvasContext('gameCanvas', this)
    this.initMap(levelIndex)
    this.drawCanvas()
  },

  initMap(levelIndex) {
    const source = data.maps[levelIndex]
    map = source.map(row => row.slice())
    boxes = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(false))

    for (let row = 0; row < BOARD_SIZE; row += 1) {
      for (let col = 0; col < BOARD_SIZE; col += 1) {
        if (map[row][col] === 4) {
          boxes[row][col] = true
          map[row][col] = 2
        } else if (map[row][col] === 5) {
          player = { row, col }
          map[row][col] = 2
        }
      }
    }

    this.setData({ steps: 0 })
  },

  drawCanvas() {
    const ctx = this.ctx
    ctx.clearRect(0, 0, 320, 320)

    for (let row = 0; row < BOARD_SIZE; row += 1) {
      for (let col = 0; col < BOARD_SIZE; col += 1) {
        let image = TILE_IMAGES.floor
        if (map[row][col] === 1) {
          image = TILE_IMAGES.wall
        } else if (map[row][col] === 3) {
          image = TILE_IMAGES.target
        }

        ctx.drawImage(image, col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE)

        if (boxes[row][col]) {
          ctx.drawImage(TILE_IMAGES.box, col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
        }
      }
    }

    ctx.drawImage(
      TILE_IMAGES.player,
      player.col * TILE_SIZE,
      player.row * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE
    )
    ctx.draw()
  },

  isInside(row, col) {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE
  },

  move(deltaRow, deltaCol) {
    const nextRow = player.row + deltaRow
    const nextCol = player.col + deltaCol

    if (!this.isInside(nextRow, nextCol) || map[nextRow][nextCol] === 1) {
      return
    }

    if (boxes[nextRow][nextCol]) {
      const boxRow = nextRow + deltaRow
      const boxCol = nextCol + deltaCol
      const boxBlocked = !this.isInside(boxRow, boxCol) ||
        map[boxRow][boxCol] === 1 ||
        boxes[boxRow][boxCol]

      if (boxBlocked) {
        return
      }

      boxes[nextRow][nextCol] = false
      boxes[boxRow][boxCol] = true
    }

    player = { row: nextRow, col: nextCol }
    this.setData({ steps: this.data.steps + 1 })
    this.drawCanvas()
    this.checkWin()
  },

  up() {
    this.move(-1, 0)
  },

  down() {
    this.move(1, 0)
  },

  left() {
    this.move(0, -1)
  },

  right() {
    this.move(0, 1)
  },

  isWin() {
    for (let row = 0; row < BOARD_SIZE; row += 1) {
      for (let col = 0; col < BOARD_SIZE; col += 1) {
        if (boxes[row][col] && map[row][col] !== 3) {
          return false
        }
      }
    }
    return true
  },

  checkWin() {
    if (!this.isWin()) {
      return
    }

    wx.showModal({
      title: '恭喜',
      content: `第 ${this.data.level} 关挑战成功，共移动 ${this.data.steps} 步！`,
      showCancel: false
    })
  },

  restartGame() {
    this.initMap(this.levelIndex)
    this.drawCanvas()
    wx.showToast({
      title: '已重新开始',
      icon: 'none',
      duration: 1000
    })
  }
})
