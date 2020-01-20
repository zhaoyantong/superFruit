import request from '@/utils/request'

export default{
  // ---------------------------账单(接口)---------------------------
  queryBillList(queryParam,pageParam) {
    return request({
      url: '/orderInfo/billList',
      method: 'post',
      data: {
        ...queryParam,
        current: pageParam.current,
        size: pageParam.size
      }
    })
  },
}
