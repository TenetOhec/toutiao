/**
 * 用户相关的请求模块
 */

import request from"@/utils/request"
// import store from '@/store'
/**
 * 请求登陆
 */
export const login = data =>{
    return request({
        method:'POST',
        url:'/v1_0/authorizations',
        data:data
    })
}
/**
 * 发送验证码
 */
export const sendSms = mobile => {
    return request({
        method:'GET',
        //手机号座位参数传过去，则需要使用es6字符串拼接将mobile拼接进url中
        url:`/v1_0/sms/codes/${mobile}`
    })
}

/** 
 * 获取用户自己的个人信息
*/
export const getUserInfo = () => {
    return request({
        method:'GET',
        url:`/v1_0/user`,
        //发送请求头，该接口需要授权才能访问 （注意bearer后面有个空格）
        // headers:{
        //     Authorization : `Bearer ${store.state.user.token}`
        // }
    })
}