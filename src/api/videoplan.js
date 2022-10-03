import request from '@/utils/request'
import qs from 'qs'

export function addPlan(data) {
  return request({
    url: '/private/plan/create',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data:qs.stringify(data,{
    	arrayFormat: 'indices', allowDots: true
    })
  })
}

export function getPlanList(data) {
  return request({
    url: '/private/plan/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data:qs.stringify(data)
  })
}
// 查看列表详情
export function getPlanInfo(data) {
  return request({
    url: `/private/plan/info/${data}`,
    method: 'get',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    // data:qs.stringify(data)
  })
}