import axios from 'axios'
import { Message,MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import code from '@/utils/code'
import QS from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 500000, // request timeout
  withCredentials: true //使前台能够保存cookie
})
// request interceptor
service.interceptors.request.use(config => {
  config.data = QS.stringify(config.data);
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['authorization'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
// respone interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  res => {
    if(res.data.code==code.LOGIN_SUCC||res.data.code==code.SUCC){
      //如果后台返回的json显示成功，pass
      return res;
    }else{
      if(res.data.code == code.UNAUTHEN || res.data.code == code.SESSION_TIMOUT){
        //处理登录相关的错误
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出',
          {confirmButtonText: '重新登录',cancelButtonText: '取消',type: 'warning'}).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload();// 为了重新实例化vue-router对象 避免bug
          });
        })
      }else{
        //其它错误弹出错误信息
        Message({ message: res.data.msg, type: 'error', duration: 5000});
      }
      return Promise.reject('error');
    }
  },
  /**
   * 请求发生错误，一般都是服务器抛异常了
   */
  err => {
    console.error('request err: %o', err)// for debug
    Message({message: error.message,type: 'error',duration: 5000})
    return Promise.reject(error)
  }
)
export default service
