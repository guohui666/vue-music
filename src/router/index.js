/* eslint-disable no-undef */
import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import SingerDetail from 'components/singer-detail/singer-detail'
import store from '../store'
import test from 'components/test/test'

Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/test'
  },
  {
    path: '/test',
    component: test
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/singer',
    component: Singer,
    meta: {
      requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [
      {
        path: ':id',
        meta: {
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: SingerDetail
      }
    ]
  },
  {
    path: '/rank',
    component: Rank
  },
  {
    path: '/search',
    component: Search
  }
]
// 页面刷新时，重新赋值token
// if (window.localStorage.getItem('token')) {
//   store.commit(types.LOGIN, window.localStorage.getItem('token'))
// }
const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // console.log(to.meta.requireAuth)// 判断该路由是否需要登录权限
    if (store.state.token) {  // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/search',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
export default router
