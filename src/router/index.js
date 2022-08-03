import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//路由表
const routes = [
  {
    path:'/login',
    name:'login',
    //路由懒加载
    //用动态导入代替静态导入：当路由被访问的时候才加载对应组件，这样就会更加高效
    component:()=>import('@/views/login')
  },
  {
    path:'/',
    // name:'layout',
    //路由懒加载
    //用动态导入代替静态导入：当路由被访问的时候才加载对应组件，这样就会更加高效
    component:()=>import('@/views/layout'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  
  },
  {
    path:'/search',
    name:'search',
    component:()=>import('@/views/search')
  },
  {
    //动态路由
    path:'/article/:articleId',
    name:'article',
    component:()=>import('@/views/article'),
    props:true//开启props传参，就是把路由参数映射到组件的props中
  },
  {
    path:'/user/profile',
    name:'user-profile',
    component:()=>import('@/views/user-profile'),
  }
]

const router = new VueRouter({
  routes
})

export default router
