const memories = [
  {
    id: 1,
    author: '社区示例用户',
    date: '07.10',
    fullDate: '2026年7月10日',
    category: '娱乐',
    icon: '海',
    color: '#4b9fb5',
    title: '给假期留一点放松时间',
    summary: '在学习和研究之外，给自己留出恢复精力的时间。',
    content: '暑假并没有把每天排得很满。我会在完成当天任务后主动停下来，整理房间、听音乐或看看电影，让注意力从高强度任务中退出。',
    learning: '稳定的节奏需要学习和休息共同维持，适当留白反而能让后续投入更专注。',
    feeling: '放松不是对计划的偏离，而是让长期目标能够持续推进的一部分。'
  },
  {
    id: 2,
    author: '社区示例用户',
    date: '07.18',
    fullDate: '2026年7月18日',
    category: '学习',
    icon: '算',
    color: '#ee9d58',
    title: '保持算法训练的手感',
    summary: '整理比赛中遇到的题目，补齐图论和动态规划的薄弱点。',
    content: '每天选择少量题目训练，并把错误原因写进笔记。相比追求题量，我更重视能否说清楚建模思路和复杂度。',
    learning: '稳定的小步练习比临时突击更有效，复盘错误比只看正确答案更有价值。',
    feeling: '难题仍然会让人挫败，但把大问题拆成状态、转移和边界以后，焦虑会逐渐变成可行动的步骤。'
  },
  {
    id: 3,
    author: '社区示例用户',
    date: '07.27',
    fullDate: '2026年7月27日',
    category: '学习',
    icon: '程',
    color: '#2c8c7f',
    title: '完成第一个微信小程序',
    summary: '从 Hello World 开始，理解 WXML、WXSS 和事件绑定。',
    content: '手动建立小程序文件结构，完成页面布局和按钮交互，并把实验过程整理成 Markdown 报告。',
    learning: 'WXML 负责结构，WXSS 负责样式，JavaScript 管理数据和事件，setData 让数据变化反映到页面。',
    feeling: '一个能在手机上真实运行的小成果，比单纯阅读教程更能建立信心。'
  },
  {
    id: 4,
    author: '社区示例用户',
    date: '08.05',
    fullDate: '2026年8月5日',
    category: '研究',
    icon: '遥',
    color: '#315f89',
    title: '继续整理遥感与海冰研究',
    summary: '阅读论文、检查实验数据，思考时空预测任务的建模方式。',
    content: '围绕高光谱影像分类和北极海冰预测整理资料，记录不同模型的输入、输出和实验假设。',
    learning: '科研不仅是训练模型，还需要明确问题、数据条件、评价指标和可复现的实验过程。',
    feeling: '面对复杂方向时，先建立问题地图，再逐步深入，比一开始追逐最新模型更踏实。'
  },
  {
    id: 5,
    author: '社区示例用户',
    date: '08.14',
    fullDate: '2026年8月14日',
    category: '生活',
    icon: '读',
    color: '#96775d',
    title: '给阅读留一段安静时间',
    summary: '减少碎片化信息，在晚上完整读完一章并做摘录。',
    content: '把通知暂时关闭，用纸笔记录有触动的句子。阅读速度不快，但注意力比平时更完整。',
    learning: '输入内容的质量会影响思考的质量，安静阅读能帮助我重新组织零散的想法。',
    feeling: '暑假不必把每一天都安排得很满，留白本身也是生活的一部分。'
  },
  {
    id: 6,
    author: '社区示例用户',
    date: '08.22',
    fullDate: '2026年8月22日',
    category: '娱乐',
    icon: '友',
    color: '#d47771',
    title: '和朋友见面聊天',
    summary: '分享最近的学习、比赛和生活，也听听彼此的新计划。',
    content: '没有刻意设计流程，只是在吃饭和散步时聊近况。不同人的选择让我重新审视自己的节奏。',
    learning: '交流能带来书本之外的视角，认真倾听也是一种重要能力。',
    feeling: '关系需要真实的时间去维护。那些看似普通的见面，往往会成为暑假里最温暖的记忆。'
  }
]

const categories = ['全部', '娱乐', '学习', '研究', '生活']

function getMemory(id) {
  return memories.find(item => item.id === Number(id))
}

function getStats() {
  return categories.slice(1).map(name => ({
    name,
    count: memories.filter(item => item.category === name).length
  }))
}

module.exports = {
  memories,
  categories,
  getMemory,
  getStats
}
