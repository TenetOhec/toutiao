/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 接口的基准路径
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent（请求会经过这里）
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  //这里务必要返回config配置对象，否则请求就停在这里出不去了
  return config
}, function (error) {
  // Do something with request error（如果请求出错了（还没有发出去）会进入这里）
  return Promise.reject(error)
})

// 响应拦截器

export default request