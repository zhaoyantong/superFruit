import request from '@/utils/request'

export default{
  // ---------------------------普通商品---------------------------
  queryFruit(queryParam,pageParam) {
    return request({
      url: '/fruit/list',
      method: 'post',
      data: {
        ...queryParam,
        current: pageParam.current,
        size: pageParam.size
      }
    })
  },
  /**
   * 普通商品上传
   * @param data
   */
  addFruit(data) {
    return request({
      url: '/fruit/addFruit',
      method: 'post',
      data
    })
  },
  /**
   * 普通商品更新/编辑
   * @param data
   */
  updateFruit(data) {
    return request({
      url: '/fruit/updateFruit',
      method: 'post',
      data
    })
  },
  /**
   * 普通商品查看
   * @param data
   */
  selectFruit(id) {
    return request({
      url: '/fruit/selectFruit?id='+id,
      method: 'get'
    })
  },
  /**
   * 普通商品删除
   * @param data
   */
  // deleteFruit(data) {
  //   return request({
  //     url: '/fruit/deleteFruit',
  //     method: 'post',
  //     data
  //   })
  // },
  /**
   * 普通商品上架/下架
   * @param data
   */
  deleteFruit(data) {
    return request({
      url: '/fruit/lowerShelfFruit',
      method: 'post',
      data
    })
  },
  // ---------------------------会员福利列表---------------------------
  queryMembershipBenefits(queryParam,pageParam) {
    return request({
      url: '/membershipBenefits/list',
      method: 'post',
      data: {
        ...queryParam,
        current: pageParam.current,
        size: pageParam.size
      }
    })
  },
  // ---------------------------会员福利添加---------------------------
  // queryAdd() {
  //   return request({
  //     url: '/membershipBenefits/add',
  //     method: 'post',
  //   })
  // },
  queryIds() {
    return request({
      url: '/membershipBenefits/ids',
      method: 'post',
    })
  },
}
