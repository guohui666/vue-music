/**
 * Created by superman on 17/2/16.
 * http配置
 */
import axios from 'axios'
import store from '../store'
// import * as types from '../store/mutation-types'
import router from '../router'
// import { mapMutations } from 'vuex'

// ...mapMutations({
//     setSinger: 'SET_SINGER'
//   })
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = ''

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit('SET_TONKEN')
          // console.log(store.commit('SET_TONKEN', '123'))
          router.replace({
            path: 'search',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error)
  })

export default axios
