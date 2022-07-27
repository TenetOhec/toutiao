import Vue from 'vue'
import Vuex from 'vuex'
import {setItem,getItem} from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
        // 用户的登录状态信息
        user: getItem('TOUTIAO_USER')
        // user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
        // user: null
  },
  getters: {
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      //为了防止数据丢失，我们需要把数据备份到本地存储
      // window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(state.user))
      setItem('TOUTIAO_USER',state.user)
    }
    
  },
  actions: {
  },
  modules: {
  }
})
