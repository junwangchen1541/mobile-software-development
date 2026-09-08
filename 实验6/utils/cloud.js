const demoPhotos = require('../data/demo').photos
const USER_KEY = 'lab6-user'
const LOCAL_KEY = 'lab6-photos'

function hasCloud() { return !!(wx.cloud && getApp().globalData.cloudReady) }
function getUser() { return wx.getStorageSync(USER_KEY) || null }
function saveUser(user) { wx.setStorageSync(USER_KEY, user) }
function localPhotos() { return wx.getStorageSync(LOCAL_KEY) || [] }
function allPhotos() { return [...localPhotos(), ...demoPhotos] }
function collection() { return wx.cloud.database().collection('photos') }
function findPhoto(id) { return allPhotos().find(item => String(item._id || item.id) === String(id)) }

module.exports = { hasCloud, getUser, saveUser, localPhotos, allPhotos, collection, findPhoto, LOCAL_KEY }
