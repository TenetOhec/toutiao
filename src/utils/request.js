/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
// import JSONBig from 'json-bigint'

//JSON.parse（）
//JSON.stringfy()

//JSONBig 可以处理数据中超出 JavaScript 安全证书范围的问题

//JSONBig.parse()  //把json格式的字符串转为JavaScript对象
//JSONBig.stringify() //把JavaScript对象 转为JSON格式的字符串

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',// 接口的基准路径
  //自定义后端返回的原始数据
  // transformRequest: [function (data) {
  //   // Do whatever you want to transform the data
  //   try {
  //     return JSONBig.parse(data)
  //   } catch (err) {
  //     return data
  //   }
  // }],
  //axios 默认会在内部这样来处理后端返回的数据
  //return JSON.pase(data)
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