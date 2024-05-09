import request from '@/common/request.js'

//用户查询自己的信息 修改个人信息 
export function userData(data) {
  return request({
    url: '/user',
    method: 'get',
		data
  })
}

//用户查询自己的信息 修改个人信息 
export function userDataPost(url,data) {
 return request({
   url: '/user'+url,
   method: 'post',
 		data
 })
}
