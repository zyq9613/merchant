import request from '@/utils/request'
import qs from 'qs'
export function login(data) {
  return request({
    url: '/public/mobile_psw/login',
    method: 'post',
    data
  })
}
// 手机验证码登录
export function verLogin(data) {
  return request({
    url: '/public/mobile/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
//  获取验证码
export function getVerificationCode(params) {
  return request({
    url: '/public/mobile/sendSms',
    method: 'get',
    params
  })
}

export function getVideoList(params) {
  return request({
    url: '/private/plan/list',
    method: 'get',
    params
  })
}
