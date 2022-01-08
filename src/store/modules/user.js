import { resetRouter } from '@/router/index'
import Cookies from 'js-cookie'

const userInfoString = localStorage.getItem('userInfo')
const userInfo = JSON.parse(userInfoString || '{}')
const state = {
  userId: userInfo.userId || '',
  userName: userInfo.userName || '',
  userNickName: userInfo.userNickName || '',
  roleId: userInfo.userId || '',
  roles: userInfo.roles || [],
  avatar: userInfo.avatar || '',
  token: userInfo.token || ''
}

const getters = {
  getAvatar(state) {
    return state.avatar || require('@/assets/img_avatar_example.gif')
  },
  getUserName(state) {
    return state.userName
  },
  getNickName(state) {
    return state.userNickName
  },
  getRoles(state) {
    return state.roles
  }
}

const actions = {
  saveUserInfo({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      try {
        commit('SAVE_USER_INFO', userInfo)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      try {
        dispatch('router/delAllRoute', null, { root: true })
        commit('LOGOUT')
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}

const mutations = {
  SAVE_USER_INFO(state, userInfo) {
    state.userId = userInfo.userId
    state.userName = userInfo.userName
    state.userNickName = userInfo.userNickName
    state.avatar = userInfo.avatar
    state.roleId = userInfo.roleId
    state.roles = userInfo.roles
    state.token = userInfo.token
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    Cookies.set('admin-token', userInfo.token, {
      expires: 1
    })
  },
  LOGOUT(state) {
    // 这里只是在本地模拟删除了用户信息，在真实场景下需要 调后台登出接口 来真正实现登出功能
    state.userId = ''
    state.userName = ''
    state.userNickName = ''
    state.roleId = ''
    state.roles = []
    state.avatar = ''
    state.token = ''
    resetRouter()
    Cookies.remove('admin-token')
    localStorage.removeItem('userInfo')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
