const { memories } = require('./memories')

const KEYS = {
  user: 'summer-user',
  posts: 'summer-user-posts',
  interactions: 'summer-interactions'
}

function read(key, fallback) {
  const value = wx.getStorageSync(key)
  return value === '' || value === undefined || value === null ? fallback : value
}

function getCurrentUser() {
  return read(KEYS.user, null)
}

function saveCurrentUser(user) {
  wx.setStorageSync(KEYS.user, user)
}

function clearCurrentUser() {
  wx.removeStorageSync(KEYS.user)
}

function getUserPosts() {
  return read(KEYS.posts, [])
}

function getAllMemories() {
  return [...getUserPosts(), ...memories]
}

function getMemoryById(id) {
  return getAllMemories().find(item => String(item.id) === String(id))
}

function saveUserPost(post) {
  const posts = getUserPosts()
  const index = posts.findIndex(item => String(item.id) === String(post.id))
  if (index >= 0) {
    posts[index] = post
  } else {
    posts.unshift(post)
  }
  wx.setStorageSync(KEYS.posts, posts)
  return post
}

function deleteUserPost(id) {
  const posts = getUserPosts().filter(item => String(item.id) !== String(id))
  wx.setStorageSync(KEYS.posts, posts)
  const interactions = read(KEYS.interactions, {})
  delete interactions[id]
  wx.setStorageSync(KEYS.interactions, interactions)
}

function getInteraction(id) {
  const interactions = read(KEYS.interactions, {})
  return interactions[id] || { liked: false, likes: 0, comments: [] }
}

function updateInteraction(id, interaction) {
  const interactions = read(KEYS.interactions, {})
  interactions[id] = interaction
  wx.setStorageSync(KEYS.interactions, interactions)
}

function toggleLike(id) {
  const interaction = getInteraction(id)
  const liked = !interaction.liked
  const next = {
    ...interaction,
    liked,
    likes: Math.max(0, (interaction.likes || 0) + (liked ? 1 : -1))
  }
  updateInteraction(id, next)
  return next
}

function addComment(id, comment) {
  const interaction = getInteraction(id)
  const next = {
    ...interaction,
    comments: [...(interaction.comments || []), comment]
  }
  updateInteraction(id, next)
  return next
}

function replyComment(id, commentId, reply) {
  const interaction = getInteraction(id)
  const comments = (interaction.comments || []).map(comment => {
    if (comment.id !== commentId) return comment
    return { ...comment, replies: [...(comment.replies || []), reply] }
  })
  const next = { ...interaction, comments }
  updateInteraction(id, next)
  return next
}

function createPostId() {
  return `user-${Date.now()}`
}

module.exports = {
  KEYS,
  getCurrentUser,
  saveCurrentUser,
  clearCurrentUser,
  getUserPosts,
  getAllMemories,
  getMemoryById,
  saveUserPost,
  deleteUserPost,
  getInteraction,
  toggleLike,
  addComment,
  replyComment,
  createPostId
}
