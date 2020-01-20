import request from '@/utils/request'

export default{
  // ---------------------------订单列表(接口)---------------------------
  queryOrderForm(queryParam,pageParam) {
    return request({
      url: '/orderInfo/list',
      method: 'post',
      data: {
        ...queryParam,
        current: pageParam.current,
        size: pageParam.size
      }
    })
  },
  // ---------------------------已签收列表(接口)---------------------------
  signedList(queryParam,pageParam) {
    return request({
      url: '/orderInfo/signedList',
      method: 'post',
      data: {
        ...queryParam,
        current: pageParam.current,
        size: pageParam.size
      }
    })
  },
  //  ---------------------------待发货订单发货(接口)---------------------------
  deliverGoods(data) {
    return request({
      url: '/orderInfo/deliverGoods',
      method: 'post',
      data
    })
  },
}
