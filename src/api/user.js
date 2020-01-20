/**
 * “用户管理”相关接口
 */
import request from '@/utils/request'

export default {

  queryUser(queryParam,pageParam) {
    return request({
      url: '/sys_user/query',
      method: 'post',
      data: {
        ...queryParam,
        current: pageParam.current,
        size: pageParam.size
      }
    })
  },

  updateUser(data) {
    return request({
      url: '/sys_user/update',
      method: 'post',
      data
    })
  },

  updatePwd(data) {
    return request({
      url: '/sys_user/pwd',
      method: 'post',
      data
    })
  },

  addUser(data) {
    return request({
      url: '/sys_user/add',
      method: 'post',
      data
    })
  },

  deleteUser(data) {
    return request({
      url: '/sys_user/delete',
      method: 'post',
      data
    })
  },

  /**
   * 更新用户的角色
   * @param perm
   */
  updateUserRoles(data) {
    return request({
      url: '/sys_user/role',
      traditional: true,
      method: 'post',
      data
    })
  }

}

