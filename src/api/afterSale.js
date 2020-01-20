import request from '@/utils/request'

export default{
  // ---------------------------退款/售后(接口)---------------------------
  queryAfterSaleList(queryParam,pageParam) {
    return request({
      url: '/orderRefund/list',
      method: 'post',
      data: {
        ...queryParam,
        current: pageParam.current,
        size: pageParam.size
      }
    })
  },
  // ---------------------------是否同意退款---------------------------
  isAgree(data) {
    return request({
      url: '/orderRefund/isAgree',
      method: 'post',
      data
    })
  }
}
