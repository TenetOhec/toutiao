import Vue from 'vue'
import dayjs from 'dayjs'

//加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
// import { values } from 'core-js/core/array'
//配置使用处理相对时间的插件
dayjs.extend(relativeTime)

//dayjs 默认语言为英文，我们配置为中文

dayjs.locale('zh-cn') // 全局使用

//定义一个全局过滤器，然后就可以在任何组件的模版中使用了
//其实过滤器就相当于一个全局可用的方法（仅供模版使用）
//参数一：过滤器名称
//参数二：过滤器函数
//使用方式：{{表达式｜过滤器名称}}
//管道符前面的表达式的结果会作为参数传递到过滤器中
//过滤器的返回值会渲染到使用过滤器发模版位置
Vue.filter('relativeTime',value=>{
    return dayjs().to(dayjs(value))

})


//dayjs（）获取当前最新时间
// console.log(dayjs().format('YYYY-MM-DD'))

// dayjs().from(dayjs('1990')) // 2 years ago
// dayjs().from(dayjs(), true) // 2 years

// dayjs().fromNow()

// dayjs().to(dayjs())

// dayjs().toNow()

// console.log(dayjs().to(dayjs('1990')) )