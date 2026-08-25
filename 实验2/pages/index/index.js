Page({
  data: {
    expanded: false,
    activeSkill: '深度学习',
    skills: [
      {
        name: '深度学习',
        detail: '使用 Python、PyTorch 和 NumPy 进行模型实验，关注算法从想法到结果的完整过程。'
      },
      {
        name: '遥感与视觉',
        detail: '关注计算机视觉、遥感影像理解、高光谱影像分类与北极海冰预测。'
      },
      {
        name: '算法与竞赛',
        detail: '通过算法与工程竞赛训练建模、编程和协作能力，把问题拆成可验证的步骤。'
      }
    ],
    highlights: [
      { value: '2024', label: '中国海洋大学软件工程' },
      { value: '08', label: '公开项目' },
      { value: 'ACM', label: '社团主席' }
    ]
  },

  toggleIntro() {
    this.setData({ expanded: !this.data.expanded })
  },

  selectSkill(event) {
    this.setData({ activeSkill: event.currentTarget.dataset.skill })
  },

  copyContact() {
    wx.setClipboardData({
      data: '刘翼晨｜中国海洋大学软件工程｜深度学习与遥感视觉',
      success: () => {
        wx.showToast({ title: '简介已复制', icon: 'success' })
      }
    })
  },

  copyGithub() {
    wx.setClipboardData({
      data: 'https://github.com/junwangchen1541',
      success: () => {
        wx.showToast({ title: 'GitHub 地址已复制', icon: 'success' })
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '刘翼晨的个人名片',
      path: '/pages/index/index'
    }
  }
})
