import request from '@/utils/request'
import qs from 'qs'

// 获取用户列表
export function getUserList(data) {
  return request({
    url: '/private/member/list',
    method: 'get',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    // data:qs.stringify(data)
    data
  })
}