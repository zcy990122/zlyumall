import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import store from  '../store'


    // 路由独享首位
function checkedEnter(path,next){
  if(store.state.userInfo.menus_url.includes(path)){
    next()
  }else{
    next('/')
  }
}

// 7.导出路由
export let routes = [
  {
    path: 'menu',
    component: () => import('../pages/menu/menu'),
    name:'菜单管理',
     
    beforeEnter: (to, from, next) => {
      checkedEnter('/menu',next)
    }
  },
  {
    path: 'role',
    component: () => import('../pages/role/role'),
    name:"角色管理",

    beforeEnter: (to, from, next) => {
      checkedEnter('/role',next)
    }
  },
  {
    path: 'manage',
    component: () => import('../pages/manage/manage'),
    name:"管理员管理",

    beforeEnter: (to, from, next) => {
      checkedEnter('/manage',next)
    }
  },
  {
    path: 'cate',
    component: () => import('../pages/cate/cate'),
    name:"商品分类",

    beforeEnter: (to, from, next) => {
      checkedEnter('/cate',next)
    }
  },
  {
    path: 'specs',
    component: () => import('../pages/specs/specs'),
    name:"商品规格",

    beforeEnter: (to, from, next) => {
      checkedEnter('/specs',next)
    }
  },
  {
    path: 'goods',
    component: () => import('../pages/goods/goods'),
    name:"商品管理",

    beforeEnter: (to, from, next) => {
      checkedEnter('/goods',next)
    }
  },
  {
    path: 'vip',
    component: () => import('../pages/vip/vip'),
    name:"会员管理",

    beforeEnter: (to, from, next) => {
      checkedEnter('/vip',next)
    }
  },
  {
    path: 'banner',
    component: () => import('../pages/banner/banner'),
    name:"轮播图管理",

    beforeEnter: (to, from, next) => {
      checkedEnter('/banner',next)
    }
  },
  {
    path: 'seckill',
    component: () => import('../pages/seckill/seckill'),
    name:"秒杀活动",

    beforeEnter: (to, from, next) => {
      checkedEnter('/seckill',next)
    }
  }
]

let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../pages/login/login')
    },
    {
      path: '/',
      component: () => import('../pages/index/index'),

      // 二级路由配置
      children: [
        {
          path: '',
          component: () => import('../pages/home/home')
        },
        ...routes
  
        // 拼接  ].concat(routes)    ...routes
      ]

    }
  ]
})

// 全局守卫
router.beforeEach((to, from, next) => {
  // 前往 登录  /login
  if(to.path=='/login'){
    next();
    return;
  }
  // 其他页面 如果本地存储有 就next  否则  去登录
  // if(sessionStorage.getItem('userInfo')){
  //   next();
  //   return;
  // }
  //  next('/login')
  

    // 其他页面 如果vuex仓库有token 就next  否则  去登录
  if(store.state.userInfo.token){
    next();
    return;
  }
   next('/login')
  
  
})

export default router
