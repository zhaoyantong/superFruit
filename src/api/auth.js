/**
 * 登录相关接口
 */
import request from '@/utils/request'
export default {
  loginByUsername(username, password) {
    const data = {
      username: username,
      password: password
    }
    return request({
      url: '/auth/login',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      data
    })
  },
  logout() {
    return request({
      url: '/auth/logout',
      method: 'post'
    })
  },
  getUserInfo(token) {
    return request({
      url: '/auth/info',
      method: 'get',
      params: { token }
    })
  },
}
